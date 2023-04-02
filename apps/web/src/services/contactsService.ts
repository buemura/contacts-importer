import axios from "axios";
import { BASE_URL } from "../configs/env";

type ContactsProps = {
  userId: string;
  accessToken: string;
};

async function getContacts() {
  try {
    const url = `${BASE_URL.CONTACT_API}/contacts`;
    const { data: response } = await axios.get(url);
    return response;
  } catch (error) {
    return null;
  }
}

async function getContactsSuccess({ userId, accessToken }: ContactsProps) {
  try {
    const url = `${BASE_URL.CONTACT_API}/contacts`;
    const { data: response } = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response?.successContacts;
  } catch (error) {
    return null;
  }
}

async function getContactsError({ userId, accessToken }: ContactsProps) {
  try {
    const url = `${BASE_URL.CONTACT_API}/contacts`;
    const { data: response } = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response?.errorContacts;
  } catch (error) {
    return null;
  }
}

export const contactsService = {
  getContacts,
  getContactsSuccess,
  getContactsError,
};
