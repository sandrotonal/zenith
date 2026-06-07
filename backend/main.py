from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from engine import ZenithNLPEngine

app = FastAPI(title="Zenith NLP API", version="1.0.0")

# CORS ayarları (Frontend ile iletişim için)
origins = [
    "https://zen1th.vercel.app",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = ZenithNLPEngine()

class TranslationRequest(BaseModel):
    text: str

class TranslationResponse(BaseModel):
    original: str
    zenith: str

class WordGenerationRequest(BaseModel):
    word: str

class WordGenerationResponse(BaseModel):
    original: str
    zenith: str

@app.get("/")
async def root():
    return {"message": "Zenith Yapay Dil Motoru API'sine Hoş Geldiniz", "status": "online"}

@app.post("/translate", response_model=TranslationResponse)
async def translate(request: TranslationRequest):
    try:
        result = engine.translate_to_zenith(request.text)
        return TranslationResponse(original=request.text, zenith=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-word", response_model=WordGenerationResponse)
async def generate_word(request: WordGenerationRequest):
    try:
        result = engine.generate_root_word(request.word)
        return WordGenerationResponse(original=request.word, zenith=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    import os
    # Railway hangi portu verirse dinamik olarak onu almasını sağlıyoruz
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
