import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { filesService } from "../../services/filesService";

export function FileUpload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const userData = JSON.parse(localStorage.getItem("u") || "");

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];

    if (file && file?.type === "text/csv") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert("Please select a CSV file.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const result = await filesService.upload({
        userId: userData._id,
        file: formData,
        accessToken: userData.accessToken,
      });
      if (!result) {
        navigate("/auth/login");
      }

      // location.reload();
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <form className="bg-white flex items-center p-4" onSubmit={handleSubmit}>
      <div className="flex">
        <label>Select a CSV file:</label>
        <input
          className="cursor-pointer"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </div>

      <button
        className="bg-blue-600 text-white px-2 py-1 rounded-sm"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
