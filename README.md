# Dashboard Frontend

A frontend application built with React, Vite, and Tailwind CSS for visualizing dashboard data.

## Project Setup

### Prerequisites

Before you can run this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher recommended)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/shrikanthj189/dashboard_task.git

2. Install the project dependencies:
   
   ```bash
   cd frontend
   npm install

3. run command 

   ```bash
   npm run dev

# FastAPI Dashboard API

A comprehensive RESTful API built with FastAPI that provides dashboard analytics including label statistics, active user monitoring, and historical visit data.

## 📋 Overview

This API serves as a backend for dashboard applications, offering endpoints to retrieve:
- Perpetual label statistics
- Real-time active user counts
- Historical visit data with filtering options

## 📁 Project Structure

```
backend/
│ 
├── requirements.txt        # Project dependencies
└── app/
    ├── __init__.py         # Package initializer
    ├── database.py         # Database connection and session management
    ├── main.py             # Application entry point and configuration
    ├── models.py           # SQLAlchemy ORM models
    ├── routes.py           # API route definitions
    ├── sample_data.py      # Script to populate database with sample data
    ├── schemas.py          # Pydantic models for request/response validation
    └── utils.py            # Utility functions
```

## 🚀 Getting Started

Follow these steps to set up and run the project:

### 1. Clone the Repository

```bash
git clone https://github.com/shrikanthj189/dashboard_task.git
cd backend
```

### 2. Create and Activate a Virtual Environment

**Linux/macOS:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run Database Migrations

```bash
alembic upgrade head
```

### 5. Add Sample Data (Optional)

```bash
python -m app.sample_data
```

### 6. Start the Server

```bash
uvicorn app.main:app --reload
```

The API will be available at: http://localhost:8000

## 📡 API Endpoints

### 1. Perpetual Labels

Retrieves statistics on all labels in the system.

**Endpoint:** `GET /dashboard/perpetual/`

**Response Format:**
```json
{
  "total_label": 11280,
  "data": [
    {
      "id": "5a3ed8f8-5609-47a4-bd0b-cc0f670f0cca",
      "label": "Google.com Inc",
      "user_count": 3540,
      "created_at": "2025-04-30T09:40:46.545647",
      "updated_at": "2025-04-30T09:40:46.545648"
    },
    ...
  ]
}
```

### 2. Active Users

Provides real-time information about current user activity.

**Endpoint:** `GET /dashboard/active/`

**Response Format:**
```json
{
  "id": "c7cf1954-4c62-4665-95ab-72cd5acc2427",
  "total": 1000,
  "online": 750,
  "offline": 250,
  "created_at": "2025-04-30T09:40:46.545742",
  "updated_at": "2025-04-30T09:40:46.545742"
}
```

### 3. Visit History

Returns historical visit data with optional monthly filtering.

**Endpoint:** `GET /dashboard/visits/`

**Query Parameters:**
- `month` (optional): Filter visits by month in YYYY-MM format (e.g., 2020-04)

**Response Format:**
```json
[
  {
    "id": "edbb7fc8-500f-461b-a076-66381bfd2b3f",
    "date": "2020-04-01",
    "visit_count": 100,
    "month": "April 2020",
    "created_at": "2025-04-30T10:46:52.220410",
    "updated_at": "2025-04-30T10:46:52.220410"
  },
  ...
]
```

## 🔍 API Documentation

Once the server is running, access the auto-generated interactive API documentation:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🛠 Tech Stack

- **FastAPI**: High-performance web framework for building APIs
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM)
- **Pydantic**: Data validation and settings management
- **Alembic**: Database migration tool
- **Uvicorn**: ASGI server implementation
- **Python 3.8+**: Core programming language

## 🧪 Testing

Run the test suite with:

```bash
pytest
```