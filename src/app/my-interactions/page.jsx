"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

const MyInteractionsPage = () => {
  const { data: session } = authClient.useSession();
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      // eslint-disable-next-line react-hooks/immutability
      fetchInteractions();
    }
  }, [session]);

  const fetchInteractions = async () => {
    const { data: { token } } = await authClient.token();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/user/all?email=${session?.user?.email}`, {
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
          },
        }
      );
      const data = await res.json();
      setInteractions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setInteractions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editText.trim()) return;

    const { data } = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${data?.token}`
          },
          body: JSON.stringify({ text: editText }),
        }
      );

      const data2 = await res.json();
      if (data2.modifiedCount > 0) {
        toast.success("Comment updated!");
        setEditingId(null);
        setEditText("");
        fetchInteractions(); 
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;

    const { data } = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentToDelete}`,
        {
          method: "DELETE",
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${data?.token}`
          },
        }
      );

      const data3 = await res.json();
      if (data3.deletedCount > 0) {
        toast.success("Comment deleted!");
        setDeleteModalOpen(false);
        setCommentToDelete(null);
        fetchInteractions(); // 
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
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
          <div className="text-center py-24 shadow-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <h2 className="text-slate-500 dark:text-slate-400 text-2xl font-semibold">
              You have not commented on any ideas yet.
            </h2>
          </div>
        ) : (
          <div className="space-y-4">
            {interactions.map(({ comment, idea }, index) => {
              const currentCommentId = comment._id || index;
              return (
                <div
                  key={currentCommentId}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:border-violet-200 dark:hover:border-violet-800 transition-all flex flex-col justify-between"
                >
                  <div>
                  
                    {idea ? (
                      <Link
                        href={`/ideas/${idea._id}`}
                        className="text-sm font-bold text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors line-clamp-1"
                      >
                        {idea.ideaTitle || idea.title}
                      </Link>
                    ) : (
                      <p className="text-sm font-bold text-slate-400 italic">
                        Idea no longer available
                      </p>
                    )
                    }

                  
                    {editingId === currentCommentId ? (
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <button
                          onClick={() => handleEditComment(currentCommentId)}
                          className="px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium rounded-xl shrink-0 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-2 border border-slate-200 dark:border-slate-700 text-slate-500 text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 shrink-0 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                        {comment.text}
                      </p>
                    )}
                  </div>

                 
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50 dark:border-slate-800/60">
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {comment.updatedAt && " (edited)"}
                    </p>

                   
                    {editingId !== currentCommentId && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingId(currentCommentId);
                            setEditText(comment.text);
                          }}
                          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-colors font-medium"
                        >
                          <FaRegEdit /> Edit
                        </button>
                        <button
                          onClick={() => {
                            setCommentToDelete(currentCommentId);
                            setDeleteModalOpen(true);
                          }}
                          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors font-medium"
                        >
                          <AiOutlineDelete /> Delete
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

     
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Delete Comment
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Are you sure you want to remove this comment? This response configuration cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setCommentToDelete(null);
                }}
                className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteComment}
                className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};





export default MyInteractionsPage;





