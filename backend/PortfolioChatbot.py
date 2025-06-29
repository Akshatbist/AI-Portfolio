from openai import OpenAI
from ChatbotDatabase import ChatbotDatabase
from dotenv import load_dotenv
import os

# Load .env from the correct relative path
load_dotenv(dotenv_path="./.env")

class PortfolioChatbot:
    def __init__(self): #initialize things that all methods will use
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.db = ChatbotDatabase()


    #store all context in a txt file and then pass that in to the chromadb database
    #from there i will take it user input questions and tell chatgpt to make the best response based on the question and the context stored in the database
    
    
    def store_context(self):

        base_dir = os.path.dirname(__file__)  # gets directory where this script is located
        context_path = os.path.join(base_dir, "context.txt")  # full path to context.txt

        with open(context_path, "r", encoding="utf-8") as file:
            context = file.read()

        try:
            self.db.store_context(
                label = "Full Context", 
                context = context
                )
            #idk if label is the right thing to embed the context with
            print("Context stored successfully.")
            print()

        except Exception as e:
            print(f"Error storing context: {e}")

    def answer_question(self, question):

    #retrieve context from the database based on the question
        print(f"📄 Text Question: {question}")
        print()
        documents, metadatas = self.db.query_similar(question)

        if not metadatas:
            self.db.store_context("PENDING_USER_INPUT", question)

        if documents and documents[0]:
            answer= documents[0][0].strip()
        else:
            answer = ""

        

        print(f"📄 Retrieved Context: {answer}")
        print()


        if not answer or answer.upper() == "PENDING_USER_INPUT":
            self.db.store_context("PENDING_USER_INPUT", question)

        try:

            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                {
                    "role": "system",
                    "content": "You are Akshat Bist's personal portfolio chatbot. You are friendly. "
                    "Max 1-2 sentences."
                    "DON'T BE VERBOSE. "
                    "If you do not know the answer, say 'I don't know'."
                },
                {
                    "role": "user",
                    "content": f"Answer question consicely: {question} Using: {answer}"
                }
             ]
            )
            structured_output = response.choices[0].message.content.strip()

            print(f"Structured Output:{structured_output}")

            return structured_output
            
            
        
        except Exception as e:
            print(f"Error asking question: {e}")
            return None
