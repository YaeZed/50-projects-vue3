<template>
  <div class="Login-body">
    <div class="container">
      <h1>Please Login</h1>
      <form action="">
        <div class="form-control">
          <input type="text" required />
          <label for=""
            ><span
              v-for="(char, index) in 'Email'"
              :key="index"
              :style="{ transitionDelay: index * 50 + 'ms' }"
              >{{ char }}</span
            ></label
          >
        </div>
        <div class="form-control">
          <input type="password" required />
          <label for=""
            ><span
              v-for="(char, index) in 'Password'"
              :key="index"
              :style="{ transitionDelay: index * 50 + 'ms' }"
              >{{ char }}</span
            ></label
          >
        </div>
        <button class="btn">Login</button>
        <p class="text">Don't have an account?<a href="">Regesiter</a></p>
      </form>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu");

.Login-body {
  font-family: "Ubuntu", sans-serif;
  height: 100vh;
  background-color: steelblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  color: #fff;
  padding: 20px 40px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.4);
}

h1 {
  text-align: center;
  font-size: 30px;
}

.form-control {
  width: 300px;
  margin: 20px 0 40px 0;
  position: relative;
}

.form-control input {
  background-color: transparent;
  border: 0;
  display: block;
  border-bottom: 2px solid #fff;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  color: #fff;
}

.form-control input:focus,
.form-control input:valid {
  outline: none;
  border-bottom-color: lightblue;
}

.form-control label {
  z-index: 1;
  position: absolute;
  top: 15px;
  left: 0;
}

.form-control label span {
  z-index: 0;
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.form-control input:focus ~ label span,
.form-control input:valid ~ label span {
  transform: translateY(-20px);
  color: lightblue;
}

.btn {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  background: lightblue;
  padding: 15px;
  font-family: inherit;
  font-size: 24px;
  border: 0;
  border-radius: 5px;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.95);
}

.text {
  margin-top: 30px;
}

a {
  text-decoration: none;
  color: lightblue;
}
</style>
