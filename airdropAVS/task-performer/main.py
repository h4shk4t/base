# Some boilerplate code which calls the execution-service
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from eth_account import Account
from web3 import Web3
from hashlib import sha256

import os
import requests
import logging

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

# Create flask app
app = Flask(__name__)

# Read the private key from the environment variable
private_key = os.environ.get("PRIVATE_KEY")
rpc_base_address = "http://10.8.0.69:8545"
validation_service_address = "http://10.8.0.42:4002"

def generate_PoT(data1):
    """
    This function generates a proof of task.
    It takes a string as input, hashes it and returns the hash.
    """
    data = data1.encode('utf-8')
    proof_of_task = sha256(data).hexdigest()
    return proof_of_task

def generate_response(username):
    execution_url = "http://10.8.0.43:4003"
    json_rpc_body = {
        "jsonrpc": "2.0",
        "method": "generate_response",
        "params": [username],
        "id": 1
    }
    try:
        response = requests.post(execution_url, json=json_rpc_body)
        response.raise_for_status()
        json_response = response.json()
        response = json_response["result"]
        print(f"Generated response: {response}")
        return response
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        raise e

def send_task(proof_of_task, data, task_definition_id):
    print("Reached here")
    account = Account.from_key(private_key)
    performer_address = account.address
    data = Web3.to_hex(text=data)
    proof_of_task = str(proof_of_task)
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
    logger.info("Sending task: %s", json_rpc_body)
    try:
        response = requests.post(rpc_base_address, json=json_rpc_body)
        response.raise_for_status()
        result = response.json()
        logger.info("API response: %s", result)
    except requests.exceptions.RequestException as error:
        logger.error("Error making API request: %s", error)

@app.route("/initiateTask", methods=["POST"])
def initiate_task():
    try:
        data = request.get_json()
        username = data.get('username')
        if not username:
            return jsonify({"error": "Missing username"}), 400

        response = generate_response(username)
        proof_of_task = generate_PoT(response)
        send_task(proof_of_task, response, 1)
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Task performer can be called directly by API or by smart contract
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002)