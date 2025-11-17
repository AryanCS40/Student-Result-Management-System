const express = require('express');
const app = express();
require('dotenv').config();
 require('./config/mongoose-connection');
const cookieParser = require("cookie-parser");
const path = require("path");

const expressSession = require("express-session");
const flash = require("connect-flash");

const auth = require('./routes/auth');
const student = require('./routes/student');
const host = require('./routes/host');
const {error} = require('./controllers/error');

app.use(expressSession({
    resave : false,
    saveUninitialized : false,
    secret : process.env.SESSION_SECRET,
}));

app.use(flash());

app.use(express.json());
app.set('view engine' , 'ejs');
app.set('views' , 'views');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use(auth);
app.use(student);
app.use(host);   
app.use(error);

app.listen(3000);   
    
