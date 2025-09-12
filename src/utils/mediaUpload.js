import axios from "axios";
import { BASE_URL } from "./url";

export const uploadMediaFiles = async (files) => {
  const uploaded = [];

  for (let file of files) {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`${BASE_URL}/upload/post`, formData, {
        withCredentials: true,
      });

      const fileData = res.data;
      if (!fileData?.url) throw new Error("Upload failed");

      uploaded.push({ url: fileData.url, type: fileData.type });
    } catch (err) {
      console.error("Upload failed:", err);
    }
  }
  return uploaded;
};

export const uploadDp = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${BASE_URL}/upload/dp`, formData, {
      withCredentials: true,
    });

    return res.data.imageUrl;
  } catch (err) {
    console.error("Upload failed:", err);
    throw new Error("Image upload failed!");
  }
};
