import crypto from "crypto";
import multer from "multer";
import path from "path";

const uploadFolder = path.resolve(__dirname, "..", "..", "..", "uploads");

export const uploadConfig = {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(_request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
