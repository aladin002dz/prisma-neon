'use client';

import { User } from '@prisma/client';
import { deletePostAction } from './PostActions';
import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';

// Define the Post type with author included
type PostWithAuthor = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  author: User;
};

type PostProps = {
  post: PostWithAuthor;
};

export function Post({ post }: PostProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDeletePost = async () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await deletePostAction(post.id);
        if (!result.success) {
          setError(result.error || 'Failed to delete post');
        }
      } catch (err) {
        console.error('Error deleting post:', err);
        setError('An unexpected error occurred');
      }
    });
  };

  return (
    <div 
      className="border border-black/[.08] dark:border-white/[.145] rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <form action={handleDeletePost}>
          <button
            type="submit"
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
            aria-label="Delete post"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </form>
      </div>
      {error && (
        <div className="mt-2 text-red-500 text-sm">{error}</div>
      )}
      <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>
      <div className="flex items-center text-sm text-gray-500">
        <span>By {post.author.name || 'Unknown'}</span>
      </div>
    </div>
  );
}
