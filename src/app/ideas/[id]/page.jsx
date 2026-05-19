"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";




import React from 'react';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

const IdeaDetailsPage = () => {
    const { id } = useParams();
  const { data: session } = authClient.useSession();

  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchIdea = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}`);
    const data = await res.json();
    setIdea(data);
    setLoading(false);
  };

  const fetchComments = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchIdea();
    fetchComments();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);

    const comment = {
      ideaId: id,
      text: commentText,
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      userImage: session?.user?.image || "",
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });

    const data = await res.json();
    if (data.insertedId) {
      toast.success("Comment added!");
      setCommentText("");
      fetchComments();
    }
    setSubmitting(false);
  };

  const handleEditComment = async (commentId) => {
    if (!editText.trim()) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      }
    );

    const data = await res.json();
    if (data.modifiedCount > 0) {
      toast.success("Comment updated!");
      setEditingId(null);
      setEditText("");
      fetchComments();
    }
  };

  const handleDeleteComment = async (commentId) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`,
      { method: "DELETE" }
    );

    const data = await res.json();
    if (data.deletedCount > 0) {
      toast.success("Comment deleted!");
      fetchComments();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Idea not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden mb-8">

          <img
            src={idea.imageURL || "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80"}
            alt={idea.title}
            className="w-full h-56 md:h-72 object-cover"
          />

          <div className="p-6 md:p-8">

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400">
                {idea.category}
              </span>
              {Array.isArray(idea.tags) && idea.tags.map((tag, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              {idea.title}
            </h1>

            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <img
                src={idea.userImage || "https://i.ibb.co/mJR9Qxc/user-avatar.png"}
                alt={idea.userName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {idea.userName || "Anonymous"}
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(idea.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric"
                  })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {idea.targetAudience && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Target Audience</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{idea.targetAudience}</p>
                </div>
              )}
              {idea.estimatedBudget && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Estimated Budget</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{idea.estimatedBudget}</p>
                </div>
              )}
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Summary</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{idea.shortDescription}</p>
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Details</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{idea.detailedDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">Problem</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{idea.problemStatement}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">Solution</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{idea.proposedSolution}</p>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 md:p-8">

          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
            Comments ({comments.length})
          </h2>

          {session ? (
            <form onSubmit={handleAddComment} className="flex gap-3 mb-8">
              <img
                src={session.user.image || "https://i.ibb.co/mJR9Qxc/user-avatar.png"}
                alt={session.user.name}
                className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  {submitting ? "..." : "Post"}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-8 text-center py-4 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
              Please{" "}
              <a href="/login" className="text-violet-600 dark:text-violet-400 font-medium hover:underline">
                login
              </a>{" "}
              to comment.
            </p>
          )}

          <div className="space-y-5">
            {comments.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">
                No comments yet. Be the first!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="flex gap-3">

                  <img
                    src={comment.userImage || "https://i.ibb.co/mJR9Qxc/user-avatar.png"}
                    alt={comment.userName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {comment.userName}
                      </p>
                      <p className="text-xs text-slate-400">
                        {new Date(comment.createdAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric"
                        })}
                        {comment.updatedAt && " (edited)"}
                      </p>
                    </div>

                    {editingId === comment._id ? (
                      <div className="flex gap-2 mt-1">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <button
                          onClick={() => handleEditComment(comment._id)}
                          className="px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium rounded-xl"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-2 border border-slate-200 dark:border-slate-700 text-slate-500 text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {comment.text}
                      </p>
                    )}

                    {session?.user?.email === comment.userEmail && editingId !== comment._id && (
                     <div className="flex gap-2 mt-2">
    <button
      onClick={() => {
        setEditingId(comment._id);
        setEditText(comment.text);
      }}
      className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-colors font-medium"
    >
      <FaRegEdit /> Edit
    </button>
    <button
      onClick={() => handleDeleteComment(comment._id)}
      className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors font-medium"
    >
      <AiOutlineDelete /> Delete
    </button>
  </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
};

export default IdeaDetailsPage;