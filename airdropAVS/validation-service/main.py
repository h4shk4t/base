from fastapi import FastAPI, HTTPException, status, Request
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Any

import uvicorn
import json

# Load environment variables
load_dotenv()

app = FastAPI()

class CustomResponse(BaseModel):
    is_approved: bool

class CustomError(BaseModel):
    detail: str
    data: Any

async def validate_response(data: str, proof_of_task: str):
    """Validate response by comparing embeddings."""
    # Split by ~ to get file_id and model_name
    data = parth_function()
    proof_of_task = generate_PoT(data)
    # embedding = get_embedding(await call_groq_api(file_id, model_name))
    # Example check: replace with actual logic
    proof_of_task = json.loads(proof_of_task)
    # if proof_of_task == "2ac9b7acde3df183fe73cf1d571847b6829dca593fb2687d47939aa1c1788b63":
    #     return True
    # Additional similarity check with cosine distance
    # print("Cosine similarity:", cosine(embedding, proof_of_task))
    # if cosine(embedding, proof_of_task) > 0.07:
    #     return True
    return False

@app.post("/task/validate")
async def validate_task(request: Request):
    rpc_body = await request.json()
    proof_of_task = rpc_body.get("proofOfTask", "")
    data = rpc_body.get("data", {})
    task_definition_id = rpc_body.get("taskDefinitionId", "")
    performer = rpc_body.get("performer", "")
    # try:
    is_approved = await validate_response(data, proof_of_task)
    response = CustomResponse(is_approved=is_approved)
    return JSONResponse(status_code=status.HTTP_200_OK, content=response.dict())

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4002)