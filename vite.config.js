import fs from "fs";
import { defineConfig, loadEnv } from "vite";
export default defineConfig(({ command }) => {
  const env = loadEnv("", process.cwd(), "");
  const config = {
    root: "src",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
    },
  };

  if (command === "build") {
    if (env.VITE_BASE_PATH !== undefined) {
      config.base = env.VITE_BASE_PATH;
    }
  }

  if (env.VITE_KEY_PATH !== undefined && env.VITE_CERT_PATH !== undefined) {
    config.server = {
      https: {
        key: fs.readFileSync(env.VITE_KEY_PATH),
        cert: fs.readFileSync(env.VITE_CERT_PATH),
      },
    };
  }

  return config;
});
