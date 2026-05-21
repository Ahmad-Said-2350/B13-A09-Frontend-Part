export const metadata = {
  title: "Profile – IdeaVault",
};

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
   const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    image: "",
  });

 
  const handleEditClick = () => {
    setForm({
      name: user?.name || "",
      image: user?.image || "",
    });
    setEditing(true);
  };

 
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: form.name,
        image: form.image,
      });

      if (result.error) {
        toast.error("Update failed. Try again.");
      } else {
        toast.success("Profile updated successfully!");
        setEditing(false);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  
  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">

      
        <div className="mb-8">
        
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            My Profile
          </h1>
        </div>

       
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">

          
          <div className="h-24 bg-gradient-to-r from-violet-500 to-indigo-600" />

        
          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-5 mb-6">

             
              <div className="relative">
                <img
                  src={user.image || "https://i.ibb.co/mJR9Qxc/user-avatar.png"}
                  alt={user.name}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-md"
                />
              </div>

             
              {!editing && (
                <button
                  onClick={handleEditClick}
                  className="self-start sm:self-auto  px-5 py-2.5 border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 rounded-xl text-sm font-medium transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            
            {!editing && (
              <div className="space-y-5">

               
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {user.email}
                  </p>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800" />

               
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Full Name
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {user.name || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Email Address
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {user.email}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Profile Image URL
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 break-all">
                      {user.image || "No image set"}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800" />

               
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    Active Account
                  </span>
                  {user.emailVerified && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
                       Email Verified
                    </span>
                  )}
                </div>
              </div>
            )}

           
            {editing && (
              <form onSubmit={handleUpdate} className="space-y-5">

                {/* Image Preview */}
                {form.image && (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-12 h-12 rounded-xl object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                    <p className="text-xs text-slate-400">Image preview</p>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                  />
                </div>

               
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://example.com/your-photo.jpg"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                  />
                </div>

               
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address
                    <span className="ml-2 text-xs font-normal text-slate-400">(cannot be changed)</span>
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-400 text-sm cursor-not-allowed"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex-1 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

      </div>
    </main>
  );
};

export default ProfilePage;
