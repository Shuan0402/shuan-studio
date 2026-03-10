import os
from pinecone import Pinecone
from dotenv import load_dotenv


load_dotenv()

api_key = os.getenv("PINECONE_API_KEY")

pc = Pinecone(api_key=api_key)

assistant = pc.assistant.create_assistant(
    assistant_name="shuan", 
    instructions="使用繁體中文以溫柔、嚴謹的口吻回答", # Description or directive for the assistant to apply to all responses.
    region="us", # Region to deploy assistant. Options: "us" (default) or "eu".
    timeout=30 # Maximum seconds to wait for assistant status to become "Ready" before timing out.
)
