"use client";
import UploadView from "@/features/request/presentation/views/UploadView";
import { useSearchParams } from "next/navigation";
export interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default function Page({ searchParams }: PageProps) {
  const searchParamsHook = useSearchParams();
  console.log({ searchParams });
  console.log({ searchParamsHook });
  return <UploadView searchParams={searchParams} />;
}
