# 🚀 GitHub Repo Explorer

<live link>
Live Frontend:
[[https://github-repo-explorer-frontend-gamma.vercel.app](https://github-repo-explorer-frontend-gamma.vercel.app/)](https://github-repo-explorer-frontend-gamma.vercel.app/)

Live Backend:
https://github-repo-explorer-api-8sgt.onrender.com

Swagger:
https://github-repo-explorer-api-8sgt.onrender.com/swagger-ui.html

<div align="center">

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge\&logo=react)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-green?style=for-the-badge\&logo=springboot)
![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge\&logo=openjdk)
![Vite](https://img.shields.io/badge/Vite-Latest-purple?style=for-the-badge\&logo=vite)
![GitHub API](https://img.shields.io/badge/GitHub-REST_API-black?style=for-the-badge\&logo=github)
![Caffeine](https://img.shields.io/badge/Caffeine-Cache-red?style=for-the-badge)

### Enterprise Proxy Optimization powered by Caffeine Core Engine and Spring Boot

A full-stack GitHub analytics platform that allows users to search profiles, explore repositories, sort data dynamically, and leverage a secure backend proxy with intelligent caching.

</div>

---

# 🎥 Demo

<p align="center">
  <img src="Assets/demo.gif" width="100%" alt="Demo"/>
</p>

---

# 📸 Screenshots

## 🏠 Home Page

![Home](Assets/home-page.png)

Search any GitHub user instantly and access recent searches.

---

## 👤 Profile Dashboard

![Dashboard](Assets/profile-dashboard.png)

Displays:

* Profile Avatar
* Username
* Followers
* Following
* Public Repository Count

---

## 📂 Repository Explorer

![Repositories](Assets/repositories.png)

Browse repositories with:

* Repository Description
* Language Information
* Star Count
* Metadata

---

## 🔄 Dynamic Sorting

![Sorting](Assets/sorting.png)

Sort repositories by:

* ⭐ Stars
* 🍴 Forks
* 🔤 Name
* ⏰ Updated

---

# 🏗️ Architecture

The frontend never communicates directly with GitHub APIs.

```text
┌──────────────────┐
│ React Frontend   │
└────────┬─────────┘
         │ Axios
         ▼
┌──────────────────┐
│ Spring Boot API  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Caffeine Cache   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ GitHub REST API  │
└──────────────────┘
```

---

# ⚡ Key Features

## 🔍 Smart GitHub Search

Search public GitHub profiles:

```text
torvalds
gaearon
jeresig
prashant123-kumar
```

Also supports:

```text
https://github.com/torvalds
```

Automatic username extraction included.

---

## 👤 User Profile Analytics

Displays:

* Avatar
* Username
* Followers
* Following
* Public Repositories

---

## 📂 Repository Feed

Displays:

* Repository Name
* Description
* Programming Language
* Star Count

---

## 🔄 Dynamic Sorting

Supported sort modes:

* Stars
* Forks
* Name
* Updated

Server-side sorting for better performance.

---

## 🕒 Recent Searches

Stores the latest searched usernames using browser local storage.

Features:

* Maximum 5 searches
* Duplicate prevention
* One-click re-search

---

## ⚡ Intelligent Caching

Powered by Caffeine Cache.

Benefits:

* Faster response times
* Reduced API calls
* Better scalability

Configuration:

```properties
cache.ttl-seconds=60
cache.max-size=500
```

---

## 🛡️ Secure Proxy Layer

GitHub tokens remain server-side.

Benefits:

* No token exposure
* Secure API access
* Production-ready architecture

---

## 🚨 Global Exception Handling

Custom exceptions:

```java
GithubApiException
GithubRateLimitException
GithubUserNotFoundException
```

Managed through:

```java
GlobalExceptionHandler
```

---

# 🏛 Backend Architecture

```text
com.prashant.githubexplorer
│
├── advice
│   └── GlobalExceptionHandler
│
├── client
│   └── GithubApiClient
│
├── config
│   └── RestClientConfig
│
├── controller
│   └── GithubController
│
├── dto
│   ├── GithubUserDto
│   ├── RepoDto
│   ├── RepoDetailDto
│   ├── LanguageStatsResponse
│   ├── CacheStatusResponse
│   ├── ErrorResponse
│   └── PagedResponse
│
├── exception
│   ├── GithubApiException
│   ├── GithubRateLimitException
│   └── GithubUserNotFoundException
│
├── service
│   └── GithubService
│
└── GithubExplorerApplication
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Axios
* CSS3

## Backend

* Java 17
* Spring Boot
* Maven
* RestClient
* Spring Cache
* Caffeine Cache
* SpringDoc OpenAPI
* Spring Actuator

## APIs

* GitHub REST API

---

# 📡 REST API Endpoints

## User Profile

```http
GET /api/github/user/{username}
```

---

## User Repositories

```http
GET /api/github/repos/{username}
```

---

## Paginated Repositories

```http
GET /api/github/repos/{username}?page=0&size=10
```

---

## Language Statistics

```http
GET /api/github/languages/{username}
```

---

## Cache Status

```http
GET /api/github/cache/status
```

---

# 📚 Swagger Documentation

Swagger UI:

```text
http://localhost:8080/swagger-ui.html
```

OpenAPI Docs:

```text
http://localhost:8080/api-docs
```

---

# 📊 Spring Boot Actuator

Monitoring Endpoints:

```text
/actuator/health
/actuator/info
/actuator/metrics
```

---

# ⚙️ Configuration

```properties
server.port=8080

github.api.base-url=https://api.github.com
github.api.token=

cache.ttl-seconds=60
cache.max-size=500

github.repos.default-page-size=10
github.repos.max-page-size=100
```

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone https://github.com/Prashant123-kumar/Github-repo-explorer.git
```

---

## Backend

```bash
cd Backend
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

---

## Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔐 Rate Limit Optimization

GitHub API Limits:

| Mode        | Requests/Hour |
| ----------- | ------------- |
| Without PAT | 60            |
| With PAT    | 5000          |

Configure:

```properties
github.api.token=YOUR_PERSONAL_ACCESS_TOKEN
```

---

# 🎯 Learning Outcomes

This project demonstrates:

✅ React + Spring Boot Integration

✅ Enterprise Proxy Architecture

✅ REST API Development

✅ DTO Pattern

✅ Pagination

✅ Server-side Sorting

✅ Caching Strategies

✅ Exception Handling

✅ Swagger/OpenAPI

✅ Spring Boot Actuator

✅ GitHub API Integration

---

# 🔮 Future Enhancements

* Repository Search Filter
* Language Analytics Dashboard
* GitHub Contribution Graph
* OAuth Authentication
* Repository Comparison Tool
* AI-Powered Repository Insights

---

# 👨‍💻 Author

### Prashant Kumar

Java Developer | Spring Boot Enthusiast | AI & ML Learner

GitHub:

https://github.com/Prashant123-kumar

---

# ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the repository

🛠️ Contribute

---

# 📜 License

Licensed under the MIT License.

---

<div align="center">

### Built with ❤️ using React, Spring Boot, GitHub API & Caffeine Cache

</div>
