import random
import time
import re
import hashlib
import requests
from flask import Flask, request, jsonify, render_template_string
import logging
from datetime import datetime, timedelta
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# In-memory database for demo purposes
otp_store = {}
aadhaar_mobile_mapping = {
    "928869220247": "+918600233074",
    "445506305983": "+917744936452",
}

# OTP configuration
OTP_LENGTH = 6
OTP_VALIDITY_MINUTES = 5

def is_valid_aadhaar(aadhaar_number):
    return bool(re.match(r'^\d{12}$', aadhaar_number))

def get_linked_mobile(aadhaar_number):
    return aadhaar_mobile_mapping.get(aadhaar_number)

def generate_otp():
    return ''.join([str(random.randint(0, 9)) for _ in range(OTP_LENGTH)])

def send_sms(mobile_number, message):
    logger.info(f"SMS would be sent to {mobile_number}: {message}")
    return True

@app.route('/api/generate-otp', methods=['POST'])
def generate_otp_api():
    data = request.get_json()
    aadhaar_number = data.get('aadhaarNumber')

    if not is_valid_aadhaar(aadhaar_number):
        return jsonify({'error': 'Invalid Aadhaar number'}), 400

    mobile_number = get_linked_mobile(aadhaar_number)
    if not mobile_number:
        return jsonify({'error': 'Aadhaar not found or mobile not linked'}), 404

    otp = generate_otp()
    expires_at = datetime.now() + timedelta(minutes=OTP_VALIDITY_MINUTES)
    otp_store[aadhaar_number] = {'otp': otp, 'expires_at': expires_at}

    message = f"Your OTP is: {otp}. It expires in {OTP_VALIDITY_MINUTES} minutes."
    send_sms(mobile_number, message)

    return jsonify({'message': 'OTP sent successfully'}), 200

@app.route('/api/verify-otp', methods=['POST'])
def verify_otp_api():
    data = request.get_json()
    aadhaar_number = data.get('aadhaarNumber')
    user_otp = data.get('otp')

    stored_otp_data = otp_store.get(aadhaar_number)
    if not stored_otp_data:
        return jsonify({'error': 'OTP not found or expired'}), 404

    if datetime.now() > stored_otp_data['expires_at']:
        del otp_store[aadhaar_number]
        return jsonify({'error': 'OTP expired'}), 410

    if user_otp == stored_otp_data['otp']:
        del otp_store[aadhaar_number]
        return jsonify({'message': 'OTP verified successfully'}), 200
    else:
        return jsonify({'error': 'Incorrect OTP'}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)