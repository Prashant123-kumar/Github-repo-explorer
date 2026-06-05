import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://github-repo-explorer-backend-1.onrender.com/api/github",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  }
});

export default githubApi;