<template>
  <div class="task-title">
    <h2>Ongoing Task</h2>
    <span>
      <a href="/task/create">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="#fc8c7e"
          class="bi bi-plus-circle-dotted"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
          />
        </svg>
      </a>
    </span>
  </div>
  <div class="task">
    <div class="task-content">
      <div class="box" v-for="list in task_list" :key="list.id">
        <div class="task-box">
          <div class="title">
            <h3>{{ list.title }}</h3>
            <span class="warning" v-if="list.deadline !== null"
              >{{ list.deadline }}d</span
            >
            <span class="danger" v-if="list.ongoing">on going</span>
          </div>
          <div class="task-detail">
            <div class="task-info">
              <div class="top-content">
                <p>{{ list.description }}</p>
              </div>
              <div class="bottom-content">
                <h5>#{{ list.id }}</h5>
                <div class="estimation">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#FD7461"
                    class="bi bi-clock-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                    />
                  </svg>
                  <span>{{ list.time_start }} - {{ list.time_end }}</span>
                </div>
              </div>
            </div>
            <div
              class="task-progress"
              v-if="list.ongoing || (list.type == 1 && list.repetitive)"
            >
              <svg class="progress_bar" width="100" height="100">
                <circle
                  class="progress_bar__circle"
                  :stroke="list.type == 1 ? '#b2d198' : '#ef8579'"
                  stroke-width="4"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                  :style="{
                    'stroke-dasharray': circumference.value,
                    'stroke-dashoffset': strokeDashoffset(list.progress),
                  }"
                />
              </svg>
              <span
                >{{ list.progress }}{{ list.type == 1 ? "%" : " min" }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
export default {
  name: "TodaySchedule",
  setup() {
    const task_list = reactive([
      {
        id: "02",
        title: "Component create",
        description: "Create Component for vue view",
        time_start: "11:30",
        time_end: "13:00",
        deadline: 5,
        progress: 35,
        ongoing: false,
        repetitive: true,
        type: 1,
      },
      {
        id: "03",
        title: "Istirahat",
        description: "Chill",
        time_start: "13:10",
        time_end: "14:00",
        deadline: null,
        ongoing: true,
        progress: 90,
        repetitive: true,
        type: 2,
      },
      {
        id: "04",
        title: "Tugas kalkulus",
        description: "Jawab quis",
        time_start: "14:00",
        time_end: "15:00",
        deadline: 1,
        ongoing: false,
        progress: 0,
        repetitive: true,
        type: 3,
      },
    ]);

    const circumference = reactive({
      value: "",
    });

    onMounted(() => {
      circumference.value = 42 * 2 * Math.PI;
    });

    const strokeDashoffset = computed(() => {
      return (percent) =>
        circumference.value - (percent / 100) * circumference.value;
    });

    return {
      circumference,
      task_list,
      strokeDashoffset,
    };
  },
};
</script>

<style scoped>
.task-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0 0 0;
}

.task {
  overflow: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-radius: 10px;
}

.task::-webkit-scrollbar {
  display: none;
}

.task-content {
  max-height: 550px;
}

.box {
  padding-bottom: 20px;
}

.box:last-child {
  padding-bottom: 40px;
}

.task-box {
  width: 100%;
  height: 190px;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  -webkit-box-shadow: 0 6px 23px -15px #ffa195;
  -moz-box-shadow: 0 6px 23px -15px #ffa195;
  box-shadow: 0 6px 23px -15px #ffa195;
}

.task-box .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}

.task-box .title h3,
.task-box .title span {
  font-weight: bold;
  margin: 2px 0 2px 0;
}

.task-box .title span {
  padding: 3px 10px;
  border-radius: 10px;
  color: #fff;
  opacity: 0.7;
}

.task-box .title span.warning {
  background-color: #f8a94d;
}

.task-box .title span.danger {
  background-color: #ef8579;
}

.task-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
  width: 50%;
}

.task-info p {
  margin: 0px;
  width: inherit;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-detail {
  display: flex;
  justify-content: space-between;
  height: 100px;
}

.task-info h5 {
  font-size: 15px;
  margin: 2px;
  text-align: left;
  opacity: 0.6;
}

.estimation {
  display: flex;
  align-items: center;
}

.estimation svg {
  padding: 2px 5px 2px 2px;
}

.task-progress {
  width: 100px;
  height: 100px;
  position: relative;
}

.task-progress span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress_bar__circle {
  transition: 0.35s stroke-dashoffset;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>
