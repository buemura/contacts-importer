import { api } from "./api";

type GetFileProps = {
  userId: string;
  accessToken: string;
};

type UploadProps = {
  userId: string;
  file: FormData;
  accessToken: string;
};

async function getFiles({ userId, accessToken }: GetFileProps) {
  try {
    const url = `/users/${userId}/files`;
    const { data: response } = await api.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response?.files;
  } catch (error) {
    return null;
  }
}

async function upload({ userId, file, accessToken }: UploadProps) {
  try {
    const url = `/users/${userId}/files`;
    const { data: response } = await api.post(url, file, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    return null;
  }
}

export const filesService = {
  getFiles,
  upload,
};
