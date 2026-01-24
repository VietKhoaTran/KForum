# KForum — Gossip Platform

KForum is a full-stack, real-time forum website application. It allows users to engage in dynamic discussions through topics, posts, and nested comments, featuring a hybrid architecture of RESTful APIs and WebSockets.

**Live Demo:**  
http://3.104.37.58:3000/KForum/

---

## 🚀 Technical Highlights

- **Backend:** Built with **Go (Golang)** and the **Gin** framework for high-performance, concurrent API handling.
- **Frontend:** Developed using **React.js** and **TypeScript**, utilizing **Material UI (MUI)** for a polished, responsive user interface.
- **Real-Time:** Integrated **WebSockets (Socket.io)** to enable instantaneous comment updates and messaging.
- **Infrastructure:** Containerized with **Docker** and deployed on **AWS EC2** for scalable cloud hosting.
- **Database:** Robust relational data management using **PostgreSQL** with ACID compliance.

---

## 🛠 Features

- **User Authentication:** Secure JWT-based login with persistent sessions via HTTP-only cookies.
- **Content Management:** Full CRUD (Create, Read, Update, Delete) capabilities for Topics, Posts, and Comments.

### Interactive Engagement
- **Reactions:** Like/Dislike system for posts and comments.
- **Nesting:** Support for direct replies creating threaded discussions.
- **Bookmarking:** Pin important topics to a personal list for quick access.

### Moderation & Reliability
- **Moderation Tools:** Post creators can pin insightful comments to the top of the thread.
- **Reliability:** Automated Cron Jobs for scheduled PostgreSQL database backups.

## 📁 Project Structure

```text
.
├── frontend/                       # React + TypeScript (Material UI)
│   └── src/
│       ├── api/                    # API & WebSocket configuration
│       ├── hooks/                  # Custom React hooks (logic layer)
│       │   ├── api/                # Hooks for API calls
│       │   └── managers/           # State & logic managers
│       ├── image/                  # Image assets
│       ├── pages/                  # Page-level components
│       ├── types/                  # Typescript type definitions
│       ├── utils/                  # Shared utility functions  
│       ├── App.tsx                 # Root React component
│       ├── index.tsx               # React entry point
│       └── index.css               # Global styles
│
├── backend/                        # Go (Golang) + Gin Framework
│   └── internal/                   
│       ├── config/                 # Applicaiton & Environment configuration 
│       ├── controllers/            # HTTP & WebSocket request handlers
│       ├── dataaccess/             # Database access layer
│       ├── database/               # PostgreSQL connection & setup 
│       ├── middleware/             # Authentication
│       ├── models/                 # Data models 
│       ├── router/                 # Gin router initialization
│       ├── routes/                 # API route definitions
│       └── utils/                  # Shared utility functions 
│    └── socket-server/             # socket server implementation for real-time update
└── README.md

```
## 🏗 Installation & Setup

### 1. Backend Setup (Go + PostgreSQL)

The backend uses **Docker Compose** to orchestrate the Go (Gin) server and the PostgreSQL database.

```bash
cd backend
# Create your .env file here (DB_USER, DB_PASSWORD, etc.)
docker-compose up --build -d
```

### 2. Frontend Setup (React + TypeScript)

The frontend is containerized using **Docker** and runs as a standalone service.

```bash
cd frontend

# Build the Docker image
docker build -t kforum-frontend .

# Run the container
docker run -d  -p 3000:3000 --name kforum-frontend kforum-frontend
```

## 📝 Design Philosophy

KForum was built with a focus on **Separation of Concerns**. The frontend uses a **Manager Hook** pattern to separate UI logic from API calls, while the backend utilizes a modular **controller–service–model** pattern.
