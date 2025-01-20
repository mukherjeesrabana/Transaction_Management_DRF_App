# Transaction Management App

## Overview

This project is a transaction management application built using Django REST Framework (DRF) for the backend and React for the frontend. The application allows users to manage transactions, categories, and subcategories, and provides an admin dashboard for user management.
## User Roles

There are two types of roles in the application:

- **Admin User**: Responsible for user management.
- **Standard User**: Has access to transaction and category management features.

## Standard User Features

**-User Authentication and Authorization**
- Sign In:-  Users can sign in to the application using their email and password.
- Frontend Route:-  http://localhost:3000/authentication/sign-in
- User Behavior:-  Users enter their email and password to log in. Upon successful login, they are redirected to their dashboard or the last visited page.

- Sign Up:-  New users can sign up for an account by providing their details.
- Frontend Route:-  http://localhost:3000/authentication/sign-up
- User Behavior:-  Users fill out a form with their first name, last name, email, and password to create a new account. Upon successful registration, they are redirected to the sign-in page.

**- Transaction Management**

- Add Transactions:- Users can add new transactions by providing details such as date, amount, category, subcategory, and description.
- User Behavior:- Users fill out a form to add a new transaction. Upon submission, the transaction is added to their list of transactions.

- Bulk Upload Transactions:- Users can upload a .xls file containing transaction details to add multiple transactions at once.
- User Behavior:- Users can navigate to the bulk upload page and upload a .xls file with transaction details. The system processes the file and adds the transactions to the database. Users receive feedback on the success or failure of the upload.

- View Transactions:- Users can view a list of their transactions.
- User Behavior:- Users can see a table or list of all their transactions, with details such as date, amount, category, subcategory, and description.

- Edit Transactions:- Users can edit existing transactions.
- User Behavior:- Users can click on an edit button next to a transaction to modify its details. Upon submission, the changes are saved.

**- Category and Subcategory Management**

- Add Categories: Users can add new categories for transactions.
- User Behavior: Users fill out a form to add a new category. Upon submission, the category is added to their list of categories.

- View Categories: Users can view a list of categories.
- User Behavior: Users can see a table or list of all categories they have created.

- Edit Categories: Users can edit existing categories.
- User Behavior: Users can click on an edit button next to a category to modify its details. Upon submission, the changes are saved.

- Add Subcategories: Users can add new subcategories under existing categories.
- User Behavior: Users fill out a form to add a new subcategory under a selected category. Upon submission, the subcategory is added to their list of subcategories.

- Edit Subcategories: Users can edit existing subcategories.
- User Behavior: Users can click on an edit button next to a subcategory to modify its details. Upon submission, the changes are saved.

- View Subcategories: Users can view a list of subcategories.
- User Behavior: Users can see a table or list of all subcategories they have created.

**- Monthly Reports and Charts**
- Monthly Expense and Credit Summary:- Users can view a summary of their monthly expenses and credits.
- User Behavior:- Users can see a bar chart or line chart showing the total expenses and credits for each month.

- Category-wise Breakdown:- Users can view a breakdown of their expenses and credits by category.
- User Behavior:- Users can see a bar chart or pie chart showing the distribution of expenses and credits by category.

## Admin User Features:

**- Admin Dashboard for User Management**:
- User List:- Admins can view a list of all users, including their details such as username, email, role, and status.
- User Behavior:- Admins can see a table or list of all users in the system. They can view details such as first name, last name, email, username, user type, and status.

- Add User:- Admins can add new users to the system.
- User Behavior:- Admins fill out a form to add a new user. Upon submission, the user is added to the system and appears in the user list.

- Bulk Upload Users:- Admins can upload a .xls file containing user details to add multiple users at once.
- User Behavior:- Admins can navigate to the bulk upload page and upload a .xls file with user details. The system processes the file and adds the users to the database. Admins receive feedback on the success or failure of the uplo

- Edit User:- Admins can edit existing user details.
- User Behavior:- Admins can click on an edit button next to a user to modify their details. Upon submission, the changes are saved.

### Project Structure
- **backend:** Contains the Django backend code.
- **client:** Contains the React frontend code.

## Installation Steps

### Clone the Repository
Open gitbash and run the following commands:
```
git clone https://github.com/your-repo/transaction_management_drf_practice_app.git
cd transaction_management_drf_practice_app
git checkout back_front_integration
```
### Backend Setup
**- Install Python:**
Ensure Python is installed on your system. You can download it from python.org.

**- Create a Virtual Environment:**
```
cd backend
python -m venv venv
```
**- Activate the Virtual Environment:**

- On Windows:
```
venv\Scripts\activate
```
- On macOS/Linux:
```
source venv/bin/activate
```
**- Install Requirements:**
```
pip install -r requirements.txt
```
**- Make Migrations:**
```
python manage.py makemigrations
```
**- Apply Migrations:**
```
python manage.py migrate
```
**- Create Superuser:**
```
python manage.py createsuperuser
```
**- Run the Backend Server:**
```
python manage.py runserver
```

 The backend server will be available at http://127.0.0.1:8000/admin. Use the superuser credentials to log in.

### Frontend Setup
**- Install Node.js and npm:** 
Ensure Node.js and npm are installed on your system. You can download them from nodejs.org.

**- Install React:**
If React is not installed on your local system, you can install it using npm:
```
npm install -g create-react-app
```
**- Install Frontend Dependencies:**
```
cd client
npm install
```
**- Run the Frontend Server:**
```
npm start
```
The frontend server will be available at http://localhost:3000. Paste http://localhost:3000/authentication/sign-in in the browser tab to proceed futher.


### Additional Information
- **Django Admin Dashboard:** Access the admin dashboard at http://127.0.0.1:8000/admin using the superuser credentials.
- **API Endpoints:** The backend provides various API endpoints for managing transactions, categories, subcategories, and users.
- **Frontend:** The frontend provides a user-friendly interface for managing transactions and viewing reports.

### Conclusion
This project provides a comprehensive solution for managing transactions and users, with a robust backend built using Django REST Framework and a modern frontend built using React. Follow the installation steps to set up the project on your local system and explore its features.

