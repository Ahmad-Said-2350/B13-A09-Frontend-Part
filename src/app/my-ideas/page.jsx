export const metadata = {
  title: "My Ideas – IdeaVault",
};

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
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
const MyIdepage = () => {
    const { data: session } = authClient.useSession();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [updating, setUpdating] = useState(false);


  
  const fetchMyIdeas = async () => {
  const {data} = await authClient.token()
   console.log(data)

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ideas/my-ideas?email=${session?.user?.email}`,{
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${data?.token}`
        },
        }
      );
      const dataa = await res.json();
     setIdeas(Array.isArray(dataa) ? dataa : []);
    } catch {
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchMyIdeas();
    }
  }, [session]);

  
  const openEdit = (idea) => {
    setSelectedIdea(idea);
    setEditForm({
      title: idea.title,
      shortDescription: idea.shortDescription,
      detailedDescription: idea.detailedDescription,
      category: idea.category,
      tags: Array.isArray(idea.tags) ? idea.tags.join(", ") : idea.tags || "",
      imageURL: idea.imageURL,
      estimatedBudget: idea.estimatedBudget || "",
      targetAudience: idea.targetAudience,
      problemStatement: idea.problemStatement,
      proposedSolution: idea.proposedSolution,
    });
    setEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const updatedData = {
      ...editForm,
      tags: editForm.tags
        ? editForm.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    };
    


     const {data} = await authClient.token()
     console.log(data)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ideas/${selectedIdea._id}`,
      {
        method: "PUT",
       headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${data?.token}`
        },
        body: JSON.stringify(updatedData),
      }
    );

    const data7 = await res.json();
    if (data7.modifiedCount > 0) {
      toast.success("Idea updated successfully!");
      setEditModal(false);
      fetchMyIdeas();
    } else {
      toast.error("Nothing changed.");
    }
    setUpdating(false);
  };

  const handleDelete = async () => {

     const {data} = await authClient.token()
console.log(data)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ideas/${selectedIdea._id}`,
      { method: "DELETE",
         headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${data?.token}`
        },
       }
    );

    const data8 = await res.json();
    if (data8.deletedCount > 0) {
      toast.success("Idea deleted!");
      setDeleteModal(false);
      fetchMyIdeas();
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

       
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 dark:text-violet-400 mb-2">
            Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            My Ideas
          </h1>
        </div>

       
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-slate-900 rounded-2xl h-80 animate-pulse border border-slate-100 dark:border-slate-800"
              />
            ))}
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-24 shadow-sm rounded-xl">
            <p className="text-5xl mb-4"></p>
            <h2 className="text-slate-500 dark:text-slate-400 text-2xl font-semibold">
              You have not posted any ideas yet.
            </h2>
          </div>
        ) : (

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-200"
              >
               
                <div className="h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={idea.imageURL || "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80"}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1 gap-3">

                 
                  <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[idea.category] || categoryColors.Other}`}>
                    {idea.category}
                  </span>

                  
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {idea.title}
                  </h3>

                 
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
                    {idea.shortDescription}
                  </p>

                
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
                    <div className="flex justify-center items-center gap-3">
                      <span className="text-xs text-slate-400 dark:text-slate-500">
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

                 
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(idea)}
                      className="flex-1 py-2 text-xs font-medium border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 rounded-xl transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => { setSelectedIdea(idea); setDeleteModal(true); }}
                      className="flex-1 py-2 text-xs font-medium border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Edit Idea</h2>
              <button
                onClick={() => setEditModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >✕</button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              {[
                { label: "Idea Title", key: "title", type: "input" },
                { label: "Short Description", key: "shortDescription", type: "input" },
                { label: "Detailed Description", key: "detailedDescription", type: "textarea" },
                { label: "Image URL", key: "imageURL", type: "input" },
                { label: "Tags (comma separated)", key: "tags", type: "input" },
                { label: "Estimated Budget", key: "estimatedBudget", type: "input" },
                { label: "Target Audience", key: "targetAudience", type: "input" },
                { label: "Problem Statement", key: "problemStatement", type: "textarea" },
                { label: "Proposed Solution", key: "proposedSolution", type: "textarea" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</label>
                  {type === "textarea" ? (
                    <textarea
                      value={editForm[key] || ""}
                      onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={editForm[key] || ""}
                      onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  )}
                </div>
              ))}

             
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Category</label>
                <select
                  value={editForm.category || ""}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm p-6 border border-slate-200 dark:border-slate-700 text-center">
            <p className="text-4xl mb-4"> </p>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Delete Idea?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
export default MyIdepage;



