## Run Locally

### 1. Open repo

```
$ cd npsh-shop
```

### 2. Install MongoDB

Download from here: https://docs.mongodb.com/manual/administration/install-community/

### 3. Run Backend

```
$ npm install
$ npm start
```

### 4. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 5. Create Admin User

- Run: http://localhost:5000/api/users/createadmin
- It returns admin email and password

### 6. Login

- Open http://localhost:3000/signin
- Enter admin email and password and click signin

### 7. Create Products

- Run http://localhost:3000/products
- Click create product and enter product info
