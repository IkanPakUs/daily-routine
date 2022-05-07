<template>
  <div id="container">
    <router-view />
  </div>
</template>

<style>
body {
  background-color: #f6fafb;
  margin: 0;
  padding: 0;
}

#container {
  max-width: 600px;
  margin: auto;
  overflow: hidden;
  min-height: 100vh;
}

#app {
  font-family: "Radio Canada", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #524746;
}
</style>
