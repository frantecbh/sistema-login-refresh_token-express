import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export function ensureAutheticated(request: Request, response: Response, next: NextFunction){

  const authToken = request.headers.authorization

  if(!authToken){
    return response.status(401).json({
      message: "Token is missing"
    })
  }


 //verify Bare aldfjlasjdflasjfdlalfjsaf
 const [, token] = authToken.split(" ")



 try {
  verify(token, process.env.SECRET_KEY_TOKEN )

  return next()
 } catch (error) {
  return response.status(401).json({
    message: "Token invalid"
  })
 }

}