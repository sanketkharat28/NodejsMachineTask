Node.js Machine Test – Category & Product Management

📌 Project Overview

This project is developed as part of the Node.js Machine Test of Nimap Infotech (Round 2). It is a simple Category & Product Management System built using React, Node.js, Prisma ORM, and PostgreSQL.
The application allows:
* Managing categories (CRUD)
* Managing products (CRUD)
* Assigning each product to a category
* Viewing products with server-side pagination


<br><br>
🛠 Tech Stack 

Frontend
* React (Vite)
* JavaScript
* Fetch API



Backend
* Node.js
* Express.js
* Prisma ORM (Prisma v6)


Database
* PostgreSQL (RDBMS)


📂 Project Structure

```
nimap-machine-test/
 ├── backend/
 │   ├── prisma/
 │   │   └── schema.prisma
 │   ├── src/
 │   │   ├── routes/
 │   │   │   ├── category.js
 │   │   │   └── product.js
 │   │   ├── prismaClient.js
 │   │   └── index.js
 │   ├── .env
 │   └── package.json
 │
 └── frontend/
     ├── src/
     │   ├── api/
     │   ├── pages/
     │   ├── App.jsx
     │   └── main.jsx
     └── package.json

```

🧩 Features
Category Master
* Add category
* View all categories
* Edit category
* Delete category


Product Master
* Add product
* Edit product
* Delete product
* Each product belongs to one category
Product Listing
* Displays:
   * ProductId
   * ProductName
   * CategoryId
   * CategoryName
Pagination (Server-Side)
* Pagination is handled on the backend
* Only required records are fetched from the database per page
* Implemented using Prisma `skip` and `take`


📄 Database Schema
Category
* `id` (Primary Key)
* `name`
Product
* `id` (Primary Key)
* `name`
* `categoryId` (Foreign Key → Category)


🚀 How to Run the Project

1️⃣ Backend Setup

```
cd backend
npm install

```

Create `.env` file:

```
DATABASE_URL="your_postgres_database_url"

```

Run Prisma migration:

```
npx prisma migrate dev --name init

```

Generate Prisma Client:

```
npx prisma generate

```

Start backend server:

```
node src/index.js

```

Backend runs on:

```
http://localhost:3000

```

2️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev

```

Frontend runs on:

```
http://localhost:5173

```


✅ Machine Test Requirements Covered

✔️ Node.js backend 

✔️ RDBMS (PostgreSQL) 

✔️ Category CRUD 

✔️ Product CRUD

✔️ Product–Category relationship 

✔️ Server-side pagination

✔️ GitHub project submission



👤 Author

Sanket Kharat



📎 Note

This project is created strictly for evaluation purposes as part of the Nimap Infotech Node.js Machine Test.