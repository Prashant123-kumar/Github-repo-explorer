import axios from "axios";

const githubApi = axios.create({
  // Matches your backend @RequestMapping base path
  baseURL: "https://github-repo-explorer-api-8sgt.onrender.com/api/github" ,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
});

export default githubApi;