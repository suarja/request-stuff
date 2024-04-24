import UploadCard from "@/features/request/presentation/views/UploadCard";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default function Page({ searchParams }: PageProps) {
  return <UploadCard searchParams={searchParams} />;
}
