<template>
  <div class="weather-info">
    <div class="info-detail">
      <ul>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cloud-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
            />
          </svg>
          {{ weather_info.weather.at(0)?.main ?? "-" }}
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-wind"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          {{ weather_info.wind?.speed?.toFixed(2) ?? "-" }} m/s
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-droplet-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"
            />
          </svg>
          {{ weather_info.main.humidity ?? "-" }}%
        </li>
      </ul>
    </div>
    <div class="temperature">
      <h1>{{ weather_info.main?.temp?.toFixed() ?? "-" }}°</h1>
      <div class="min-max">
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            class="bi bi-arrow-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
            />
          </svg>
          {{ weather_info.main?.temp_min?.toFixed() ?? "-" }}°</span
        >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            class="bi bi-arrow-up"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
            />
          </svg>
          {{ weather_info.main?.temp_max?.toFixed() ?? "-" }}°</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, onMounted, watch } from "vue";

export default {
  name: "WeatherInfo",
  setup() {
    let weather_info = reactive({
      main: "",
      wind: "",
      weather: [],
    });

    const cordinate = reactive({
      lat: "",
      long: "",
    });

    onMounted(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          cordinate.lat = position.coords.latitude;
          cordinate.long = position.coords.longitude;
        });
      }
    });

    watch(cordinate, () => {
      if (cordinate.lat !== "" && cordinate.long !== "") {
        axios
          .get(
            `${process.env.VUE_APP_WEATHER_URL_ENDPOINT}?lat=${cordinate.lat}&lon=${cordinate.long}&appid=${process.env.VUE_APP_WEATHER_API_KEY}&units=metric`
          )
          .then((result) => {
            weather_info.main = result.data.main;
            weather_info.wind = result.data.wind;
            weather_info.weather = result.data.weather;
          });
      }
    });

    return {
      weather_info,
      cordinate,
    };
  },
};
</script>

<style scoped>
.weather-info {
  width: 100%;
  height: 180px;
  background-color: #fc8c7e;
  border-radius: 30px;
  display: flex;
  align-items: center;
  -webkit-box-shadow: 0 14px 31px -8px #fc8c7e;
  -moz-box-shadow: 0 14px 31px -8px #fc8c7e;
  box-shadow: 0 14px 31px -8px #fc8c7e;
}

.info-detail {
  width: 50%;
}

.info-detail ul {
  list-style: none;
  text-align: left;
  line-height: 30px;
}

.temperature h1,
.info-detail ul li,
.min-max span {
  font-weight: bold;
  color: #fff;
}

.temperature {
  margin-bottom: 16px;
}

.temperature h1 {
  font-size: 70px;
  margin: 2px;
  height: 70px;
}

.min-max {
  text-align: left;
}

.min-max span {
  font-size: 13px;
  margin: 2px;
}
</style>
