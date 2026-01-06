import express from 'express'
import { config } from 'dotenv'
import carRouter from './routes/cars.routes.js'
import customerRouter from './routes/customers.routes.js'
import ordersController from './routes/orders.routes.js'
config()
const PORT = 4545

const app = express()
app.use(express.json())
app.use(carRouter)
app.use(customerRouter)
app.use(ordersController)


app.listen(PORT,()=> console.log("Server is running"))