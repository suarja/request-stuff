import LoadingPage from "@/common/components/LoadingPage";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import useGetUserFiles from "../../application/usecases/services/useGetUserFIles";
import Link from "next/link";

export default function FilesTable() {
  const { files, loading } = useGetUserFiles();

  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>URL</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell>
              <LoadingPage />
            </TableCell>
          </TableRow>
        ) : (
          files.map((file) => (
            <TableRow key={file.key}>
              <TableCell>{file.name}</TableCell>
              <TableCell>
                <Link href={file.url} target="_blank" rel="noreferrer">
                  {file.url.slice(0, 20)}
                </Link>
              </TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => {}}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
