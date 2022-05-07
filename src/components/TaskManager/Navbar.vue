<template>
  <div class="navbar">
    <div class="notif-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="#fc8c7e"
        class="bi bi-calendar2-week-fill"
        viewBox="0 0 16 16"
        v-if="routeName == 'home'"
      >
        <path
          d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM8.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM3 10.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
        />
      </svg>
      <button onclick="history.back()" v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#fc8c7e"
          class="bi bi-arrow-left"
          viewBox="0 0 14 14"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </button>
    </div>
    <div class="greet-info">
      <h4>{{ message_text.top }},</h4>
      <h3>{{ message_text.bottom }}</h3>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  props: ["message"],
  setup(props) {
    const route = useRoute();
    const routeName = ref([]);

    let message_text = reactive({
      top: "Good morning",
      bottom: "Komang Arya",
    });

    onMounted(() => {
      if (props.message?.constructor === Object) {
        if (Object.keys(props.message).length !== 0) {
          message_text.top = props.message.top;
          message_text.bottom = props.message.bottom;
        }
      }
      routeName.value = route.name;
    });

    return {
      route,
      routeName,
      message_text,
    };
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  box-sizing: border-box;
}

.navbar .notif-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #fc8c7e;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notif-icon button {
  border: none;
  background-color: unset;
  cursor: pointer;
}

.navbar h3,
.navbar h4 {
  margin: 2px;
  text-align: right;
}

.navbar h4 {
  color: #524746;
  opacity: 0.8;
}

.navbar h3 {
  color: #fc8c7e;
}
</style>
