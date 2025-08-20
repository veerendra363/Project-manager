# Project Manager App

This mini application demonstrates how organizations can manage **projects, tasks, and comments** in a structured, multi-tenant system with GraphQL APIs, PostgreSQL database, and a modern React-based UI.

## 🚀 Features

- **Landing Page / Organization Dashboard**
  - Lists all organizations in a paginated table
  - Actions:
    - ➕ Add new organization  
    - ✏️ Edit organization  
    - 📂 Go to the project dashboard of that organization  

- **Project Dashboard**
  - Displays projects for a selected organization (paginated list view)
  - Actions:
    - ➕ Add new project  
    - ✏️ Edit project  
    - 📂 Go to the task dashboard of that project  
    - ⬅️ Back button to return to Organization Dashboard

- **Task Dashboard**
  - Shows tasks of a selected project (paginated list view)
  - Actions:
    - ➕ Add new task  
    - ✏️ Edit task  
    - 📂 Go to Task Comments section  
    - ⬅️ Back button to return to Project Dashboard

- **Task Comments**
  - Add new comments to a task  
  - View the latest 25 comments in chronological order

- **General Features**
  - Pagination support on all dashboards (organizations, projects, tasks)  
  - Toast messages for success/error notifications  
  - Loading indicators during API/network calls  
  - GraphQL API with Apollo Client integration  
  - Responsive UI with TailwindCSS  

---

## 🛠 Tech Stack

- **Backend:** Django, Python, GraphQL (Graphene), PostgreSQL, GraphiQL (for API exploration)  
- **Frontend:** React, TypeScript, Apollo Client, TailwindCSS, Lucide-react (icons), React Router DOM  
- **Database:** PostgreSQL  
- **Tools:** VS Code, GitHub, pip, npm, pgAdmin  

---

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

- **React 18+**  
- **Node.js (v18 or above)** – comes with **npm** by default  
- **Python 3.9+** (for Django and dependencies)  
- **PostgreSQL** (for the database)  
- **Git** (for version control)  
- **pgAdmin** (optional, for managing PostgreSQL)  
- **IDE** (optional: any IDE/editor like VS Code or PyCharm that supports React and Django is fine)  

---

## ⚙️ Setup Guide (Windows)
Clone the project to your local machine.  
    `git clone <your-repo-url>`

### Frontend Setup
- Navigate to the frontend folder  
   - `cd frontend`
- Install dependencies  
   -  `npm install`
- Start the development server  
    - `npm run dev`

### Backend Setup

- Navigate to the backend folder   
    - `cd backend`
- Create a virtual environment  
    - `python -m venv venv`
- Activate the virtual environment  
   - `.\venv\Scripts\activate`
- Install dependencies  
    - `pip install django==4.2 djangorestframework graphene-django psycopg2-binary`
- Verify installation
    - `pip show django`
    - `pip show graphene-django`
- Create database in prosgreSQL db  
- Configure Database in Django  
    - Update project_manager/backend/settings.py
    - ```bash 
        DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'your_database_name',
            'USER': 'your_database_user',
            'PASSWORD': 'your_database_password',
            'HOST': 'localhost',   # or your DB server/hostname
            'PORT': '5432',        # default PostgreSQL port
            }
        }
- Apply Migrations  
    - `python manage.py migrate`
- Seed Demo Data(optional)  
    - `python manage.py seed`
- Run Development Server  
    - `python manage.py runserver`
    - The server will start locally and be available at:  
    - Backend API: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)  
    - GraphQL Playground (GraphiQL): [http://127.0.0.1:8000/graphql/](http://127.0.0.1:8000/graphql/)  
