import { Router } from "express";
const router = Router()
import ordersRoutes from '../controller/orders.controller.js'

router
    .get("/order/",ordersRoutes.GET)
    .post("/order",ordersRoutes.POST)

export default router    
    


