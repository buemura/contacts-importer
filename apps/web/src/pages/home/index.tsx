import { Layout } from "../../components/Layout";

export function HomePage() {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useCheckAuth();

  // if (!isAuthenticated) {
  //   navigate("/auth/login");
  // }

  return (
    <Layout>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>Werlcome to Contacts importer!</h1>
        <h2>Use navbar to navigate through application options</h2>
      </div>
    </Layout>
  );
}
