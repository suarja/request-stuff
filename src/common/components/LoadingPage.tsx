export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-900 border-t-transparent dark:border-gray-50" />
      <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  );
}
