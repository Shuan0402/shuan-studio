from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.pinecone_service import ai_service

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_with_shuan(request: ChatRequest):
    content = ai_service.get_ai_response(request.message)
    return {"content": content}