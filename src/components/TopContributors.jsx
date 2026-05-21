"use client";
import { useState, useEffect } from "react";


const contributors = [
  {
    rank: 1,
    name: "Rakib Hasan",
    image: "https://i.pravatar.cc/150?img=11",
    ideas: 14,
    comments: 38,
    badge: null,
  },
  {
    rank: 2,
    name: "Nusrat Jahan",
    image: "https://i.pravatar.cc/150?img=20",
    ideas: 11,
    comments: 29,
    badge: null,
  },
  {
    rank: 3,
    name: "Arif Ahmed",
    image: "https://i.pravatar.cc/150?img=33",
    ideas: 9,
    comments: 24,
    badge: null,
  },
  {
    rank: 4,
    name: "Mitu Akter",
    image: "https://i.pravatar.cc/150?img=47",
    ideas: 7,
    comments: 19,
    badge: null,
  },
  {
    rank: 5,
    name: "Siam Khan",
    image: "https://i.pravatar.cc/150?img=52",
    ideas: 6,
    comments: 15,
    badge: null,
  },
  {
    rank: 6,
    name: "Tamanna Binte",
    image: "https://i.pravatar.cc/150?img=60",
    ideas: 5,
    comments: 12,
    badge: null,
  },
];

const TopContributors = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">

      
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Community
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2">
            Top Contributors
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Meet the innovators driving the IdeaVault community forward.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {contributors.map((c) => (
            <div
              key={c.rank}
              className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-800 transition-all"
            >
              
              <span className="text-xs font-bold text-slate-400 dark:text-slate-600 w-4 shrink-0">
                {c.badge || `#${c.rank}`}
              </span>

              {/* Avatar */}
              <img
                src={c.image}
                alt={c.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-violet-100 dark:border-violet-900 shrink-0"
              />

              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {c.name}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {c.ideas} ideas · {c.comments} comments
                </p>
              </div>

            
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-violet-600 dark:text-violet-400">
                  {c.ideas * 5 + c.comments}
                </p>
                <p className="text-[10px] text-slate-400">pts</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopContributors;