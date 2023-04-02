import FileStatus from "../../components/Imports/FileStatus";
import { FileUpload } from "../../components/Imports/FileUpload";
import { Layout } from "../../components/Layout";

export function ImportPage() {
  return (
    <Layout>
      <div className="w-full h-full flex flex-col gap-10 p-20">
        <FileUpload />
        <FileStatus />
      </div>
    </Layout>
  );
}
