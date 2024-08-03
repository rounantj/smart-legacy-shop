const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
require("dotenv").config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

console.log({
  a: process.env.SMART_API,
  b: process.env.URL_IMAGES,
})

module.exports = (phase) => {
  // Definindo os domínios permitidos para imagens
  let domains = [
    process.env.SMART_API,
    process.env.URL_IMAGES,
    "*",
    "localhost:3000",
  ];

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    domains.push("localhost");
  }

  return {
    reactStrictMode: false,
    images: {
      domains,
      unoptimized: true,
    },
    env: {
      MASTER_ID: process.env.MASTER_ID,
      AFFILIATE_ID: process.env.AFFILIATE_ID,
      LINK_ADICIONAL: process.env.LINK_ADICIONAL,
      SMART_API: process.env.SMART_API,
      URL_IMAGES: process.env.URL_IMAGES
    },
  };
};
