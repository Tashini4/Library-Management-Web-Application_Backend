import {NextFunction,Request,Response} from "express";
import * as mongoose from "mongoose";
import {ApiError} from "../Errors/ApiError";

export const errorHandle = (
    err:any,
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    if (err instanceof mongoose.Error) {
        res.status(400).json(
            {
                message: err.message,
            }
        )
    }

    if (err instanceof ApiError) {
        res.status(err.statusCode).json({message: err.message});
        return
    }
    res.status(500).json({message: "Internal error"});
}