import { Response } from "express"
import { sign } from "jsonwebtoken"


class TokenService {
  createAccessToken (email: string){
    return sign({ email }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15s",
    })
  }
  
  createRefreshToken (email: string){
    return sign(
      { email },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      }
    )
  }
  
  sendRefreshToken (res: Response, token: string){
    res.cookie("rftk", token, {
      httpOnly: true,
    })
  }
}

export const tokenService = new TokenService();
