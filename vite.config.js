import fs from "fs";
import { defineConfig, loadEnv } from "vite";

const gtmScriptInHead = (tagId) => `<!-- Google Tag Manager -->
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "${tagId}");
</script>
<!-- End Google Tag Manager -->`;

const gtmScriptInBody = (tagId) => `<!-- Google Tag Manager (noscript) -->
<noscript
  ><iframe
    src="https://www.googletagmanager.com/ns.html?id=${tagId}"
    height="0"
    width="0"
    style="display: none; visibility: hidden"
  ></iframe
></noscript>
<!-- End Google Tag Manager (noscript) -->`;

export default defineConfig(({ command }) => {
  const env = loadEnv("", process.cwd(), "");
  const config = {
    root: "src",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
    },
    publicDir: "../public",
    plugins: [],
  };

  if (command === "build") {
    if (env.VITE_BASE_PATH !== undefined) {
      config.base = env.VITE_BASE_PATH;
    }

    if (env.VITE_GTM_ID !== undefined) {
      config.plugins.push({
        name: "html-transform",
        transformIndexHtml(html) {
          return html
            .replace(/<head>/, `<head>${gtmScriptInHead(env.VITE_GTM_ID)}`)
            .replace(/<body>/, `<body>${gtmScriptInBody(env.VITE_GTM_ID)}`);
        },
      });
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
