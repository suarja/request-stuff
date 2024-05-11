/**
 * v0 by Vercel.
 * @see https://v0.dev/t/hfDA3Lov2P7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-red-500 dark:text-red-400">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Oops! Page not found.
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link
          className="inline-flex items-center justify-center h-10 px-6 font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          href="/"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
