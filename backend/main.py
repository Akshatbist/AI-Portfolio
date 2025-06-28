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
    "https://ai-portfolio-ndiwz53gv-akshatbists-projects.vercel.app"],  # your React dev server address

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#BaseModel is an abstract class that is meant to be inherited from.
#Doesn't have any parameters of its own.

class QuestionRequest(BaseModel):
    question: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Akshat's Portfolio Chatbot!"}

@app.post("/answer_question")
def answer_question(data: QuestionRequest):
    answer = chatbot.answer_question(data.question)
    return {"answer": answer}
