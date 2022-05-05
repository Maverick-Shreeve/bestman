# making this an API using fastAPI. After this next step will be to get this to the cloud so we can use it from anywhere
from fastapi import FastAPI, HTTPException
from bestman import generate_branding_snippet, generate_keywords
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()  #uvicorn bestman_api:app --reload / this runs the server for fast api
handler = Mangum(app)
MAX_INPUT_LENGTH = 32

app.add_middleware(  # helps our website stay in contact with our api .
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/generate_snippet")   #http get request 
async def generate_snippet_api(prompt: str):  # using async function because the @app.get above 
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": snippet, "keywords": []}


@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": None, "keywords": keywords}


@app.get("/generate_snippet_and_keywords") # combined the kewords and snippet function
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": snippet, "keywords": keywords}


def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(   # raise HTTPException pulled from fastAPI website
            status_code=400,
            detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters.",
        )
    
