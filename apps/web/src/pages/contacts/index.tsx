import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContactsError } from "../../components/Contacts/ContactsError";
import { ContactsSuccess } from "../../components/Contacts/ContactsSuccess";
import { Layout } from "../../components/Layout";

export function ContactsPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("u") || localStorage.getItem("u") === null) {
      navigate("/auth/login");
    }
  }, []);

  return (
    <Layout>
      <div className="p-20 flex flex-col gap-10">
        <ContactsSuccess />
        <ContactsError />
      </div>
    </Layout>
  );
}
