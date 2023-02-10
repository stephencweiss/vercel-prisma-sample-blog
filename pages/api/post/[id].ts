import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// DELETE /api/post/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  if (req.method === 'DELETE') {
    if (Array.isArray(postId)){
      throw Error('Unsupported deleting of multiple posts concurrently');
    }
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}