import prisma from "../lib/prisma";

interface QueryParam {
  [key: string]: QueryParam | string;
}

export const listPostPrisma = async (
  page: Number,
  condion: QueryParam = {}
) => {
  const listPost = await prisma.post.findMany({
    skip: 3 * (Number(page) || 0),
    take: 3,
    include: {
      user: true,
    },
    where: {
      ...condion,
    },
    orderBy: {
      id: "asc",
    },
  });

  const count = await prisma.post.count({
    where: {
      ...condion,
    },
  });

  return { listPost, count };
};

export const listAllPostAdmin = async (page: Number) => {
  const listPost = await prisma.post.findMany({
    skip: 3 * (Number(page) || 0),
    take: 3,
    include: {
      user: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  const count = await prisma.post.count();

  return { listPost, count };
};


export const listAllPost = async () => {
  const lisstAllPosts = await prisma.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  // console.log("listPost", lisstAllPosts);
  const count = await prisma.post.count();

  return { lisstAllPosts, count };
};


export const listTopViews = async (top3View:Number) => {
  const listPost = await prisma.post.findMany({
    skip:  0,
    take: Number(top3View),
    include: {
      user: true,
    },
    orderBy: {
      views: "desc",
    },
  });

  return { listPost };
};
