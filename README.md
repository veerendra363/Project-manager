# Project Manager - Backend Setup

This document explains how to set up and run the Project Manager Backend using Django + PostgreSQL.

---

## Setup Guide

```bash
# Step 1: Environment Setup

# 1. Clone the repository
git clone <your-repo-url>
cd project-manager

# 2. Create a virtual environment
python -m venv venv

# 3. Activate the virtual environment
# On Windows (PowerShell)
.\venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# 4. Install dependencies
pip install django==4.2 djangorestframework graphene-django psycopg2-binary

# 5. Verify installation
pip show django
pip show graphene-django


# Step 2: PostgreSQL Setup

# 1. Install PostgreSQL (with pgAdmin, default port 5432)

# 2. Add PostgreSQL bin folder to PATH
# Example: C:\Program Files\PostgreSQL\15\bin

# 3. Check installation
psql --version

# 4. Open PostgreSQL shell
psql -U postgres

# 5. Create database
CREATE DATABASE projectmanager;


# Step 3: Configure Database in Django
# Update project_manager/backend/settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'projectmanager',
        'USER': 'postgres',
        'PASSWORD': 'BK@143',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


# Step 4: Apply Migrations
python manage.py migrate


# Step 5: Create Superuser
python manage.py createsuperuser


# Step 6: Run Development Server
python manage.py runserver
