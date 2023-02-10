import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse ) {
  const postId = req.query.id;
  if (Array.isArray(postId)){
    throw Error('Unsupported publishing of multiple posts concurrently');
  }
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });
  res.json(post);
}
