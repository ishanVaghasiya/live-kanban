# live-kanban
live Kanban using Next Js


# Project Setup
NODE Version : v20.18.1
NVM Version  : v1.1.11

# For Start Project
npm i 
start project : npm run dev 



# Key Features
1) State Management:
    Redux Toolkit (RTK) for managing global state.
2) State Persistence:
    Redux Persist to persist authentication and state across page reloads.
3) Live Board Update:
    All login user can view task update on live time
4) Protector Router:
    You can access app only after Login
5) Role base Permission:
    Admin can create, add, edit and remove task
6) User Login and Logout 
    User can Easily login to view the dashboard   
7) Code Standard
    Add Typescript Validation to avoid data leak 
8) Base Path feature
    Import any module directly at any file without checking relative path    
Form
    User Formik and Yup for create form and manage form validation

<!-- Form -->
For Managing Simple and complex form use common Form component (src\components\form)

<!-- Development Guide -->
1) Do not user any third part UI component 
  First create Component with KB<component_name> prefix to avoid name conflict with original source   
2) Create re-useable Common component and Follow DRY principal
3) Write logical part of component into it's own separate hook
4) Avoid any Type and add create accurate type or interface

# How to Test
Login with different user on different browser and go to kanban tab
(Add, Remove, Update) any task and see live change to all login user

# Video Link
https://www.loom.com/share/4d4d49c2b5d14ce4baffcd74660f92af?sid=b59bb831-e8ec-41db-9128-f2f19582e959

 # For Login use any of user (If you want to add more user then you can add from this file : (pages\api\auth\login.ts) )
 [
  {
    id: 1,
    email: "admin@mail.com",
    password: "test@123",
    name: "Admin 1",
    role: "admin",
  },
  {
    id: 2,
    email: "admin2@mail.com",
    password: "test@123",
    name: "Admin 2",
    role: "admin",
  },
  {
    id: 3,
    email: "test1@mail.com",
    password: "test@123",
    name: "Test User 1",
    role: "user",
  },
  {
    id: 4,
    email: "test2@mail.com",
    password: "test@123",
    name: "Test User 2",
    role: "user",
  },
];    


