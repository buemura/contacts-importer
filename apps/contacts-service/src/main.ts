import "dotenv/config";
import { server } from "./infra/http/configs/server-config";

const PORT = process.env.PORT ?? 5001;

server.listen(PORT, () => {
  console.log(`Server running...`);
});
