import { api } from "./api";

type ContactsProps = {
  userId: string;
  accessToken: string;
};

async function getContactsSuccess({ userId, accessToken }: ContactsProps) {
  try {
    const url = `/users/${userId}/contacts/success`;
    const { data: response } = await api.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response?.successContacts;
  } catch (error) {
    return null;
  }
}

async function getContactsError({ userId, accessToken }: ContactsProps) {
  try {
    const url = `/users/${userId}/contacts/error`;
    const { data: response } = await api.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response?.errorContacts;
  } catch (error) {
    return null;
  }
}

export const contactsService = {
  getContactsSuccess,
  getContactsError,
};
