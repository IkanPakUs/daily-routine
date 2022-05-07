<template>
  <div class="home">
    <navbar />

    <div class="content">
      <weather-info />
      <today-schedule />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Navbar, WeatherInfo, TodaySchedule } from "@/components/TaskManager";

export default {
  name: "HomeView",
  components: {
    Navbar,
    WeatherInfo,
    TodaySchedule,
  },
};
</script>

<style scoped>
.content {
  padding: 0px 25px;
  box-sizing: border-box;
}
</style>
