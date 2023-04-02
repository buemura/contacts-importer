import { useEffect, useState } from "react";
import { contactsService } from "../../services/contactsService";

export function ContactsSuccess() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [contactsSuccess, setContactsSuccess] = useState([]);

  const userData = JSON.parse(localStorage.getItem("u") || "");

  const fetchContactsSuccess = async () => {
    try {
      setIsLoading(true);
      const result = await contactsService.getContactsSuccess({
        userId: userData._id,
        accessToken: userData.accessToken,
      });
      setIsLoading(false);
      setContactsSuccess(result);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchContactsSuccess();
  }, []);

  console.log(contactsSuccess);

  return (
    <div>
      <h1 className="text-lg">Successfull Contacts</h1>
      {isLoading && <span>Loading...</span>}
      {hasError && (
        <span>Failed to fetch contacts success. Try again later</span>
      )}

      {contactsSuccess?.length > 0 && (
        <div className="h-80 overflow-y-scroll overflow-x-scroll">
          <table className="w-full table-auto text-sm">
            <thead className="bg-neutral-300">
              <tr>
                <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                  name
                </th>
                <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                  dateOfBirth
                </th>
                <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                  phone
                </th>
                <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                  address
                </th>
                <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                  creditCardNumber
                </th>
                <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                  creditCardNetwork
                </th>
                <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                  email
                </th>
              </tr>
            </thead>

            <tbody className="overflow-y-scroll overflow-x-scroll">
              {contactsSuccess?.map((contact) => (
                <tr key={contact._id}>
                  <td className="border bg-white pl-1">{contact.name}</td>
                  <td className="border bg-white pl-1">
                    {contact.dateOfBirth}
                  </td>
                  <td className="border bg-white pl-1">{contact.phone}</td>
                  <td className="border bg-white pl-1">{contact.address}</td>
                  <td className="border bg-white pl-1">
                    {contact.creditCardNumber}
                  </td>
                  <td className="border bg-white pl-1">
                    {contact.creditCardNetwork}
                  </td>
                  <td className="border bg-white pl-1">{contact.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
