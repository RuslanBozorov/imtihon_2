import { Router } from "express";
const router = Router()
import ordersRoutes from '../controller/orders.controller.js'

router
    .get("/order/",ordersRoutes.GET)
    .post("/order",ordersRoutes.POST)
    .put("/order/:id",ordersRoutes.PUT)
    .delete("/order/:id",ordersRoutes.DELETE)

export default router    
    


