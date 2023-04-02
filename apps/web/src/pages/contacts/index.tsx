import { Contacts } from "../../components/Contacts/Contacts";
import { Layout } from "../../components/Layout";

export function ContactsPage() {
  return (
    <Layout>
      <div className="p-20 flex flex-col gap-10">
        <Contacts />
        {/* <ContactsSuccess />
        <ContactsError /> */}
      </div>
    </Layout>
  );
}
