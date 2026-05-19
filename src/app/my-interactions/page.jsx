"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const MyInteractionsPage = () => {
    const { data: session } = authClient.useSession();
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      // eslint-disable-next-line react-hooks/immutability
      fetchInteractions();
    }
  }, [session]);

  const fetchInteractions = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/user/all?email=${session?.user?.email}`
      );
const data = await res.json();
setInteractions(Array.isArray(data) ? data : []);
    } catch {
      setInteractions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">

      
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 dark:text-violet-400 mb-2">
            Activity
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            My Interactions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Ideas you have commented on.
          </p>
        </div>

      
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-24 bg-white dark:bg-slate-900 rounded-2xl animate-pulse border border-slate-100 dark:border-slate-800"
              />
            ))}
          </div>
        ) : interactions.length === 0 ? (
          <div className="text-center py-24 shadow-sm rounded-xl">
            <p className="text-5xl mb-4"></p>
            <h2 className="text-slate-500 dark:text-slate-400 text-2xl font-semibold">
              You have not commented on any ideas yet.
            </h2>
          </div>
        ) : (
          <div className="space-y-4">
            {interactions.map(({ comment, idea }, index) => (
              <div
                key={comment._id || index}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:border-violet-200 dark:hover:border-violet-800 transition-all"
              >
               
                {idea ? (
                  <Link
                    href={`/ideas/${idea._id}`}
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors line-clamp-1"
                  >
                     {idea.title}
                  </Link>
                ) : (
                  <p className="text-sm font-bold text-slate-400 italic">
                    Idea no longer available
                  </p>
                )}

              
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  {comment.text}
                </p>

              
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  {comment.updatedAt && " (edited)"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyInteractionsPage;

