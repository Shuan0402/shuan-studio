# server/main.py
import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
from routes.chat import router as chat_router

env_path = Path(__file__).parent / ".env"
if os.path.exists(env_path):
    load_dotenv(dotenv_path=env_path)


app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "Shuan Studio API is running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://shuan0402.github.io/shuan-studio",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)