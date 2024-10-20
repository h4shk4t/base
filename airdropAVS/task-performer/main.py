# Some boilerplate code which calls the execution-service
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from eth_account import Account
from web3 import Web3
from hashlib import sha256

import os
import requests

# Load environment variables
load_dotenv()

# Create flask app
app = Flask(__name__)

# Read the private key from the environment variable
private_key = os.environ.get("PRIVATE_KEY")
rpc_base_address = "http://0.0.0.0:8545"
validation_service_address = "http://0.0.0.0:4002"

def generate_PoT(data1):
    """
    This function generates a proof of task.
    It takes a string as input, hashes it and returns the hash.
    """
    data = data1.encode('utf-8')
    proof_of_task = sha256(data).hexdigest()
    return proof_of_task

def generate_response(fileID, model_name):
    execution_url = "http://0.0.0.0:4003"
    json_rpc_body = {
        "jsonrpc": "2.0",
        "method": "generate_response",
        "params": [fileID, model_name],
        "id": 1
    }
    try:
        response = requests.post(execution_url, json=json_rpc_body)
        response.raise_for_status()
        json_response = response.json()
        response = json_response["result"]
        return response
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        raise e

def send_task(proof_of_task, data task_definition_id):
    account = Account.from_key(private_key)
    performer_address = account.address
    data = Web3.to_hex(text=data)
    proof_of_task = str(proof_of_task)
    # proof_of_task = "2ac9b7acde3df183fe73cf1d571847b6829dca593fb2687d47939aa1c1788b63"
    task_definition_id = 0

    from eth_abi import encode
    message = encode(
        ["string", "bytes", "address", "uint16"], 
        [proof_of_task, Web3.to_bytes(hexstr=data), performer_address, task_definition_id]
    )
    message_hash = Web3.keccak(message)
    signed_message = Account.unsafe_sign_hash(message_hash, private_key)
    signature = signed_message.signature.hex()

    json_rpc_body = {
        "jsonrpc": "2.0",
        "method": "sendTask",
        "params": [
            proof_of_task,
            data,
            task_definition_id,
            performer_address,
            "0x" + signature,
        ],
        "id": 1
    }
    print("Sending task:", json_rpc_body)
    try:
        response = requests.post(rpc_base_address, json=json_rpc_body)
        response.raise_for_status()
        result = response.json()
        print("API response:", result)
    except requests.exceptions.RequestException as error:
        print(f"Error making API request: {error}")

@app.route("/initiateTask", methods=["POST"]):
def initiate_task():
    try:
        data = request.get_json()
        network = data.get('network')
        if not network:
            return jsonify({"error": "Missing network"}), 400

        response = generate_response(network)
        proof_of_task = generate_PoT(response)
        send_task(proof_of_task, response, 1)
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002)