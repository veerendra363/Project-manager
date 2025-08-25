
<p align="center">
  <img src="./Visuals/org_dashboard.png" alt="Organization Dashboard" width="200" height="150">
  <img src="./Visuals/org_form.png" alt="Organization Form" width="200" height="150">
  <img src="./Visuals/task_comment.png" alt="Task Comments" width="200" height="150">
  <img src="./Visuals/commnet_form.png" alt="Comment Form" width="200" height="150">
</p>

[Demo Video](./Visuals/project-manager.mp4)

- [Project Manager App](#project-manager-app)
   * [🚀 Features](#-features)
   * [🛠 Tech Stack](#-tech-stack)
   * [📋 Prerequisites](#-prerequisites)
   * [⚙️ Setup Guide (Windows)](#-setup-guide-windows)
      + [Frontend Setup](#frontend-setup)
      + [Backend Setup](#backend-setup)
   * [📄 API Documentation](#-api-docs)
   * [📸 Screenshots](#screenshots)


<!-- TOC end -->

<a name="project-manager-app"></a>
# Project Manager App

This mini application demonstrates how organizations can manage **projects, tasks, and comments** in a structured, multi-tenant system with GraphQL APIs, PostgreSQL database, and a modern React-based UI.

<!-- TOC --><a name="-features"></a>
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

<!-- TOC --><a name="-tech-stack"></a>
## 🛠 Tech Stack

- **Backend:** Django, Python, GraphQL (Graphene), PostgreSQL, GraphiQL (for API exploration)  
- **Frontend:** React, TypeScript, Apollo Client, TailwindCSS, Lucide-react (icons), React Router DOM  
- **Database:** PostgreSQL  
- **Tools:** VS Code, GitHub, pip, npm, pgAdmin  

---

<!-- TOC --><a name="-prerequisites"></a>
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

<!-- TOC --><a name="-setup-guide-windows"></a>
## ⚙️ Setup Guide (Windows)
Clone the project to your local machine.  
    `git clone <your-repo-url>`

<!-- TOC --><a name="frontend-setup"></a>
### Frontend Setup
- Navigate to the frontend folder  
   - `cd frontend`
- Install dependencies  
   -  `npm install`
- Start the development server  
    - `npm run dev`

<!-- TOC --><a name="backend-setup"></a>
### Backend Setup

- Run below commands in root folder(project-manager)
- Create a virtual environment  
    - `python -m venv venv`
- Activate the virtual environment  
   - `.\venv\Scripts\activate`
- Install dependencies  
    - `pip install -r requirements.txt`
- Verify installation
    - `pip freeze`
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
    - Or if you want to connect our remote db then create .env file and  assign your db connection string to DATABASE_URL
- Apply Migrations  
    - `python manage.py migrate`
- Seed Demo Data(optional)  
    - `python manage.py seed`
- Run Development Server  
    - `python manage.py runserver`
    - The server will start locally and be available at:  
    - Backend API: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)  
    - GraphQL Playground (GraphiQL): [http://127.0.0.1:8000/graphql/](http://127.0.0.1:8000/graphql/)   

<!-- TOC --><a name="-api-docs"></a>
## 📄 API Documentation

- The API documentation was generated using CLI tools.
- [Click here to open API Documentation](./APIDocumentation.md)

<a name="screenshots"></a>
## 📸 Screenshots
<p align="center">
  <img src="./Visuals/org_dashboard.png" alt="Organization Dashboard" width="200" height="150">
  <img src="./Visuals/org_form.png" alt="Organization Form" width="200" height="150">
  <img src="./Visuals/proj_dashboard.png" alt="Project Dashboard" width="200" height="150">
  <img src="./Visuals/proj_form.png" alt="Project Form" width="200" height="150">
  <br>
  <img src="./Visuals/task_dashboard.png" alt="Task Dashboard" width="200" height="150">
  <img src="./Visuals/task_form.png" alt="Task Form" width="200" height="150">
  <img src="./Visuals/task_comment.png" alt="Task Comments" width="200" height="150">
  <img src="./Visuals/commnet_form.png" alt="Comment Form" width="200" height="150">
</p>
