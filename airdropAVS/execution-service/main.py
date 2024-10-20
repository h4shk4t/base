# Main logic here
from dotenv import load_dotenv
from fastapi import FastAPI, Request

import uvicorn

# Replace "YOUR_API_TOKEN" with your actual Lighthouse API token
load_dotenv()

app = FastAPI()

@app.post("/")
async def jsonrpc_handler(request: Request):
    req_json = await request.json()
    if req_json.get("method") == "generate_response":
        params = req_json.get("params", {})
        print(params)
        response = await parth_function(params)
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