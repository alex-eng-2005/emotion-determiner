from transformers import pipeline
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

#Allow your React app to communicate with Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                    "http://127.0.0.1:5173",
                    "http://192.168.56.1:5173",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
emotionDectector = pipeline("sentiment-analysis", model="SamLowe/roberta-base-go_emotions")

#Defines the expected JSON FORMAT
class Message(BaseModel):
    text: str
    
#My message
def myMessage(thisMessage):
    return emotionDectector(thisMessage)

#Endpoint that React will call
@app.post("/analyze")
def analyze(message: Message):
    #Get the user's text
    user_text = myMessage(message.text)
    emotion = []
    for user in user_text:
        emotion.append(user["label"])
        
    return {"emotion": emotion}
    

