import os
from pinecone_plugins.assistant.models.chat import Message
from pinecone import Pinecone
from dotenv import load_dotenv


load_dotenv()

api_key = os.getenv("PINECONE_API_KEY")

pc = Pinecone(api_key=api_key)

assistant = pc.assistant.Assistant(
    assistant_name="shuan", 
)
msg = Message(role="user", content="請簡單敘述 selfmap 是什麼？")
resp = assistant.chat(messages=[msg])

print(resp)
