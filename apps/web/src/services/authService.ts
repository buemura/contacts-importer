import { api } from "./api";

type AuthProps = {
  username: string;
  password: string;
};

async function login({ username, password }: AuthProps) {
  try {
    const url = `/auth/login`;
    const body = { username, password };
    const { data } = await api.post(url, body);
    return data;
  } catch (error) {
    return null;
  }
}

async function register({ username, password }: AuthProps) {
  try {
    const url = `/auth/register`;
    const body = { username, password };
    const { data } = await api.post(url, body);
    return data;
  } catch (error) {
    return null;
  }
}

export const authService = {
  login,
  register,
};
