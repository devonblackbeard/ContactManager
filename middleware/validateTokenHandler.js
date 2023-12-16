import asyncHandler from "express-async-handler";
import jwt, { decode } from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    //let authHeader = req.headers.Authorization || req.headers.authorization;
    let authHeader = req.headers.authorization;

    console.log("auth header",authHeader);

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(400);
                throw new Error("User is not authorized");
            }            
            // @ts-ignore
            req.query.user = decoded.user;
            next();
        });
        if (!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    }
})

export default validateToken;