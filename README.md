# 📝 Task Management System

A comprehensive full-stack Task Management application designed to help users streamline their daily workflows, track task progression, and maintain productivity.

---

## 🚀 Features Implemented

### 💻 Frontend (Client)
* **Interactive Dashboard:** A clean, grid-based dashboard displaying overall task statistics.
* **Full CRUD Operations:** Users can seamlessly Create, Read, Update, and Delete tasks.
* **State Management:** Dynamic task categorization based on current status (e.g., Pending, In Progress, Completed).
* **Responsive Layout:** Tailored with modern CSS principles to ensure smooth viewing across mobile, tablet, and desktop viewports.

### ⚙️ Backend (Server)
* **RESTful Routing:** Secure, modular API endpoints for processing data transactions.
* **Persistent Storage:** Integrated with a cloud database to ensure data persistence and security.
* **Validation & Error Handling:** Middleware logic to prevent bad requests and return helpful server messages.

---

## 🛠️ Tech Stack Used

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS / Bootstrap | UI Components & Styling |
| **Backend** | Node.js, Express.js | Server & Business Logic |
| **Database** | MongoDB / SQL | Data Storage |

---

## 📂 Project Structure

```text
task-manager-assignment/
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/   # Dashboard, Home, Login, Registration
│   │   └── App.jsx
│   └── package.json
└── server/          # Backend Node/Express API
    ├── config/      # Database connections
    ├── models/      # Data Schemas
    └── server.js    # Entry point
