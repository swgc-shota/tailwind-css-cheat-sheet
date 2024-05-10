import fs from "fs";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/tools/tailwind-css-cheat-sheet",
  server: {
    https: {
      key: fs.readFileSync("./certs/localhost.key"),
      cert: fs.readFileSync("./certs/localhost.crt"),
    },
  },
});
