"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {

// Dynamic Title: Route-based title change
useEffect(() => {
  document.title = "Login – IdeaVault";
}, []);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const { error } = await signIn.email({ email, password });

    if (error) {
      toast.error(error.message || "Login failed!");
    } else {
      toast.success("Login successful!");
      router.push("/"); 
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-50 dark:bg-[#0F172A] px-4 transition-colors duration-300">
      <div className="card w-full max-w-md bg-white dark:bg-slate-900 shadow-xl p-8 border border-slate-100 dark:border-slate-800 rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-900 dark:text-white">
          Login to <span className="text-violet-600 dark:text-violet-400">IdeaVault</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-slate-700 dark:text-slate-300">Email</span>
            </label>
            <input 
              type="email" 
              name="email" 
              placeholder="your@email.com"
              className="input input-bordered w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:outline-none dark:text-white" 
              required 
            />
          </div>

          <div className="form-control">
            <div className="flex justify-between items-center px-1">
              <label className="label p-0">
                <span className="label-text font-semibold text-slate-700 dark:text-slate-300">Password</span>
              </label>
              <button 
                type="button" 
                onClick={() => toast.info("Password reset functionality is disabled for this project.")}
                className="text-xs text-violet-600 dark:text-violet-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:underline bg-transparent border-none transition-colors"
              >
                Forget Password?
              </button>
            </div>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••"
              className="input input-bordered w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:outline-none dark:text-white" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-700 border-none w-full text-white mt-4 rounded-full shadow-sm shadow-violet-600/10 normal-case font-semibold" 
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
          </button>
        </form>

        <div className="divider my-6 text-slate-400 dark:text-slate-600 text-xs uppercase tracking-wider">OR</div>

        <button 
          onClick={handleGoogle} 
          className="btn btn-outline border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 w-full gap-2 rounded-full normal-case font-medium transition-all"
        >
          <FaGoogle className="text-red-500" /> Continue with Google
        </button>

        <p className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
          Dont have an account?{" "}
          <Link href="/register" className="text-violet-600 dark:text-violet-400 font-bold hover:text-cyan-600 dark:hover:text-cyan-400 hover:underline transition-colors">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;