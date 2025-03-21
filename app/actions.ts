'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// Get all users for the dropdown in the form
export async function getUsers() {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

// Create a new post
export async function createPost(formData: FormData) {
  const prisma = new PrismaClient();
  
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const authorId = parseInt(formData.get('authorId') as string);

    // Validate input
    if (!title || !content || isNaN(authorId)) {
      throw new Error('Missing required fields: title, content, or authorId');
    }

    // Create new post
    await prisma.post.create({
      data: {
        title,
        content,
        published: true,
        authorId,
      },
    });

    // Revalidate the page to show the new post
    revalidatePath('/');
  } catch (error) {
    console.error('Error creating post:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get all published posts
export async function getPosts() {
  const prisma = new PrismaClient();
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true },
      orderBy: { id: 'asc' }
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a post by ID
export async function deletePost(postId: number) {
  const prisma = new PrismaClient();
  
  try {
    // Delete the post
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    // Revalidate the page to update the UI
    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting post:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Form action to delete a post
export async function deletePostAction(formData: FormData) {
  const postId = Number(formData.get('postId'));
  
  if (isNaN(postId)) {
    console.error('Invalid post ID');
    return;
  }
  
  await deletePost(postId);
}
