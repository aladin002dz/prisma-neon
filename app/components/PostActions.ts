'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// Create a singleton instance of PrismaClient to avoid too many connections
const prisma = new PrismaClient();

// Delete a post by ID
export async function deletePostAction(postId: number) {
  if (!postId) {
    throw new Error('Post ID is required');
  }
  
  try {
    // Delete the post
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    // Revalidate the page to update the UI
    revalidatePath('/');
    
    return { success: true, post: deletedPost };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: 'Failed to delete post' };
  }
}