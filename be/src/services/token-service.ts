import { Response } from "express"
import { sign } from "jsonwebtoken"
import { UserDoc } from "../models/user"


class TokenService {
  createAccessToken (user: UserDoc){
    return sign({ userId: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15s",
    })
  }
  
  createRefreshToken (user: UserDoc){
    return sign(
      { userId: user.id, tokenVersion: user.tokenVersion },
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
