from transformers import pipeline
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

#Emotion and sarcasm model
emotionDetector = pipeline("text-classification", model="SamLowe/roberta-base-go_emotions")
sarcasmModel = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-irony")

app = FastAPI()

#Allow your React app to communicate with Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                    "http://10.255.255.254:5173",
                    "http://172.24.5.62:5173",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Defines the expected JSON FORMAT
class Message(BaseModel):
    text: str
    
#My message
def myMessage(thisMessage):
    return emotionDetector(thisMessage, top_k=None)

#Sarcasm Model
def sarcasmResults(thisMessage):
    return sarcasmModel(thisMessage, top_k=None)

#Endpoint that React will call
@app.post("/analyze")

def analyze(message: Message):
    #Have these models set
    emotion = myMessage(message.text)
    sarcasm = sarcasmResults(message.text)
    
    #Sarcasm model
    print(sarcasm)
    return {"userEmotions": [emotion, sarcasm]}
    

