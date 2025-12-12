<template>
  <div class="movie-app-body">
    <header>
      <form action="" @submit.prevent="getMovies(searchTerm)">
        <input
          type="text"
          class="search"
          placeholder="Search for a movie"
          v-model="searchTerm"
        />
      </form>
    </header>
    <main>
      <div class="movie" v-for="movie in movies" :key="movie.id">
        <img :src="IMG_PATH + movie.poster_path" alt="" />
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <span :class="getScoreColor(movie.vote_average)">{{
            movie.vote_average.toFixed(1)
          }}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          <p>
            {{ movie.overview }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";

// 接口
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

// 搜索框内容
const searchTerm = ref("");

interface Movie {
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  id: number;
}
const movies = ref<Movie[]>([]);

const getMovies = async (name?: string) => {
  let response;
  if (name && name.trim() != "") {
    response = await axios.get(SEARCH_API + name);
  } else {
    response = await axios.get(API_URL);
  }
  const data = response.data;
  movies.value = data.results;
};

const getScoreColor = (score: number) => {
  if (score >= 7) return "green";
  if (score >= 5) return "orange";
  return "red";
};

onMounted(() => {
  // dom渲染完成后，执行getMovies
  getMovies();
});
</script>

<style>
:root {
  --primary-color: #22254b;
  --secondary-color: #373b69;
}
</style>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Muli");

.movie-app-body {
  font-family: "Muli", sans-serif;
  background-color: var(--primary-color);
  min-height: 100vh;
}

header {
  display: flex;
  justify-content: end;
  padding: 1rem;
  background-color: var(--secondary-color);
}

.search {
  color: white;
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-family: "inherit";
}
.search::placeholder {
  color: #7378c5;
}
.search:focus {
  outline: none;
  background-color: var(--primary-color);
}

main {
  display: flex;
  flex-wrap: wrap;
}

.movie {
  width: 300px;
  margin: 1rem;
  border-color: var(--secondary-color);
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}
.movie img {
  width: 100%;
}
.movie-info {
  color: #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.2rem;
  padding: 0.5rem 1rem 1rem;
  letter-spacing: 0.5px;
}
.movie-info h3 {
  margin-top: 0;
}
.movie-info span {
  border-color: var(--primary-color);
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
}
.movie-info span.green {
  color: lightgreen;
}
.movie-info span.orange {
  color: orange;
}
.movie-info span.red {
  color: red;
}

.overview {
  background-color: #fff;
  color: var(--primary-color);
  position: absolute;
  padding: 2rem;
  left: 0;
  bottom: 0;
  right: 0;
  min-height: 50%;
  transform: translateY(101%);
  transition: transform 0.3s ease-in;
}
.movie:hover .overview {
  transform: translateY(0%);
}
</style>
