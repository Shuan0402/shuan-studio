import os
from pinecone import Pinecone
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("PINECONE_API_KEY")

pc = Pinecone(api_key=api_key)

assistant = pc.assistant.Assistant(
    assistant_name="shuan", 
)

# Upload a file.
response = assistant.upload_file(
    file_path="data/02_projects/selfmap.md",
    metadata={"Tech Stack": "React, Firebase, Leaflet, MUI", "Field": "地理資訊系統 (GIS)", "Category": "個人化地圖平台", "Keywords": "私房景點, 旅伴協作, 地標管理"},
    timeout=None
)
