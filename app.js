import express from 'express';
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./routes/api/contacts-router.js"
import dotenv from "dotenv";
import authRouter from './routes/api/auth-router.js';
import usersRouter from './routes/api/users-router.js';

dotenv.config();

export const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/api/auth', authRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({
    message,
  });
})


