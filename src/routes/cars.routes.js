import { Router } from "express";
const router = Router()
import carsRouter from '../controller/cars.controller.js'

router
    .get("/cars",carsRouter.GET)
    .post("/cars",carsRouter.POST)
    .put("/cars/:id",carsRouter.PUT)
    .delete("/cars/:id",carsRouter.DELETE)


export default router    
    