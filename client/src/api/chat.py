import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pinecone import Pinecone
from pinecone_plugins.assistant.models.chat import Message
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://shuan0402.github.io/shuan-studio",  # 加入你的 GitHub Pages 網址
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(os.path.dirname(current_dir))
env_path = os.path.join(project_root, ".env")

if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            key, value = line.split("=", 1)
            os.environ[key.strip()] = value.strip()
else:
    print(f"⚠️ 找不到 .env 檔案於: {env_path}")

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

if not PINECONE_API_KEY:
    raise ValueError("❌ 錯誤：PINECONE_API_KEY 仍為空，請檢查 .env 內容或路徑。")

pc = Pinecone(api_key=PINECONE_API_KEY)
assistant = pc.assistant.Assistant(assistant_name="shuan")

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_with_shuan(request: ChatRequest):
    try:
        msg = Message(role="user", content=request.message)
        
        resp = assistant.chat(messages=[msg])
        
        return {"content": resp.message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))