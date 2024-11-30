# live-kanban
live Kanban using Next Js


# Project Setup
NODE Version : v20.18.1
NVM Version  : v1.1.11

# For Start Project
npm i 
start project : npm run dev 



# Key Features
State Management:
    Redux Toolkit (RTK) for managing global state.
State Persistence:
    Redux Persist to persist authentication and state across page reloads.
Live Board Update:
    All login user can view task update on live time
Protector Router:
    You can access app only after Login
Role base Permission:
    Admin can create, add, edit and remove task
User Login and Logout 
    User can Easily login to view the dashboard   
Code Standard
    Add Typescript Validation to avoid data leak 


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


