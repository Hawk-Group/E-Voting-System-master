from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import re
import smtplib
from email.message import EmailMessage
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load environment variables from .env2 file
load_dotenv('.env2')

EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')       # Your Gmail address
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')     # Your Gmail app password

# Aadhaar to email mapping (replace with real data in production)
aadhaar_email_mapping = {
    "445506305983": "jidneshshahs298@gmail.com",
    "468272826509": "abhaysanap2724@gmail.com",
    "925407858626" :"yashshahs175@gmail.com",
    "928826779347" :"hanumankeskar@gmail.com",
    "645382963738" :"krushnakhairnar04@gmail.com"
   

}

OTP_LENGTH = 6
OTP_VALIDITY_MINUTES = 5
otp_store = {}  # Store OTPs and their expiry keyed by Aadhaar number


def is_valid_aadhaar(aadhaar_number):
    return bool(re.match(r'^\d{12}$', aadhaar_number))


def generate_otp():
    return ''.join(str(random.randint(0, 9)) for _ in range(OTP_LENGTH))


def send_email(to_email, subject, body):
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email
    msg.set_content(body)

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        print(f"✅ Email sent to {to_email}")
        return True
    except Exception as e:
        print(f"❌ Failed to send email: {e}")
        return False


@app.route('/api/generate-otp', methods=['POST'])
def api_generate_otp():
    data = request.get_json()
    aadhaar = data.get('aadhaarNumber')

    if not aadhaar or not is_valid_aadhaar(aadhaar):
        return jsonify({'error': 'Invalid Aadhaar number.'}), 400

    email = aadhaar_email_mapping.get(aadhaar)
    if not email:
        return jsonify({'error': 'No email linked with this Aadhaar.'}), 404

    otp = generate_otp()
    expires_at = datetime.now() + timedelta(minutes=OTP_VALIDITY_MINUTES)
    otp_store[aadhaar] = {'otp': otp, 'expires_at': expires_at}

    # Updated email body
    body = f"""
Dear User,

Welcome to BlockVote – a secure and transparent blockchain-powered voting platform.

Your One-Time Password (OTP) for login is: {otp}

🕒 Please note: This OTP is valid for only {OTP_VALIDITY_MINUTES} minutes.

Thank you for choosing to vote with confidence and integrity.

Best regards,  
The BlockVote Team
"""

    if send_email(
        to_email=email,
        subject="Your BlockVote OTP",
        body=body
    ):
        return jsonify({'message': 'OTP sent successfully.'}), 200
    else:
        return jsonify({'error': 'Failed to send OTP email.'}), 500


@app.route('/api/verify-otp', methods=['POST'])
def api_verify_otp():
    data = request.get_json()
    aadhaar = data.get('aadhaarNumber')
    otp_input = data.get('otp')

    if not aadhaar or not otp_input:
        return jsonify({'error': 'Missing Aadhaar or OTP'}), 400

    stored = otp_store.get(aadhaar)
    if not stored:
        return jsonify({'error': 'OTP not found. Please request again.'}), 404

    if datetime.now() > stored['expires_at']:
        otp_store.pop(aadhaar, None)
        return jsonify({'error': 'OTP expired. Please request again.'}), 400

    if otp_input == stored['otp']:
        otp_store.pop(aadhaar, None)  # Clear OTP after successful verification
        return jsonify({'message': 'OTP verified successfully.'}), 200
    else:
        return jsonify({'error': 'Incorrect OTP.'}), 400


if __name__ == '__main__':
    app.run(debug=True)
