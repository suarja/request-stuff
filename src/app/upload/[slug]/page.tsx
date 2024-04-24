import { CardHeader, CardContent, Card } from "@/common/components/ui/card";
import { Label } from "@/common/components/ui/label";
import { Button } from "@/common/components/ui/button";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      {" "}
      {/* Centering the card on the page */}
      <Card className="w-full max-w-xl shadow-lg rounded-lg overflow-hidden bg-tertiaryalt">
        <CardHeader className="bg-primary p-4 text-white">
          {" "}
          {/* Adding a header background color */}
          <div className="space-y-1.5">
            <h2 className="text-lg font-medium tracking-tight">
              Request {searchParams?.requestId}
            </h2>
            <p className="text-sm font-medium leading-none">
              Metadata for the form at https://acme.inc/form
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <dl className="grid grid-cols-2 gap-1.5 text-sm">
              <dt className="font-semibold ">Name</dt>
              <dd className="">
                <span className="font-medium">{searchParams?.requestName}</span>
              </dd>
              <dt className="font-semibold ">Description</dt>
              <dd className="">
                <span className="font-medium">
                  {searchParams?.requestDescription}
                </span>
              </dd>
              <dt className="font-semibold ">Max file size</dt>
              <dd className="">
                <span className="font-medium">
                  {searchParams?.maxFileSize} MB
                </span>
              </dd>
              <dt className="font-semibold ">Max files</dt>
              <dd className="">
                <span className="font-medium">{searchParams?.maxFiles}</span>
              </dd>
              <dt className="font-semibold ">Date limit</dt>
              <dd className="">
                <span className="font-medium">{searchParams?.dateLimit}</span>
              </dd>
            </dl>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm " htmlFor="files">
                Select the files to upload
              </Label>
              <input
                type="file"
                id="files"
                name="files"
                multiple
                className="block w-full text-sm  file:border file:border-gray-400 file:px-4 file:py-2 file:rounded-lg file:text-sm file:font-semibold file:bg-tertiary file: hover:file:bg-blue-600"
              />
            </div>
            <Button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded">
              Upload files
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
