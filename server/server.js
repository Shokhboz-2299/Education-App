const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 9000;
const verifyMiddleware = require('./middlewares/verifyStudents')

// middlewares
app.use(cors())
app.use(express.json())

// controllers
const loginController = require('./controller/loginController')
const postController = require('./controller/postController')

app.post('/login', loginController)
app.get('/studentCourses', verifyMiddleware, postController)

app.listen(9000, console.log(`server is running at ${PORT}`))