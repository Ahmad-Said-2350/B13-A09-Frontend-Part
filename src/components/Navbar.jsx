"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "./providers/ThemeProvider";


const Navbar = () => {
const { data: session } = authClient.useSession(); 
const router = useRouter();
const pathname = usePathname();
const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  
  const isActive = (href) =>
    pathname === href
     ? "font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 rounded-lg"
: "text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors rounded-lg"
  return (
    <div className="navbar bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">

     
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-lg md:text-xl font-bold px-1 md:px-2 hover:bg-transparent">
          <span className="text-violet-600">Idea</span>
          <span className="text-slate-900 dark:text-white font-normal">Vault</span>
        </Link>
      </div>

     
      <div className="navbar-center hidden lg:flex">
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

     
      <div className="navbar-end gap-3">
        
       
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

         <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle md:hidden text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>

         
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white dark:bg-slate-900 rounded-xl z-50 mt-3  shadow-xl border w-fit border-slate-400 dark:border-slate-800">
            <li><Link href="/" className={isActive("/")}> Home</Link></li>
            <li><Link href="/ideas" className={isActive("/ideas")}>Ideas</Link></li>

            {session && (
              <>
                <div className="divider my-1 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-600">Private</div>
                <li><Link href="/add-idea" className={isActive("/add-idea")}>Add Idea</Link></li>
                <li><Link href="/my-ideas" className={isActive("/my-ideas")}> My Ideas</Link></li>
                <li><Link href="/my-interactions" className={isActive("/my-interactions")}>My Interactions</Link></li>
              </>
            )}

            {!session && (
              <>
                <div className="divider my-1 dark:border-slate-800"></div>
                <li><Link href="/login" className="text-violet-600 font-semibold">Login</Link></li>
                <li><Link href="/register" className="text-violet-600 font-semibold">Register</Link></li>
              </>
            )}
          </ul>
        </div>

        

        {session ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-violet-400 hover:border-violet-600 transition-colors">
              <div className="w-8 md:w-9 rounded-full">
                <img
                  alt="Profile"
                  src={session.user.image || "https://i.ibb.co/mJR9Qxc/user-avatar.png"}
                />
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
          <div className="flex items-center gap-1 md:gap-2">
            <Link href="/login" className="btn btn-primary btn-sm text-white px-3 md:px-5 rounded-full lowercase first-letter:uppercase">
              Login
            </Link>
            <Link href="/register" className="btn btn-sm hidden sm:inline-flex px-3 md:px-5 rounded-full border border-violet-600 text-violet-600 hover:bg-violet-50 dark:border-violet-500 dark:text-violet-400 dark:hover:bg-violet-950/40 bg-transparent">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;