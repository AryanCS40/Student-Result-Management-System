# Student Result Management System

A complete **student result management system** built using **Node.js, Express, MongoDB, and EJS**. It allows hosts (admins) to create and manage student results, while students can securely log in and view their own results.

---

## 🚀 Features

### 👨‍🏫 Host (Admin)

* Register & login securely
* Create, update, and delete results
* Add multiple subjects with marks
* View all students and their results

### 🧑‍🎓 Student

* Register & login securely
* View personal result
* No access to modify results

### 🔒 Authentication & Authorization

* JWT-based login system
* Role-based page access
* Sessions using **express-session**
* Flash messages for success & error alerts

### 🗂 Tech Stack

* **Backend**: Node.js, Express.js
* **Frontend**: EJS, TailwindCSS 
* **Database**: MongoDB + Mongoose
* **Session & Security**: express-session, cookie-parser, dotenv

---

## 📁 Project Structure

```
Student-Result-Management/
│
├── config/
│   └── mongoose-connection.js
│
├── controllers/
│   ├── auth.js
│   ├── host.js
│   ├── student.js
│   └── error.js
│
├── middlewares/
│   └── auth.js
│
├── models/
│   ├── host.js
│   ├── result.js
│   └── student.js
│
├── public/ (CSS, JS, Images)
│
├── routes/
│   ├── auth.js
│   ├── student.js
│   └── host.js
│
├── views/
│   ├── partials/
│   ├── student/
│   ├── host/
│   └── error.ejs
│
├── .env
├── app.js
├── package.json
└── README.md
```

---

## 🔐 Login Flow

### Host

1. Host registers
2. Host logs in
3. Host can create/add, update and delete results for each student

### Student

1. Student create his/her account
2. Student logs in
3. Student can view their result only

---

## 📊 Result Example

Each result contains:

* Student details
* Subjects list
* Max & obtained marks
* Total marks
* Percentage
* Pass/Fail status

---

## 🛠 Important Middleware Used

### **express-session**

```js
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
}));
```

Provides login session handling.

### **connect-flash**

Used for showing temporary messages.

### **JWT Authentication**

Used for secure login token generation.

---

## 🤝 Contribution

Feel free to submit issues or pull requests.

---

## 📄 License

This project is open-source and free to use.

---

## 👨‍💻 Author

Developed by **Aryan**.

---


