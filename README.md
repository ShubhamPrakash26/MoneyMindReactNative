# 💰 MoneyMind - Smart Budgeting App

**MoneyMind** is a cross-platform mobile app designed to help users **track their expenses**, **manage finances**, and stay on top of their budgets—**all in real-time**.

> 📲 Download the latest APK: [Click here to download](https://github.com/ShubhamPrakash26/MoneyMindReactNative/releases/download/MoneyMind/MoneyMind.apk)

---



## ✨ Features

- 📱 **Cross-Platform App** – Built using React Native & Expo
- 🔐 **Authentication** – Secure sign-up and login via Clerk
- 📩 **Email Verification** – 6-digit code-based email verification
- 🏠 **Five Core Screens** – Signup, Login, Verify Email, Home, Create Transaction
- 💸 **Expense Tracker** – Add and manage income or expense entries
- 📊 **Live Balance Updates** – Real-time calculations of your balance
- 🗑️ **Delete Transactions** – Tap to remove unwanted financial entries
- 🔄 **Pull to Refresh** – Smooth refresh mechanism from scratch
- 🚪 **Logout Functionality** – Easily switch or log out of accounts
- 🧰 **Backend with Express.js** – Secure API with Neon-hosted Postgres DB
- 🌐 **Cloud Deployed** – Fully accessible backend from anywhere
- ⏱️ **Rate Limiting** – Redis-based protection for API
- 🧠 **Beginner Friendly** – Built to be accessible for those new to React Native
- 💸 **100% Free Tools** – Entirely built using open-source/free resources
- 🧪 **Real Device Testing** – Works on your Android phone without a Mac

---

## 📸 Screenshots

| Login Screen | Home Screen | Create Transaction Screen |
|--------------|-------------|----------------------------|
| ![Login](https://github.com/user-attachments/assets/def4832b-158e-4296-bc47-a5e8e5d65423) | ![Home](https://github.com/user-attachments/assets/61f9b957-1f9c-4389-ba4e-2d2fec2f7db4) | ![Create](https://github.com/user-attachments/assets/a0dab0f5-416c-4a91-a373-80a7b8c400f1) |

---

## 🛠️ Tech Stack

### Frontend:
- React Native
- Expo
- Clerk (for Auth)
- AsyncStorage (local state)

### Backend:
- Node.js
- Express.js
- PostgreSQL (Neon)
- Redis (Rate Limiting)

---

## 🧪 Getting Started

### 📦 Prerequisites
- Node.js & npm
- Expo CLI (`npm install -g expo-cli`)
- Git
- PostgreSQL (hosted on [Neon](https://neon.tech))

### 🚀 Running the App

```bash
# Clone the repo
git clone https://github.com/shubhamprakash26/MoneyMind.git
cd MoneyMind

# Install dependencies
npm install

# Start the Expo app
npx expo start
```

Open the Expo app on your phone and scan the QR code!

---

## 🌐 Backend Setup

Navigate to the `server/` folder if backend is included.

### Configure `.env`:

```env
PORT=5000
DATABASE_URL=your_neon_db_url
REDIS_URL=your_redis_url
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Start the server:

```bash
cd server
npm install
npm run dev
```

---

## 📦 APK Download

👉 [**Download Latest APK**](https://github.com/ShubhamPrakash26/MoneyMindReactNative/releases/download/MoneyMind/MoneyMind.apk)

Install this on your Android device to try out the app instantly.

---

## 🤝 Contributing

We welcome contributions from the community!

```bash
# Fork the repository
# Create a new branch: git checkout -b feature/YourFeature
# Commit your changes: git commit -m "Add Your Feature"
# Push to GitHub: git push origin feature/YourFeature
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Built with ❤️ by [Shubham Prakash](https://github.com/shubhamprakash26)
