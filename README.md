# 📌 HashLEY – AI-Powered DeFi Assistant

**HashLEY** is an AI-powered **DeFi assistant** that simplifies blockchain interactions through a **GPT-like interface**. It allows users to **search trending tokens, and customize the AI agent’s personality**.

---

## 🌟 Features

- 🔍 **Search Trending Tokens** – Get insights into the latest tokens across multiple chains.

---

## 🛠️ Tech Stack

HashLEY is built with **modern Web3 and AI technologies**:

- **Frontend**: [Next.js](https://nextjs.org/) (React-based)
- **Backend**: [MongoDB](https://mongodb.com/) (for chat functionality & vector embeddings)
- **Blockchain**: Various **RPCs & APIs** for on-chain interactions
- **Wallet Auth**: [Privy](https://privy.io/) (secure authentication)

---

## 🚀 Getting Started

### 1️⃣ Installation

Clone the repository:

```sh
git clone https://github.com/0xthomas26/hashley.git
cd hashley
```

Install dependencies:

```sh
pnpm install
```

---

### 2️⃣ Environment Variables

Follow the `.env.local` file in the root directory and add the following:

```env
PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_app_secret
OLLAMA_BASE_URL=your_ollama_url
SOLANA_RPC_URL=your_solana_rpc_url
GEMINI_API_KEY=your_gemini_api_key
COINGECKO_API_KEY=your_coingecko_api_key
ALCHEMY_API_KEY=your_alchemy_api_key
HELIUS_API_KEY=your_helius_api_key
MONGODB_URI=your_mongodb_uri
MONGODB_DB_NAME=your_mongodb_db_name
```

---

### 3️⃣ Run the App

Start the development server:

```sh
pnpm dev
```

Open **http://localhost:3000** in your browser.

---

## 🔗 Usage

### 💬 Chat with HashLEY

1. **Ask about trending tokens**:

    _Example:_ `What’s are the trending tokens?`

2. **Ask about tokens metadata**:

    _Example:_ `What’s is this token 0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6?`

3. **Customize AI personalities**:

    Update the @ai/character.ts file

---

**Built for fun.**
**HashLEY – Your AI-powered DeFi assistant.**
