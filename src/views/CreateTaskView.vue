<template>
  <div class="about">
    <navbar :message="{ top: 'Be productive', bottom: 'Add schedule' }" />

    <div class="content">
      <div class="form">
        <div class="form-group">
          <input-text placeholder="Title" />
        </div>
        <div class="form-group">
          <date-picker />
          <div class="time">
            <time-picker id="start" />
            <time-picker id="end" />
          </div>
        </div>
        <div class="form-group">
          <text-area
            :autoSize="{ minRows: 5, maxRows: 6 }"
            placeholder="Description"
          />
        </div>
        <div class="form-group">
          <a-select placeholder="Select type" :options="options_type">
          </a-select>
        </div>
      </div>
      <div class="form-group add-button">
        <button>Add schedule</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Navbar } from "@/components/TaskManager";
import { DatePicker, TimePicker, Input, Select } from "ant-design-vue";

export default {
  name: "CreateTaskView",
  components: {
    Navbar,
    TimePicker,
    DatePicker,
    ASelect: Select,
    InputText: Input,
    TextArea: Input.TextArea,
  },
  setup() {
    const options_type = ref([
      { value: 1, label: "Project" },
      { value: 2, label: "Reminder" },
      { value: 3, label: "Event" },
    ]);

    return {
      options_type,
    };
  },
};
</script>

<style scoped>
.about {
  height: 100vh;
}

.content {
  padding: 0px 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 800px;
}

.form-group {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.form-group.add-button {
  display: flex;
  justify-content: center;
}

.form-group button {
  border: none;
  border-radius: 10px;
  height: 50px;
  background-color: #fc8c7e;
  color: #fff;
  width: 50%;
  -webkit-box-shadow: 0 14px 31px -8px #fc8c7e;
  -moz-box-shadow: 0 14px 31px -8px #fc8c7e;
  box-shadow: 0 14px 31px -8px #fc8c7e;
}
</style>
