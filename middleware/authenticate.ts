import jwt from "jsonwebtoken";
import {NextFunction,Request,Response} from "express";

const SECRET = 'ee50985359afd96b18adeb2073c5ebf1721cd9d6ac312bfe593e691ba0ad355f\n';
export const authenticate = (req:Request, res:Response , next:NextFunction)   => {
    const authHeader = req.headers.authorization;


    console.log("AuthHeader  : ",authHeader);

    if(!authHeader){
        return res.status(401).json({
            message: 'token header missing',
        })
    }

    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: 'token is missing',
        })
    }

    try{
        const decode = jwt.verify(token,SECRET);
        (req as any).user = decode;
        console.log("AuthenticatePassed")
        next()

    }catch(err){
        return res.status(401).json({
            message: 'Unauthorize token',
        })
    }
}