// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import * as jose from "jose";
import bcrypt from "bcrypt";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = req.body;
    console.log(user);
   
    const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(user.password, salt);
    // console.log("pass mã hóa: ",passwordHash);
    
    // check userexist
    const existUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      }, 
    });
    if (existUser) {
      return res.json({ message: "Tài khoản đã tồn tại" });
    }
    
    const data = await prisma.user.create({
      data: user,
    });
    return res.json(data);

  } catch (error) {
    console.log(error);
  }
}
