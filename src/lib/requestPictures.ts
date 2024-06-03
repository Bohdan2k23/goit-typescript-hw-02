import axios from "axios";
import { ImageData } from "./types";

const ACCESS_KEY = "Kj5Pvg3lesCFsqQSMXB22Y8SDsHqmJpI29LCPszmb-4";

export default async function requestPictures(query: string, page: number) {
  const { data } = await axios.get<ImageData>(`https://api.unsplash.com/search/photos`, {
    params: {
      query,
      page,
      client_id: ACCESS_KEY,
    },
  });
  return data;
}
