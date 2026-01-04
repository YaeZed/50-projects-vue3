<template>
  <div class="github-search-body">
    <input
      type="text"
      placeholder="Search a Github User"
      v-model="username"
      @keyup.enter="getUser(username), getRepos(username)"
    />

    <div v-if="user" class="main">
      <div class="card">
        <img :src="user?.avatar_url" alt="" class="avatar" />
        <div class="info">
          <h2 class="name">{{ user?.login }}</h2>
          <p class="desc">
            {{ user?.bio ? user?.bio : "user is lazy and there is no bio" }}
          </p>
          <ul>
            <li>{{ user?.followers }} <strong> Followers</strong></li>
            <li>{{ user?.following }} <strong> Following</strong></li>
            <li>{{ user?.public_repos }} <strong> Repos</strong></li>
          </ul>
          <div class="repos">
            <a
              v-for="repo in repos"
              :key="repo.id"
              :href="repo.html_url"
              target="_blank"
              class="repo"
              >{{ repo.name }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

interface User {
  username: string;
  login: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
}
const user = ref<User | null>(null);
const repos = ref<Repo[]>([]);
const APIURL = "https://api.github.com/users";
const username = ref("");

const getUser = async (username: string) => {
  const { data } = await axios.get(`${APIURL}/${username}`);
  user.value = data;
};
const getRepos = async (username: string) => {
  const { data } = await axios.get(`${APIURL}/${username}/repos`);
  console.log(data);

  if (data) {
    repos.value = data;
  } else {
    return;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

.github-search-body {
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 100vh;
  background-color: rgb(155, 156, 218);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
}

input {
  max-width: 700px;
  padding: 1rem;
  border-radius: 10px;
  border: none;
  background-color: blueviolet;
  font-size: 1rem;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.1);
}
input:focus {
  outline: none;
}
input:focus::placeholder {
  color: blueviolet;
}
input::placeholder {
  color: white;
}

.card {
  max-width: 800px;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05);
  background-color: blueviolet;
  padding: 3rem;
  margin-top: 1.5rem;
  display: flex;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 10px solid #2a2a72;
}

.info {
  color: #eee;
  margin-left: 2rem;
}

.info ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  max-width: 400px;
}
.info ul li {
  display: flex;
  align-items: center;
}
.info ul li strong {
  font-size: 0.9rem;
  margin: 0 0.5rem;
}

.repos {
  display: flex;
  flex-wrap: wrap;
}
.repo {
  text-decoration: none;
  color: white;
  background-color: #2a2a72;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 500px) {
  .card {
    flex-direction: column;
    align-items: center;
  }

  .info {
    max-width: 400px;
  }
}
</style>
