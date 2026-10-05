import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Header Section */}
        <div className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  Create <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">T3</span> App
                </h1>
                <p className="mt-2 text-slate-400">Build modern full-stack applications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-16 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
            <p className="text-center text-lg text-slate-300">
              {hello ? (
                <span className="inline-block">
                  Welcome! {hello.greeting} 🎉
                </span>
              ) : (
                "Loading tRPC query..."
              )}
            </p>
          </div>

          {/* Grid Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold">Get Started</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Link
                className="group rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8 transition-all duration-300 hover:border-purple-500/50 hover:from-slate-900/80 hover:to-purple-900/20"
                href="https://create.t3.gg/en/usage/first-steps"
                target="_blank"
              >
                <div className="mb-4 inline-block rounded-lg bg-purple-500/10 p-3">
                  <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold transition-colors group-hover:text-purple-400">First Steps</h3>
                <p className="mt-3 text-slate-400 transition-colors group-hover:text-slate-300">
                  Just the basics - Everything you need to know to set up your database and authentication.
                </p>
                <div className="mt-4 inline-flex items-center text-sm text-purple-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more →
                </div>
              </Link>

              <Link
                className="group rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8 transition-all duration-300 hover:border-pink-500/50 hover:from-slate-900/80 hover:to-pink-900/20"
                href="https://create.t3.gg/en/introduction"
                target="_blank"
              >
                <div className="mb-4 inline-block rounded-lg bg-pink-500/10 p-3">
                  <svg className="h-6 w-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold transition-colors group-hover:text-pink-400">Documentation</h3>
                <p className="mt-3 text-slate-400 transition-colors group-hover:text-slate-300">
                  Learn more about Create T3 App, the libraries it uses, and how to deploy it.
                </p>
                <div className="mt-4 inline-flex items-center text-sm text-pink-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more →
                </div>
              </Link>
            </div>
          </div>

          {/* Posts Section */}
          <div>
            <h2 className="mb-8 text-2xl font-bold">Posts</h2>
            <LatestPost />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
