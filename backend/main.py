from PortfolioChatbot import PortfolioChatbot
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware



chatbot = PortfolioChatbot()
app = FastAPI()

chatbot.store_context()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", 
    "https://ai-portfolio-ochre.vercel.app",
    "https://akshatbist.vercel.app"],  # your React dev server address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    question: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Akshat's Portfolio Chatbot!"}

@app.post("/answer_question")
def answer_question(data: QuestionRequest):
    answer = chatbot.answer_question(data.question)
    return {"answer": answer}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000)

