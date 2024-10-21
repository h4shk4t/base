# requirements.txt
# flask==2.3.3
# web3==6.11.1
# python-dotenv==1.0.0
# flask-cors==4.0.0

# app.py
from flask import Flask, request, jsonify
from web3 import Web3
from eth_utils import to_wei
from dotenv import load_dotenv
from flask_cors import CORS
import os
import json

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Web3
w3 = Web3(Web3.HTTPProvider(os.getenv("RPC_URL")))
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
CONTRACT_ADDRESS = os.getenv("AIRDROP_CONTRACT_ADDRESS")

# Load contract ABI
with open("contract_abi.json") as f:
    CONTRACT_ABI = json.load(f)

# Initialize contract
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)

def validate_address(address):
    """Validate Ethereum address"""
    return w3.is_address(address)

def validate_amount(amount):
    """Validate amount can be converted to Wei"""
    try:
        to_wei(float(amount), 'ether')
        return True
    except:
        return False

@app.route('/api/airdrop', methods=['POST'])
def initiate_airdrop():
    try:
        data = request.get_json()
        recipients = data.get('recipients', [])
        amounts = data.get('amounts', [])

        # Basic validation
        if not recipients or not amounts:
            return jsonify({'error': 'Recipients and amounts are required'}), 400
        
        if len(recipients) != len(amounts):
            return jsonify({'error': 'Number of recipients must match number of amounts'}), 400

        # Validate addresses and amounts
        for address in recipients:
            if not validate_address(address):
                return jsonify({'error': f'Invalid address: {address}'}), 400

        for amount in amounts:
            if not validate_amount(amount):
                return jsonify({'error': f'Invalid amount: {amount}'}), 400

        # Convert amounts to Wei
        amounts_wei = [to_wei(float(amount), 'ether') for amount in amounts]
        total_amount = sum(amounts_wei)

        # Get account from private key
        account = w3.eth.account.from_key(PRIVATE_KEY)
        
        # Build transaction
        nonce = w3.eth.get_transaction_count(account.address)
        gas_price = w3.eth.gas_price

        transaction = contract.functions.airdropEth(
            recipients,
            amounts_wei
        ).build_transaction({
            'from': account.address,
            'value': total_amount,
            'gas': 2000000,  # You might want to estimate gas instead of hardcoding
            'gasPrice': gas_price,
            'nonce': nonce,
        })

        # Sign and send transaction
        signed_txn = w3.eth.account.sign_transaction(transaction, PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        
        # Wait for transaction receipt
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        return jsonify({
            'success': True,
            'transaction_hash': tx_receipt['transactionHash'].hex(),
            'block_number': tx_receipt['blockNumber']
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

# # contract_abi.json
# {
#     "abi": [
#         {
#             "inputs": [
#                 {
#                     "internalType": "address[]",
#                     "name": "_recipients",
#                     "type": "address[]"
#                 },
#                 {
#                     "internalType": "uint256[]",
#                     "name": "_amounts",
#                     "type": "uint256[]"
#                 }
#             ],
#             "name": "airdropEth",
#             "outputs": [],
#             "stateMutability": "payable",
#             "type": "function"
#         }
#         // Add other contract functions as needed
#     ]
# }