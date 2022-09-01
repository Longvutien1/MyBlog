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
      case "POST":
        const post = req.body;
        console.log(post);

        const data = await prisma.comment.create({
          data: post,
          include:{
            post: true,
            user: true
          }
        });


        console.log("datadatadata",data);
        
        return res.status(201).json(data);
        break;

      case "GET":
        
        const listComments = await prisma.comment.findMany({
       
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

