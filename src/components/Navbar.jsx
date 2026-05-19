"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "./providers/ThemeProvider";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    setMobileOpen(false);
    router.push("/");
  };

  const isActive = (href) =>
    pathname === href
      ? "font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 rounded-lg"
      : "text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors rounded-lg";

  return (
    <>
      <div className="navbar bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">

      
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-lg md:text-xl font-bold px-1 md:px-2 hover:bg-transparent">
            <span className="text-violet-600">Idea</span>
            <span className="text-slate-900 dark:text-white font-normal">Vault</span>
          </Link>
        </div>

       
        <div className="navbar-center hidden sm:flex">
          <ul className="menu menu-horizontal px-1 gap-4 text-sm font-medium">
            <li><Link href="/" className={isActive("/")}>Home</Link></li>
            <li><Link href="/ideas" className={isActive("/ideas")}>Ideas</Link></li>
            {session && (
              <>
                <li><Link href="/add-idea" className={isActive("/add-idea")}>Add Idea</Link></li>
                <li><Link href="/my-ideas" className={isActive("/my-ideas")}>My Ideas</Link></li>
                <li><Link href="/my-interactions" className={isActive("/my-interactions")}>My Interactions</Link></li>
              </>
            )}
          </ul>
        </div>

       
        <div className="navbar-end gap-2 md:gap-3">

         
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-all focus:outline-none"
          >
            {theme === "light" ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )}
          </button>

          
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>

          {/* Desktop Profile */}
          {session ? (
            <div className="dropdown dropdown-end hidden sm:block">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-violet-400 hover:border-violet-600 transition-colors">
                <div className="w-8 md:w-9 rounded-full">
                  <img alt="Profile" src={session.user.image || "https://i.ibb.co/mJR9Qxc/user-avatar.png"} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white dark:bg-slate-950 rounded-box z-50 mt-3 w-56 p-2 shadow-xl border border-slate-100 dark:border-slate-900">
                <li className="menu-title px-4 py-1">
                  <span className="text-violet-600 font-semibold text-sm block truncate">{session.user.name}</span>
                  <span className="text-[11px] text-gray-400 dark:text-slate-500 block truncate font-normal">{session.user.email}</span>
                </li>
                <div className="divider my-1 dark:border-slate-900"></div>
                <li><Link href="/profile" className="text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400">Profile Settings</Link></li>
                <li><Link href="/my-ideas" className="dark:text-slate-300">My Ideas</Link></li>
                <li><Link href="/my-interactions" className="dark:text-slate-300">My Interactions</Link></li>
                <div className="divider my-1 dark:border-slate-900"></div>
                <li>
                  <button onClick={handleLogout} className="text-error font-semibold w-full text-left rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1 md:gap-2">
              <Link href="/login" className="btn btn-primary btn-sm text-white px-3 md:px-5 rounded-full lowercase first-letter:uppercase">
                Login
              </Link>
              <Link href="/register" className="btn btn-sm px-3 md:px-5 rounded-full border border-violet-600 text-violet-600 hover:bg-violet-50 dark:border-violet-500 dark:text-violet-400 dark:hover:bg-violet-950/40 bg-transparent">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

    
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm sm:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

    
      <div className={`fixed top-0 right-0 h-full w-72 z-50 bg-white dark:bg-slate-950 shadow-2xl sm:hidden transform transition-transform duration-300 ease-in-out flex flex-col ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>

        
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <Link href="/" onClick={() => setMobileOpen(false)} className="text-lg font-bold">
            <span className="text-violet-600">Idea</span>
            <span className="text-slate-900 dark:text-white font-normal">Vault</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

       
        {session && (
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-violet-50/50 dark:bg-violet-950/20">
            <img
              src={session.user.image || "https://i.ibb.co/mJR9Qxc/user-avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-violet-300 dark:border-violet-700"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{session.user.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{session.user.email}</p>
            </div>
          </div>
        )}

        
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">

          {/* Public Links */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3 mb-2">
            Navigation
          </p>
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive("/")}`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <Link
            href="/ideas"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive("/ideas")}`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Ideas
          </Link>

        
          {session && (
            <>
              <div className="pt-3 pb-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3">
                  Private
                </p>
              </div>
              <Link
                href="/add-idea"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive("/add-idea")}`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Idea
              </Link>
              <Link
                href="/my-ideas"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive("/my-ideas")}`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                My Ideas
              </Link>
              <Link
                href="/my-interactions"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive("/my-interactions")}`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                My Interactions
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive("/profile")}`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile Settings
              </Link>
            </>
          )}
        </div>

        
        <div className="px-4 py-4 border-t border-slate-100 dark:border-slate-800">
          {session ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-500 text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 rounded-xl border border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 text-sm font-semibold hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;