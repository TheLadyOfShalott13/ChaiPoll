# Chai Poll System

## Project Specifications
This project is used to demonstrate an example of **MyERN stack (MySQL, Express.js + Vite.js, React.js, Node.js) CRUD application** displaying **real time updates using Web Sockets (sockets.io)**. The ORM used here is **sequelize**. The backend is hosted as a **microservice**, each CRUD action invokes an **API** to a service. Login authentication is done using **JWT**.

## Table of Contents 
- [Basic Idea](#basic-idea) 
- [Running The Project](#running-the-project) 
- [Product Features](#product-features) 
- [Use Cases](#use-cases)
- [Dependencies](#dependencies)
- [License](#license) 
- [Authors](#authors)

## Basic Idea
This idea came to me in my last full time job. Every day at 4pm, all the developers would require caffing up to continue fuelling till the end of the day. A Whatsapp poll would be set by me (because somehow I ended up as the designated orderer) included various chai and coffee configurations - _1 aed chai (no sugar), 1 aed chai (normal sugar), 2 aed chai (no sugar), 2 aed chai (normal sugar), black coffee, sulaymani chai_ - employees would vote for the order of their choice and an order would be placed (usually over whatsapp with any one of nearby local cafeterias). Once the order has been paid for, there is the matter of settling employee balances.

I wanted a solution which would automate the entire process including setting the poll, displaying the results in realtime, and automate the sending of the order over whatsapp automatically at a certain time (which can be achieved using cron jobs). 

## Running the Project
### Prerequisites
The following must be installed and setup before proceeding with running this project:
- MySQL Server
- Node Package Manager on the backend server
- Nodemon via command line `npm install nodemon`

_Note: This project uses the Javascript ES6 standard._

### Setting up the backend
In order to run this project, we need to follow the below steps:
1. Navigate to `/server` folder
2. Create a `.env` file of the following format:
    ```
   DB_HOST = "<DB_HOST>"
   DB_USER = "<DB_USER>"
   DB_PASSWORD = "<DB_PASSWORD>"
   DB_NAME = "<DB_NAME>"
   DB_PORT = <DB_PORT>
   APP_PORT = <APP_PORT>
   CORS_PORT = <CORS_PORT>
   JWT = <JWT>
   ```
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` are MySQL connection information.
   - `APP_PORT` refers to the backend port number.
   - `CORS_PORT` refers to the frontend port number.
   - Eg, if this is run on `localhost`, if the backend is run from `localhost:7700` and the frontend is run from `localhost:5173` then `APP_PORT` = 7700 and `CORS_PORT` = 5173.
   - `JWT` is the Javascript Web Token used for authentication and can be any kind of string generated.
3. (Only if running it for the first time) Run the command `npm install` to install all the dependencies given in the `package.json` file.
4. Run the command `nodemon ./index.js`

### Setting up the frontend
In order to run this project, we need to follow the below steps:
1. Navigate to `/client` folder
2. Create a `.env` file of the following format:
    ```
   REACT_APP_API_PORT = <BACKEND_PORT>
   REACT_APP_HTTP_PORT = <FRONTEND_PORT>
   REACT_APP_DB_HOST = <DB_HOST>
   VITE_API_PORT = <BACKEND_PORT>
   VITE_HTTP_PORT = <FRONTEND_PORT>
   VITE_SERVER = <SERVER_HOST>
   ```
   - `REACT_APP_API_PORT` and `VITE_API_PORT` share the same value, which is the backend port number.
   - `REACT_APP_HTTP_PORT` and `VITE_HTTP_PORT` share the same value, which is the frontend port number.
   - `VITE_SERVER` is the server address in Domain Name or IP address format. In this case, it would be `localhost`.
3. (Only if running it for the first time) Run the command `npm install` to install all the dependencies given in the `package.json` file.
4. Run the command `npm run dev`

## Product Features
- Real time updates while users select menu items using Web Socket technology
- Data Visualization using MUI X-Chart components
- Scheduled order placement automation using cron jobs
- Dynamic data rendering and updates upon user interaction


## Use Cases
- Register and login employees as users and participants of polls. Departments must be assigned to every user. 
- Item Categories can be added and modified. This will be used as menu item category when entering menus into the database.
- Restaurants can be added and modified. Whatsapp number will be compulsory with phone numbers. 
- Menus can be added and modified. Every menu item will be associated with a restaurant and a category.
- Polls can be initiated or closed from the Restaurants module. A single poll can be run at a time for a single restaurant. The currently active poll will be displayed on the home page in the form of Bar Charts. 
- Each user may only vote for a single item atmost once. A user may vote for several items (to enable multiple item selection)
- Order history can be viewed in the order history module. When viewing order details, all order items are displayed including the price at the time of the order placement.  
- A pending order means that the order hasn't been settled yet. To settle the balances of all order items, a user must mark against each order item that it has been settled. The order history displays who ordered what and how much is due.


## Dependencies
### Backend 
1. **Axios**: Promise based Node.js API Middleware
2. **Bcrypt.js**: Node.js password hashing and comparison library
3. **Cookie-Parser**: Node.js cookie parsing library. Used for setting cookies that will be used to authenticate active sessions.
4. **Cors**: Cross-Origin Resource Sharing library 
5. **Dotenv**: Node.js `.env` Middleware
6. **Express.js**: Node.js framework
7. **Helmet**: Helps to secure express apps by setting HTTP response headers.
8. **JSON Web Token (JWT)**: Token based authentication used while logging in
9. **Morgan**: Node.js request logger middleware
10. **Multer**: Node.js file uploader middleware (handling `multipart/form-data` forms)
11. **MySQL2**: Node.js MySQL driver
12. **Nodemon**: Automatically restarts the application when file changes in the directory are detected.
13. **Sequelize**: ORM (Object Relational Mapping) library used for interacting with MySQL Server
14. **Socket.io**: Node.js Web Socket library

### Frontend
1. **Axios**: Promise based Node.js API Middleware
2. **React.js**: Asynchronous frontend JS framework
3. **React Bootstrap**: React.js Bootstrap Styling Library
4. **React DOM**: React.js DOM renderer
5. **React Router DOM**: React.js Router Library
6. **React Select**: React.js Select Component
7. **React Tooltip**: React.js Tooltip Component
8. **Socket.io Client**: Web Socket Technology client-side
9. **Web Vitals**: Web application health logger 
10. **Font Awesome**: Icons imported from Font Awesome for various actions per item per module
11. **MUI X-Charts**: Chart components used for displaying real time updates during an active poll
12. **React Hooks**
13. **React Refresh**
14. **Vite**: Frontend tooling


## License
This is a personal project not open to distribution or duplication without the consent of the author. 

## Authors
Created exclusively by [Nisreen K. aka TheLadyOfShalott](https://github.com/TheLadyOfShalott13)