from fastapi import FastAPI, Query 
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from models import SentimentLog, SessionLocal

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

sentiment_pipeline = pipeline("sentiment-analysis")

@app.get("/")
def root():
    return {"message": "MarketLens API is running!"}

@app.get("/analyze")
def analyze(
    text: str = Query(..., min_length=3),
    asset: str = Query(..., min_length=1)
):
    result = sentiment_pipeline(text)[0]

    db = SessionLocal()
    log = SentimentLog(
        asset=asset.supper(),
        text=text,
        label=result["label"],
        score=result["score"]
    )
    db.add(log)
    db.commit() 
    db.refresh(log)

    return {
        "input": text,
        "asset": asset,
        "sentiment": {
            "label": result["label"],
            "score": result["score"]
        }
    }
