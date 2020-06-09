
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const router = require('./routers');
console.log("IN INDEX.JS");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.use('/auth', router.auth);
app.use('/job-post', router.jobPost)
app.use('/jobs', router.jobs)

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening on port : ${port} ..`);
});