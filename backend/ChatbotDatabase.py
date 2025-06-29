from sentence_transformers import SentenceTransformer
import chromadb

class ChatbotDatabase():
    
    def __init__(self):
        # Initialize the database connection and other necessary components
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.chroma_client = chromadb.Client()

        self.collection_names = [collection.name for collection in self.chroma_client.list_collections()]

        if "qa-memory" in self.collection_names:
            self.collection = self.chroma_client.get_collection(name="qa-memory")
        else:
            self.collection = self.chroma_client.create_collection(name="qa-memory")

    def chunk_text(self, text, max_length=500):
        paragraphs = text.split('\n\n')
        chunks = []
        current_chunk = ""
        for para in paragraphs:
            if len(current_chunk) + len(para) < max_length:
                current_chunk += para + "\n\n"
            else:
                chunks.append(current_chunk.strip())
                current_chunk = para + "\n\n"
        if current_chunk:
            chunks.append(current_chunk.strip())
        return chunks
    
    def store_context(self, label, context):
        safe_id = label[:20].replace(" ", "_").replace("?", "").replace("/", "_")
        chunks = self.chunk_text(context)
        for i, chunk in enumerate(chunks):
            self.collection.add(
                documents=[chunk],
                embeddings=[self.model.encode(chunk).tolist()],
                metadatas=[{"chunk_index": i}],
                ids=[f"{safe_id}_{i}"]
        )
    
    def query_similar(self, question, top_k=1):
        embedding = self.model.encode(question).tolist()
        results = self.collection.query(
                query_embeddings=[embedding],
                n_results=top_k
            )
        return results['documents'], results['metadatas']
        