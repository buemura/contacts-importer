import { useEffect, useState } from "react";
import { filesService } from "../../../services/filesService";
import { File } from "../../../types/file";
import { socket } from "../../../utils/socket";

export default function FileStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [importedFiles, setImportedFiles] = useState<File[]>([]);

  socket.on("newMessage", () => {
    console.log("Received new message");
    location.reload();
  });

  const fetchImportStatus = async () => {
    try {
      setIsLoading(true);
      const result = await filesService.getFiles();
      setIsLoading(false);
      setImportedFiles(result);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchImportStatus();
  }, []);

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      {hasError && <span>Failed to fetch imported files. Try again later</span>}

      {importedFiles?.length > 0 && (
        <table className="w-full table-auto text-sm">
          <thead className="overflow-x-scroll bg-neutral-300">
            <tr>
              <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                name
              </th>
              <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
                status
              </th>
            </tr>
          </thead>

          <tbody className="overflow-x-scroll">
            {importedFiles?.map((file) => (
              <tr key={file.id}>
                <td className="border bg-white pl-1">{file.name}</td>
                <td className="border bg-white pl-1">{file.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
