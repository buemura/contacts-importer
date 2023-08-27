import { useEffect, useState } from "react";
import { contactsService } from "../../services/contactsService";
import { Contact } from "../../types/contact";

export function Contacts() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const result = await contactsService.getContacts();
      setIsLoading(false);
      setContacts(result);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h1 className="text-lg">All Contacts</h1>
      {isLoading && <span>Loading...</span>}
      {hasError && (
        <span>Failed to fetch contacts with error. Try again later</span>
      )}

      {contacts?.length > 0 && (
        <div className="h-80 overflow-y-scroll overflow-x-scroll">
          <table className="w-full table-auto text-sm">
            <thead className="bg-neutral-300">
              <tr>
                <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                  name
                </th>
                <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                  email
                </th>
                <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                  Credit Card Number
                </th>
                <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                  Errors
                </th>
              </tr>
            </thead>

            <tbody className="overflow-y-scroll overflow-x-scroll">
              {contacts?.map((contact) => (
                <tr key={contact.id}>
                  <td className="border bg-white pl-1">{contact.name}</td>
                  <td className="border bg-white pl-1">{contact.email}</td>
                  <td className="border bg-white pl-1">
                    {contact.creditCardNumber}
                  </td>
                  <td className="border bg-white pl-1">{contact.errors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
