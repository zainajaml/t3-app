"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-2xl">
      {/* Latest Post Display */}
      <div className="mb-8 rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 backdrop-blur-sm">
        {latestPost ? (
          <div>
            <p className="text-sm font-medium text-slate-400">Most Recent Post</p>
            <p className="mt-2 truncate text-xl font-semibold text-white">
              {latestPost.name}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Created {new Date(latestPost.createdAt).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-slate-400">No posts yet</p>
            <p className="mt-1 text-sm text-slate-500">Create your first post below!</p>
          </div>
        )}
      </div>

      {/* Create Post Form */}
      <div className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 backdrop-blur-sm">
        <h3 className="mb-6 text-lg font-semibold">Create New Post</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim()) {
              createPost.mutate({ name });
            }
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300">
              Post Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter your post title..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={createPost.isPending}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={createPost.isPending || !name.trim()}
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white transition duration-200 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createPost.isPending ? (
              <span className="flex items-center justify-center">
                <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              "Create Post"
            )}
          </button>
        </form>

        {createPost.isError && (
          <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-300">
            Failed to create post. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}
