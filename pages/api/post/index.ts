// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {
  listAllPost,
  listAllPostAdmin,
  listPostPrisma,
  listTopViews,
} from "../../../servicePrisma/post";

interface QueryParam {
  [key: string]: QueryParam | string;
}

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
        const data = await prisma.post.create({
          data: post,
        });
        return res.status(201).json(data);
        break;

      case "GET":
        const { title, categoryPost, page, allPost, topview } = req.query;
        if (allPost) {

          const { lisstAllPosts, count } = await listAllPost();

          return res.status(200).json({ lisstAllPosts, count });
        }
        if (topview) {
          const { listPost } = await listTopViews(Number(topview));
          return res.status(200).json(listPost);
        }
        if (categoryPost != "undefined" || title != "undefined") {
          const condion = alterQuery(String(title), String(categoryPost));

          const { listPost, count } = await listPostPrisma(
            Number(page),
            condion
          );

          return res.status(200).json({ listPost, count });
        } else {
          console.log("vào aall post");

          const { listPost, count } = await listAllPostAdmin(Number(page));
          return res.status(200).json({ listPost, count });
        }

        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

const alterQuery = (title: string, categoryPost: string) => {
  console.log(title, categoryPost);

  let condion: QueryParam = {};
  if (title == "undefined") {
    condion = {
      ...condion,
    };
  } else {
    condion = {
      ...condion,
      title: {
        contains: title,
        mode: "insensitive",
      },
    };
  }

  if (categoryPost == "undefined") {
    condion = {
      ...condion,
    };
  } else {
    condion = {
      ...condion,
      categoryPost: categoryPost,
    };
  }

  return condion;
};
