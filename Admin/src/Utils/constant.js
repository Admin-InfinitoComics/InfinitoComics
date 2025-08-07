// Utils/constant.js

export const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://infinitocomics-dev-testing.onrender.com";
