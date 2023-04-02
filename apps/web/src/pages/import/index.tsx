import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "../../components/FileUpload";
import ImportStatus from "../../components/ImportStatus";
import { Layout } from "../../components/Layout";

export function ImportPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("u") || localStorage.getItem("u") === null) {
      navigate("/auth/login");
    }
  }, []);

  return (
    <Layout>
      <div className="w-full h-full flex flex-col gap-10 p-20">
        <FileUpload />
        <ImportStatus />
      </div>
    </Layout>
  );
}
