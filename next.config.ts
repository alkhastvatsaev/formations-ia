import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      {
        source: "/formations/ia-pour-developpeurs",
        destination: "/formations/coder-avec-ia",
        permanent: true,
      },
      {
        source: "/formation",
        destination: "/formation-ia",
        permanent: true,
      },
      {
        source: "/formations-ia",
        destination: "/formation-ia",
        permanent: true,
      },
      {
        source: "/apprendre/ia",
        destination: "/formation-ia",
        permanent: true,
      },
      {
        source: "/chatgpt",
        destination: "/guides/chatgpt-au-travail",
        permanent: true,
      },
      {
        source: "/cursor",
        destination: "/guides/cursor-sans-se-perdre",
        permanent: true,
      },
      {
        source: "/prompt-engineering",
        destination: "/guides/prompts-qui-delivrent",
        permanent: true,
      },
    ];
  },
};

export default withContentCollections(nextConfig);
