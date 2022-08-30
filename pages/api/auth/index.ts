// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const user = req.body
    // console.log(user);
    
    const data = await prisma.user.findMany();
    return res.json(data)
    
  } catch (error) {
    console.log(error);

  }
}
