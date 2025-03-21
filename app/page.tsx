import Image from "next/image";
import { createPost, getUsers, getPosts } from "./actions";
import { Post } from "./components/Post";

export default async function Home() {
  const posts = await getPosts();
  const users = await getUsers();
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        {/* Add New Post Form */}
        <div className="w-full border border-black/[.08] dark:border-white/[.145] rounded-lg p-6 bg-white dark:bg-black/[.1]">
          <h2 className="text-xl font-semibold mb-4">Add New Post</h2>
          <form action={createPost} className="flex flex-col gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                placeholder="Post title"
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                placeholder="Write your post content here..."
              />
            </div>
            
            <div>
              <label htmlFor="authorId" className="block text-sm font-medium mb-1">
                Author
              </label>
              <select
                id="authorId"
                name="authorId"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
              >
                <option value="">Select an author</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-foreground text-background rounded-md hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
            >
              Create Post
            </button>
          </form>
        </div>
        
        <h1 className="text-2xl font-bold">Latest Posts</h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-500">No published posts found.</p>
        ) : (
          <div className="grid gap-6 w-full">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
