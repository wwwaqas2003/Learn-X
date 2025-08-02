from flask import Flask, request, jsonify
from flask_cors import CORS
from jose import jwt
import requests

app = Flask(__name__)
CORS(app)

# Replace with your actual Clerk info
CLERK_JWKS_URL = "https://complete-hare-60.clerk.accounts.dev/.well-known/jwks.json"
CLERK_AUDIENCE = "pk_test_Y29tcGxldGUtaGFyZS02MC5jbGVyay5hY2NvdW50cy5kZXYk"
CLERK_ISSUER = "https://complete-hare-60.clerk.accounts.dev"

# Your OpenRouter and app config
OPENROUTER_API_KEY = "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"
YOUR_SITE_URL = "http://localhost:5173"
YOUR_APP_NAME = "AlphaX"

# Load JWKS once at start
try:
    jwks = requests.get(CLERK_JWKS_URL).json()
except Exception as e:
    print("Failed to fetch JWKS from Clerk:", e)
    jwks = {"keys": []}


def verify_clerk_token(token):
    try:
        header = jwt.get_unverified_header(token)
        key = next((k for k in jwks["keys"] if k["kid"] == header["kid"]), None)
        if not key:
            raise Exception("Matching JWKS key not found.")
        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            audience=CLERK_AUDIENCE,
            issuer=CLERK_ISSUER,
        )
        return payload
    except Exception as e:
        raise Exception(f"JWT verification failed: {str(e)}")


@app.route("/")
def index():
    return jsonify({"message": "Flask backend running!"})


@app.route("/api/chat", methods=["POST"])
def chat():
    # Clerk JWT verification
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Missing or invalid Authorization header"}), 401

    token = auth_header.split(" ")[1]
    try:
        user = verify_clerk_token(token)
        print("✅ Verified user:", user["sub"])
    except Exception as e:
        print("❌ Clerk token verification failed:", e)
        return jsonify({"error": str(e)}), 401

    # Get prompt
    data = request.get_json()
    prompt = data.get("prompt", "").strip()
    if not prompt:
        return jsonify({"error": "Missing prompt"}), 400

    # Send prompt to OpenRouter
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "Referer": YOUR_SITE_URL,
        "X-Title": YOUR_APP_NAME,
    }

    payload = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
    }

    response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)

    if response.status_code == 200:
        result = response.json()
        return jsonify({"response": result["choices"][0]["message"]["content"]})
    else:
        return jsonify({
            "error": f"OpenRouter error: {response.status_code}",
            "details": response.text
        }), response.status_code


if __name__ == "__main__":
    app.run(debug=True, port=5000)
