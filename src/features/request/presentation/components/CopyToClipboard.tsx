import { toast } from "sonner";
import CopyToClipBoardIcon from "../../../../common/icons/CopyToClipboard";
import CustomDialog from "@/common/components/CustomDialog";
import { Button } from "@/common/components/ui/button";
import useGetRandomShortenUrl from "../hooks/useRandomShortenUrl";

export function CopyToClipBoard({
  url,
  props,
}: {
  url: string;
  props?: React.ComponentProps<"button">;
}) {
  const { setUrl } = useGetRandomShortenUrl();

  return (
    <>
      <CustomDialog
        title="Get URL"
        icon={<CopyToClipBoardIcon />}
        buttonClassName="bg-transparent hover:bg-primary dark:hover:bg-primary dark:bg-transparent dark:text-gray-50 text-blue-900"
        description="Choose one of the following options to copy the URL to your clipboard:"
      >
        <div className="flex items-start flex-col gap-4 py-6">
          <div className="flex items-center">
            <button
              {...props}
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success("Copied to clipboard", {
                  position: "top-center",
                  description: `${url}`,
                });
              }}
              className="flex items-center gap-2 text-blue-700 hover:text-blue-400 font-extrabold  rounded-md"
            >
              <CopyToClipBoardIcon />
            </button>
            <span
              style={{
                paddingLeft: "10px",
                overflowWrap: "break-word",
                wordWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {url.length > 50 ? `${url.slice(0, 50)}...` : url}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* Option 1: Shorten URL */}
            <Button onClick={() => setUrl(url)}>Tinyurl</Button>
            {/* Option 2: Custom short URL */}
            <Button
              onClick={() => {
                toast.info("Coming soon", {
                  position: "top-center",
                  description: "This feature is coming soon",
                });
              }}
            >
              Custom short URL
            </Button>
          </div>
        </div>
      </CustomDialog>
    </>
  );
}
