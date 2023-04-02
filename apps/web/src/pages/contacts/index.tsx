import { Contacts } from "../../components/Contacts/Contacts";
import { Layout } from "../../components/Layout";

export function ContactsPage() {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useCheckAuth();

  // if (!isAuthenticated) {
  //   navigate("/auth/login");
  // }

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
