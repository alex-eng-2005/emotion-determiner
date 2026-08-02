from transformers import pipeline

emotionDectector = pipeline("sentiment-analysis", model="j-hartmann/emotion-english-distilroberta-base")
print(emotionDectector("It hurts to know that no matter how much I wanted us to work, some things are just not meant to be"))