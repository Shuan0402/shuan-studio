from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_with_shuan(request: ChatRequest):
    # 先寫簡單的回覆測試
    return {"content": "Hello from modular router!"}