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
                    "http://10.255.255.254:5173",
                    "http://172.24.5.62:5173",],
                   allow_credentials=True,
                   allow_headers=["*"],
                   allow_methods=["*"])

class Message(BaseModel):
    grammarFix: str
    
@app.post("/grammar")
def grammar(message: Message):
    userMessage = message.grammarFix
    prompt = [{"role": "system", 
               "content": ("You are a grammar and spelling correction tool. "
                            "Correct only grammatical and spelling errors. "
                            "Preserve the original meaning, wording, tone, and sentence length as much as possible. "
                            "Do not add new facts, explanations, descriptions, examples, or information. "
                             "Do not expand the sentence. "
                            "If the sentence is already grammatically correct, return it unchanged. "
                            "Respond only with the corrected sentence."
                            )},
              {
                  "role": "user",
                  "content": userMessage
              }]
    correctGrammar = fixEditing(prompt)
    print(correctGrammar)
    return {"correctGrammer": correctGrammar[0]["generated_text"][-1]["content"]}

@app.post("/fixSentenceWords")
def fixSentenceWords(message: Message):
    userMessage = message.grammarFix
    prompt = [{"role": "system", 
                "content": ("Your a grammer tool only."
                            "Replace words with stronger alternatives only when appropriate, but never add new ideas, facts, clauses, or sentences. "
                            "Respond only the corrected sentence")},
                  {
                      "role": "user",
                      "content": userMessage
                  }]
    correctGrammar = fixEditing(prompt)
    return {"correctGrammer": correctGrammar[0]["generated_text"][-1]["content"]}

@app.post("/strongerSentence")
def strongerSentence(message: Message):
    userMessage = message.grammarFix
    prompt = [{"role": "system", 
                "content": ("You are a grammar and vocabulary improvement tool. "
                            "Correct all grammar, spelling, punctuation, and sentence-structure errors. "
                            "Improve weak or repetitive words by replacing them with stronger, more precise vocabulary when appropriate. "
                            "Preserve the original meaning and intent. "
                            "Do not add new facts, ideas, explanations, examples, descriptions, or unrelated details. "
                            "Do not unnecessarily lengthen the sentence. "
                            "If stronger vocabulary would sound unnatural, keep the original wording. "
                            "Respond only with the improved sentence.")},
                  {
                      "role": "user",
                      "content": userMessage
                  }]
    correctGrammar = fixEditing(prompt)
    return {"correctGrammer": correctGrammar[0]["generated_text"][-1]["content"]}