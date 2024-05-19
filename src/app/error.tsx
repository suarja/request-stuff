"use client";

import { PATHS } from "@/common/constants";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QWerxoLimky
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function Component() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-md px-4 py-8 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Oops! Something went wrong.</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
          We're sorry, but an unexpected error has occurred. Please try again
          later.
        </p>
        <Link
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          href={`${PATHS.ROOT_PAGE()}`}
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
