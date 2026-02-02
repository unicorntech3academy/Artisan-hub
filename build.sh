#!/usr/bin/env bash
# exit on error
set -o errexit

# Install backend dependencies
pip install -r requirements.txt

# Build the frontend
cd frontend
npm install
npm run build 
cd ..

# Run migrations and collect static files
cd backend
python manage.py migrate
python manage.py collectstatic --no-input
cd ..
