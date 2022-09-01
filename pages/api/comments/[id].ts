// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    switch (method) {
        case "GET":
        const {id} = req.query
        console.log("id", id);
        
        const listComments = await prisma.comment.findMany({
          where:{
            idPost: Number(id)
          },
          include:{
            post: true,
            user: true
          }
        });
        // console.log("listCommentslistComments",listComments);
        
        return res.status(200).json(listComments);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
