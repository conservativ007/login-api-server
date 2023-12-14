### Task:

#### Create a simple website that enables user registration and login. On loging, display a simple string saying "hi {name} you're logged in."

The webpage will have the following fields:
- username
- name
- password

The backend will save the user into a database when registering. Then the user can login to the website using the credentials created on registration.

The backend should issue a JWT token on login.

Technology:
- NestJS for the backend
- React for the frontend
- Postgres as a database
- Use docker compose to deploy the frontend, backend and postgres

The project was divided into frontend and backend, this part is backend, frontend is available at the following addres  https://github.com/conservativ007/login-api-frontend

### How can you use this ?
1. downlad this repo with the next command `git clone https://github.com/conservativ007/login-api-server.git`.
2. navigate to the project folder and then run the next command `docker-compose up`.
3. After starting the project, type `http://localhost:3000` in your browser.

![signup](/src/images/signup.png)
![login](/src/images/login.png)
![home](/src/images/home.png)

p.s. Remember you must have Docker running