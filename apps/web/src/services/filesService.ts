import axios from "axios";
import { BASE_URL } from "../configs/env";

type GetFileProps = {
  userId: string;
  accessToken: string;
};

type UploadProps = {
  userId: string;
  file: FormData;
  accessToken: string;
};

async function getFiles() {
  try {
    // const url = `/users/${userId}/files`;
    // const { data: response } = await api.get(url, {
    //   headers: { Authorization: `Bearer ${accessToken}` },
    // });
    const { data: response } = await axios.get(`${BASE_URL.FILE_API}/files`);
    return response;
  } catch (error) {
    return null;
  }
}

async function upload({ userId, file, accessToken }: UploadProps) {
  try {
    // const url = `/users/${userId}/files`;
    // const { data: response } = await api.post(url, file, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    const { data: response } = await axios.post(
      `${BASE_URL.FILE_API}/files`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return null;
  }
}

export const filesService = {
  getFiles,
  upload,
};
