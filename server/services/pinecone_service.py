import os
from pinecone import Pinecone
from pinecone_plugins.assistant.models.chat import Message

class PineconeAIService:
    def __init__(self):
        api_key = os.getenv("PINECONE_API_KEY")
        if not api_key:
            raise ValueError("PINECONE_API_KEY is not set in environment variables")
        
        self.pc = Pinecone(api_key=api_key)
        self.assistant = self.pc.assistant.Assistant(assistant_name="shuan")

    def get_ai_response(self, user_message: str):
        try:
            msg = Message(role="user", content=user_message)
            resp = self.assistant.chat(messages=[msg])
            return resp.message.content
        except Exception as e:
            print(f"Pinecone Error: {e}")
            return "我的大腦暫時連不上線，請稍後再試。"

ai_service = PineconeAIService()