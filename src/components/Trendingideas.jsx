

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const categoryAccent = {
  Tech:       { dot: "#6366f1", label: "bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20" },
  Health:     { dot: "#22c55e", label: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20" },
  AI:         { dot: "#a855f7", label: "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20" },
  Education:  { dot: "#eab308", label: "bg-yellow-500/10 text-yellow-400 ring-1 ring-yellow-500/20" },
  Fintech:    { dot: "#f97316", label: "bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20" },
  Social:     { dot: "#ec4899", label: "bg-pink-500/10 text-pink-400 ring-1 ring-pink-500/20" },
  "Agri-Tech":{ dot: "#10b981", label: "bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/20" },
  Other:      { dot: "#94a3b8", label: "bg-slate-500/10 text-slate-400 ring-1 ring-slate-500/20" },
};

function TrendingCard({ idea }) {
  const accent = categoryAccent[idea.category] || categoryAccent.Other;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60 hover:border-slate-200 dark:hover:border-slate-700">

     
      <div className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
        {/* <span className="text-white text-xs font-bold">#{rank}</span> */}
      </div>

      
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        <img
          src={idea.imageURL || "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80"}
          alt={idea.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
      </div>

      
      <div className="flex flex-col flex-1 p-5 gap-3">

       
        <span className={`self-start text-[11px] font-semibold px-2.5 py-1 rounded-full ${accent.label}`}>
          <span
            className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
            style={{ background: accent.dot }}
          />
          {idea.category}
        </span>

        
        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 flex-1">
          {idea.title}
        </h3>

       
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {idea.shortDescription}
        </p>

       
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={idea.userImage || "https://i.ibb.co/mJR9Qxc/user-avatar.png"}
              alt={idea.userName}
              className="w-6 h-6 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shrink-0"
            />
            <span className="text-xs text-slate-400 dark:text-slate-500 truncate">
              {idea.userName || "Anonymous"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            <span className="text-xs font-medium">{idea.commentCount || 0}</span>
          </div>
        </div>

       
        <Link
          href={`/ideas/${idea._id}`}
          className="mt-1 w-full text-center py-2.5 rounded-xl bg-violet-600 dark:bg-violet-600 text-white dark:text-white text-xs font-bold tracking-wide hover:opacity-90 transition-opacity"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-100 dark:bg-slate-800" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-4 w-16 bg-slate-100 dark:bg-slate-800 rounded-full" />
        <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-lg" />
        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-lg" />
        <div className="h-3 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-lg" />
        <div className="h-9 mt-2 bg-slate-100 dark:bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
}
const Trendingideas = () => {
    const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/ideas/trending`
        );
        const data = await res.json();
        setIdeas(data);
      } catch {
        setIdeas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">

        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 dark:text-violet-400">
                Right Now
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Trending Ideas
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
              The freshest startup concepts the community is buzzing about.
            </p>
          </div>

          <Link
            href="/ideas"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline underline-offset-4"
          >
            See all ideas
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)
            : ideas.map((idea, i) => (
                <TrendingCard key={idea._id} idea={idea} rank={i + 1} />
              ))}
        </div>

      </div>
    </section>
  );}

export default Trendingideas;