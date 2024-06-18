import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_PATH = "https://openlibrary.org";

const headers = {
  "User-Agent": "AllYouCanRead/1.0 (sohan.rao.backup@gmail.com)",
};

type UseApiProps = {
  key: string;
  url: string;
  method?: string;
  options?: {
    [key: string]: any;
  };
};

export default function useApi({
  key,
  url,
  method = "get",
  options,
}: UseApiProps) {
  const { isPending, error, data } = useQuery({
    queryKey: [key],
    queryFn: () => {
      return method === "get"
        ? axios.get(BASE_PATH + url, { headers })
        : axios.post(BASE_PATH + url, options, { headers });
    },
  });
  return {
    isPending,
    error,
    data: data?.data,
  };
}
