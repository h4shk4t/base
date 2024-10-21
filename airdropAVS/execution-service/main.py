# Main logic here
from dotenv import load_dotenv
from fastapi import FastAPI, Request

import uvicorn
import requests

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

app = FastAPI()

@app.post("/")
async def jsonrpc_handler(request: Request):
    req_json = await request.json()
    if req_json.get("method") == "generate_response":
        params = req_json.get("params", {})
        print(params)
        response = get_string(params[0])
        return {
            "jsonrpc": "2.0",
            "result": response,
            "id": req_json.get("id")
        }
    else:
        # Handle unsupported method names
        return {
            "jsonrpc": "2.0",
            "error": {
                "code": -32601,
                "message": "Method not found"
            },
            "id": req_json.get("id")
        }

# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4003)