from transformers import pipeline
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

#Api
app = FastAPI()
grammarAI = pipeline("text-generation", "Qwen/Qwen2.5-0.5B-Instruct")

#Fix grammar issues
def fixEditing(prompt):
    newGrammar = grammarAI(prompt, max_new_tokens=40, do_sample=False)
    return newGrammar

#Adds the middleware
app.add_middleware(CORSMiddleware, 
                   allow_origins=
                   ["http://localhost:5173",
                    "http://127.0.0.1:5173",
                    "http://192.168.56.1:5173",],
                   allow_credentials=True,
                   allow_headers=["*"],
                   allow_methods=["*"])

class Message(BaseModel):
    grammarFix: str
    
@app.post("/grammar")
def grammar(message: Message):
    prompt = [{"role": "system", 
               "content": ("Your a grammer tool only."
                            "Correct grammar and spelling without changing the meaning. "
                            "Respond only the corrected sentence")},
              {
                  "role": "user",
                  "content": message
              }]
    correctGrammar = fixEditing(message.grammarFix, prompt)
    return {"correctGrammer": correctGrammar[0]["generated_text"][-1]["content"]}

@app.post("/fixSentenceWords")
def fixSentenceWords(message: Message):
    prompt = [{"role": "system", 
                "content": ("Your a grammer tool only."
                            "Only change certain words that you see as being weak and replace them with stronger words. "
                            "Respond only the corrected sentence")},
                  {
                      "role": "user",
                      "content": message
                  }]
    correctGrammar = fixEditing(message.grammarFix, prompt)
    return {"correctGrammer": correctGrammar}

@app.post("/strongerSentence")
def strongerSentence(message: Message):
    prompt = [{"role": "system", 
                "content": ("Your a grammer tool only."
                            "Correct grammar and spelling without changing the meaning. "
                            "Also add the stronger words that you see fit"
                            "Respond only the corrected sentence")},
                  {
                      "role": "user",
                      "content": message
                  }]
    correctGrammar = fixEditing(message.grammarFix, prompt)
    return {"correctGrammer": correctGrammar}