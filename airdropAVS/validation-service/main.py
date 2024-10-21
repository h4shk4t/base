from fastapi import FastAPI, HTTPException, status, Request
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Any

import uvicorn
import json

# Load environment variables
load_dotenv()

token = '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'

def github_request ( url , params = None) :
    print(url,params)
    headers = { 'Authorization': f'token {token}' }
    response = requests.get(url,headers=headers,params=params)
    if response.status_code != 200 : print(response.text) ; return None
    return response


def get_all_repos ( username ) :

    username = 'base-org' 
    url = f'https://api.github.com/users/{username}/repos'

    all_repos = []
    page = 1
    per_page = 100  # Maximum per page is 100

    while True:
        response = github_request(url,params={'page': page, 'per_page': per_page})
        if not response : break
        repos = response.json()
        if not repos: break   
        all_repos.extend(repos)
        page += 1

    S = set()
    for repos in all_repos : S.add(repos["name"])
    return S

def get_string ( username ) :
    return "@".join(sorted(list(get_all_repos(username))))

def generate_PoT(data1):
    """
    This function generates a proof of task.
    It takes a string as input, hashes it and returns the hash.
    """
    data = data1.encode('utf-8')
    proof_of_task = sha256(data).hexdigest()
    return proof_of_task

app = FastAPI()

class CustomResponse(BaseModel):
    is_approved: bool

class CustomError(BaseModel):
    detail: str
    data: Any

async def validate_response(data: str, proof_of_task: str):
    data = get_string()
    validator_PoT = generate_PoT(data)
    proof_of_task = json.loads(proof_of_task)
    if validator_PoT == proof_of_task:
        return True
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