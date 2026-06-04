import axios from "axios";

const githubApi = axios.create({
  // Matches your backend @RequestMapping base path
  baseURL: "http://localhost:8080/api/github", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
});

export default githubApi;