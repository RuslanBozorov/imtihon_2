import { Router } from "express";
const router = Router()
import customersRouter from '../controller/customers.controller.js'

router
    .get("/users",customersRouter.GET)
    .post("/users",customersRouter.POST)
    .put("/users/:id",customersRouter.PUT)
    .delete("/users/:id",customersRouter.DELETE)


export default router    
    