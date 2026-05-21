"use client"

import Link from "next/link";

const Error = () => {
    return (
         <div className="min-h-screen  flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <h1 className="text-9xl font-black text-gray-200 select-none">404</h1>
          
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Page not found
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={"/"}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Go back home
          </Link>
         
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Error Code: <span className="font-mono">ERR_PAGE_NOT_FOUND</span>
        </p>
      </div>
    </div>
    );
};

export default Error;