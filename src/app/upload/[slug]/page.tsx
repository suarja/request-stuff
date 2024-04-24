import UploadCard from "@/features/request/presentation/views/UploadCard";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default function Page({ searchParams }: PageProps) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <UploadCard searchParams={searchParams} />
    </div>
  );
}
