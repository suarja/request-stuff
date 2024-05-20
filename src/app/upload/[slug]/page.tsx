import UploadView from "@/features/request/presentation/views/UploadView";

export interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default function Page({ searchParams }: PageProps) {
  return <UploadView searchParams={searchParams} />;
}
