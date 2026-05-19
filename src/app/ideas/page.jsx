"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { VscComment } from "react-icons/vsc";

const categories = [
  "Tech", "Health", "AI", "Education",
  "Fintech", "Social", "Agri-Tech", "Other"
];

const categoryColors = {
  Tech: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  Health: "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400",
  AI: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  Education: "bg-yellow-50 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400",
  Fintech: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
  Social: "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400",
  "Agri-Tech": "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  Other: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};


function IdeaCard({ idea }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-200">

      {/* Image */}
      <div className="h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={idea.imageURL || "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80"}
          alt={idea.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Category */}
        <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[idea.category] || categoryColors.Other}`}>
          {idea.category}
        </span>

        {/* Title */}
        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
          {idea.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
          {idea.shortDescription}
        </p>

        {/* User + Comments */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <img
              src={idea.userImage || "https://i.ibb.co/mJR9Qxc/user-avatar.png"}
              alt={idea.userName}
              className="w-6 h-6 rounded-full object-cover border border-violet-100 dark:border-violet-900"
            />
            <span className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-[90px]">
              {idea.userName || "Anonymous"}
            </span>
          </div>
         <div className=" flex justify-center items-center gap-3">
           <span  className="text-xs text-slate-400 dark:text-slate-500">
             {idea.commentCount || 0}
          </span>
          <span><VscComment /></span>
         </div>
        </div>

        
        <Link
          href={`/ideas/${idea._id}`}
          className="w-full text-center py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-xl transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

const ideasPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ideas, setIdeas] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [search, setSearch] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [category, setCategory] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [startDate, setStartDate] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [endDate, setEndDate] = useState("");

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ideas?${params.toString()}`
      );
      const data = await res.json();
      setIdeas(data);
    } catch {
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchIdeas();
  }, [category]); // Refetch when category changes

  const handleSearch = (e) => {
    e.preventDefault();
    fetchIdeas();
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setStartDate("");
    setEndDate("");
    fetchIdeas();
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

      
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 dark:text-violet-400 mb-2">
            Explore
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            All Ideas
          </h1>
        </div>

      
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 md:p-5 mb-8">
          <div className="flex flex-col gap-4">

           
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ideas by title..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl transition-colors"
              >
                Search
              </button>
            </form>

          
            <div className="flex flex-col sm:flex-row gap-3">

             
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

             
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

            
              <button
                onClick={handleReset}
                className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:border-red-300 rounded-xl text-sm transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        
        {!loading && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
            {ideas.length} idea{ideas.length !== 1 ? "s" : ""} found
          </p>
        )}

      
        {loading ? (
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-slate-900 rounded-2xl h-80 animate-pulse border border-slate-100 dark:border-slate-800"
              />
            ))}
          </div>
        ) : ideas.length === 0 ? (
          

          <div className="text-center py-24 ">
            <p className="text-5xl mb-4"></p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
              No ideas found. Be the first to share!
            </p>
            <Link
              href="/add-idea"
              className="inline-block px-6 py-3 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors"
            >
              Post an Idea →
            </Link>
          </div>
        ) : (
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default ideasPage;



