import { FileUpload } from "../../components/FileUpload";
import ImportStatus from "../../components/ImportStatus";
import { Layout } from "../../components/Layout";

export function ImportPage() {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useCheckAuth();

  // if (!isAuthenticated) {
  //   navigate("/auth/login");
  // }

  return (
    <Layout>
      <div className="w-full h-full flex flex-col gap-10 p-20">
        <FileUpload />
        <ImportStatus />
      </div>
    </Layout>
  );
}
