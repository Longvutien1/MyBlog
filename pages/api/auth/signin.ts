// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import * as jose from "jose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { deleteCookie, setCookie } from "cookies-next";
import cookie from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = req.body;
    const { method } = req;
    console.log(method);

    switch (method) {
      case "POST":
        // console.log(user);
        // check userexist
        const existUser = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });
        if (!existUser) {
          return res.json({ message: "Tài khoản không tồn tại" });
        }

        const match = await bcrypt.compare(user.password, existUser.password);
        // console.log(match);
        if (match == false) {
          return res.json({
            message: "Mật khẩu không đúng",
          });
        }

        // set token
        const token = jwt.sign(existUser, "123456", {
          expiresIn: "12h",
        });
        
        // console.log("token: ",token);

        if (existUser && match == true) {
          setCookie("cookieUser", token, { req, res, maxAge: 60 * 60 * 24 * 1 });
          res.setHeader("userToken", token);
          res.json({ message: "Đăng nhập thành công" });
        }
        break;

      case "GET":
        // console.log(res);

        const tokenHeader = req.headers.cookie;
        var cookies = cookie.parse(tokenHeader || "");
        // console.log("token cookie:", cookies.cookieUser);
        
        if (cookies.cookieUser) {
          // giải mã hóa token
          var decoded = jwt.verify(`${cookies.cookieUser}`, "123456");
          // console.log("giai mã: ", decoded); // bar
          res.json(decoded);
        } else {
          res.json({message:"Hết hạn cookie"});
        }
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
