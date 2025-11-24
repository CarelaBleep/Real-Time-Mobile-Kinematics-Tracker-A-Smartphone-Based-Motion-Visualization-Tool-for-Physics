import dotenv from 'dotenv'
import express from 'express'
import { userLogin, userSignup } from './controllers/controller.js';


dotenv.config();
const app = express()

app.use(express.json());

const PORT = process.env.PORT || 5000


app.get('/',(req, res)=>{
    res.send('hello world')
})

app.get('/user/login', userLogin)
app.get('/user/signup', userSignup)
app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`)
})
