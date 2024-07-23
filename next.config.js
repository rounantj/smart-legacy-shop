const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
require("dotenv").config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

module.exports = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};
module.exports = {
  env: {
    MASTER_ID: process.env.MASTER_ID,
    AFFILIATE_ID: process.env.AFFILIATE_ID,
    LINK_ADICIONAL: process.env.LINK_ADICIONAL,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = (phase) => {
  let domains = [
    "https://api-smart-939610cb57d8.herokuapp.com",
    "*",
    "localhost:3000",
  ];



  if (phase === PHASE_DEVELOPMENT_SERVER) {
    domains.push("localhost");
  }

  return {
    images: {
      domains,
    },
    env: {
      MASTER_ID: process.env.MASTER_ID,
      AFFILIATE_ID: process.env.AFFILIATE_ID,
      LINK_ADICIONAL: process.env.LINK_ADICIONAL,
    },
    images: {
      unoptimized: true,
    },
  };
};
