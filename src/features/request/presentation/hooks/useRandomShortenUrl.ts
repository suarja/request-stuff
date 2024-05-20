import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useGetRandomShortenUrl() {
  const [url, setUrl] = useState<string | null>(null);
  const [randomShortUrl, setRandomShortUrl] = useState<string | null>(null);

  function getShortUrl(url: string) {
    fetch(`https://tinyurl.com/api-create.php?url=${url}`)
      .then((res) => res.text())
      .then((data) => {
        setRandomShortUrl(data);

        if (data === randomShortUrl) {
          navigator.clipboard.writeText(randomShortUrl);
          toast.success("Short to clipboard", {
            position: "top-center",
            description: `${randomShortUrl}`,
          });
          setTimeout(() => {
            toast.dismiss();
          }, 5000);
        }
      })
      .catch((error) => {
        toast.error("Error getting short URL", {
          position: "top-center",
          description: `${error}`,
        });
        setTimeout(() => {
          toast.dismiss();
        }, 5000);
      })
      .finally(() => {
        setUrl(null);
      });
  }

  useEffect(() => {
    if (randomShortUrl) {
      navigator.clipboard.writeText(randomShortUrl);
      toast.success("Short to clipboard", {
        position: "top-center",
        description: `${randomShortUrl}`,
      });
      setTimeout(() => {
        toast.dismiss();
      }, 5000);
    }
  }, [randomShortUrl]);

  useEffect(() => {
    if (url) {
      toast.loading("Shortening URL", {
        position: "top-center",
      });
      getShortUrl(url);
    }
  }, [url]);

  return { setUrl };
}
