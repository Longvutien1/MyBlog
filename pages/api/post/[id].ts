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
        console.log("Vào edit post");
        const { id: idQuery } = req.query;
        console.log(idQuery);
        
        
        const post = await prisma.post.findFirst({
          where: {
            id: Number(idQuery),
          },
          include: {
            user: true,
          },
        });
        // console.log("listPost: ",listPost);

        res.status(200).json(post);
        break;
      case "PATCH":
        const data = req.body;
        const { id: idQueryUpdate } = req.query;
        const editPost = await prisma.post.update({
          where: { id: Number(idQueryUpdate) },
          data: data,
        });
        console.log("data +", editPost);
        res.status(201).json(editPost);
        break;
      case "DELETE":
        const {id:idPost} = (req.query);
        console.log(idPost);
        
        const deletePost = await prisma.post.delete({
          where: { id: Number(idPost) },
        })
        res.status(200).json({message:"Xóa thành công !"});
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
