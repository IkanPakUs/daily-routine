<template>
  <div class="about">
    <navbar :message="{ top: 'Be productive', bottom: 'Add schedule' }" />

    <div class="content">
      <div class="form">
        <div class="form-group">
          <input-text
            placeholder="Title"
            class="input-form"
            v-model:value="schedule.title"
          />
        </div>
        <div class="form-group">
          <date-picker
            class="input-form"
            v-model:value="date"
            format="YYYY/MM/DD"
          />
          <div class="time">
            <time-picker
              class="input-time start"
              v-model:value="time_start"
              format="HH:mm"
              readonly="readonly"
            />
            <time-picker
              class="input-time end"
              v-model:value="time_end"
              format="HH:mm"
            />
          </div>
        </div>
        <div class="form-group">
          <text-area
            :autoSize="{ minRows: 5, maxRows: 6 }"
            placeholder="Description"
            class="input-form"
            v-model:value="schedule.description"
          />
        </div>
        <div class="form-group">
          <a-select
            placeholder="Select type"
            :options="options_type"
            size="large"
            class="input-select"
            v-model:value="schedule.type"
          >
          </a-select>
        </div>
        <div class="form-group" v-if="schedule.type == 1">
          <date-picker
            class="input-form"
            placeholder="Select deadline"
            v-model:value="deadline"
            format="YYYY/MM/DD"
          />
        </div>
        <div class="form-group" v-if="schedule.type == 2">
          <a-checkbox
            :checked="checked_all"
            class="check-all"
            :indeterminate="indeterminate"
            @change="checkAll"
            >Check all</a-checkbox
          >
          <checkbox-group
            v-model:value="schedule.options.days_check"
            :options="days"
            class="checkbox-group"
          >
          </checkbox-group>
        </div>
      </div>
      <div class="form-group add-button">
        <button @click="saveSchedule">Add schedule</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watch } from "vue";
import { Navbar } from "@/components/TaskManager";
import moment from "moment";
import {
  DatePicker,
  TimePicker,
  Input,
  Select,
  Checkbox,
  CheckboxGroup,
} from "ant-design-vue";
import router from "@/router";

export default {
  name: "CreateTaskView",
  components: {
    Navbar,
    TimePicker,
    DatePicker,
    CheckboxGroup,
    ACheckbox: Checkbox,
    ASelect: Select,
    InputText: Input,
    TextArea: Input.TextArea,
  },
  setup() {
    const days = ref([
      { value: 1, label: "Sunday" },
      { value: 2, label: "Monday" },
      { value: 3, label: "Tuesday" },
      { value: 4, label: "Wednesday" },
      { value: 5, label: "Thursday" },
      { value: 6, label: "Friday" },
      { value: 7, label: "Saturday" },
    ]);

    const options_type = ref([
      { value: 1, label: "Project" },
      { value: 2, label: "Reminder" },
      { value: 3, label: "Event" },
    ]);

    let schedule = reactive({
      title: "",
      date: "",
      time_start: "",
      time_end: "",
      description: "",
      type: null,
      options: {
        deadline: null,
        days_check: [],
      },
    });

    let state = reactive({
      checked_all: true,
      indeterminate: false,
      time_start: "",
      time_end: "",
      date: "",
      deadline: "",
    });

    const checkAll = () => {
      state.checked_all = !state.checked_all;
      state.indeterminate = !state.indeterminate;

      if (state.checked_all) {
        const value_day = days.value.map((v) => v.value);
        schedule.options.days_check = [...value_day];
      } else {
        schedule.options.days_check = [];
      }
    };

    const dateFormat = (dateState, dateObject) => {
      const date = moment(dateObject.$d, "yyyymmdd").format("YYYY/MM/DD");

      if (dateState == "deadline") {
        schedule.options.deadline = date;
      } else {
        schedule[dateState] = date;
      }
    };

    const timeFormat = (timeState, timeObject) => {
      schedule[timeState] = moment(timeObject.$d, "hmm").format("HH:mm");
    };

    const saveSchedule = () => {
      let schedules = localStorage.schedules
        ? JSON.parse(localStorage.schedules)
        : [];
      schedules = [...schedules, schedule];

      localStorage.schedules = JSON.stringify(schedules);
      router.push("/");
    };

    watch(
      () => schedule.options.days_check,
      (val) => {
        state.checked_all = val.length == days.value.length;
        state.indeterminate = !state.checked_all;
      }
    );

    watch(
      () => schedule.type,
      (val) => {
        schedule.options.deadline = null;
        schedule.options.days_check = [];

        if (val == 2) {
          schedule.options.days_check = [1, 2, 3, 4, 5, 6, 7];
        }
      }
    );

    watch(
      () => state.date,
      (val) => {
        dateFormat("date", val);
      }
    );

    watch(
      () => state.deadline,
      (val) => {
        dateFormat("deadline", val);
      }
    );

    watch(
      () => state.time_start,
      (val) => {
        timeFormat("time_start", val);
      }
    );

    watch(
      () => state.time_end,
      (val) => {
        timeFormat("time_end", val);

        let time_start = state.time_start;
        let time_end = state.time_end;

        if (time_end.$H < time_start.$H) {
          [state.time_start, state.time_end] = [time_end, time_start];
        }
      }
    );

    return {
      options_type,
      schedule,
      ...toRefs(state),
      checkAll,
      days,
      timeFormat,
      dateFormat,
      saveSchedule,
    };
  },
};
</script>

<style scoped>
.about {
  min-height: 100vh;
}

.content {
  padding: 0px 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form {
  margin-bottom: 90px;
}

.form-group {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.time {
  width: 100%;
  display: flex;
  margin-top: 10px;
}

.input-form {
  width: 100%;
  height: 50px;
  border-radius: 10px;
}

.input-select {
  width: 100%;
}

:deep(.form-group) .ant-select .ant-select-selector {
  border-radius: 10px;
}

.input-time {
  width: inherit;
  border-radius: 10px;
  height: 50px;
}

.start.input-time {
  margin-right: 5px;
}

.end.input-time {
  margin-left: 5px;
}

:deep(.form-group) .check-all {
  display: flex;
  justify-content: left;
  padding-bottom: 20px;
}

:deep(.form-group) .checkbox-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

:deep(.form-group) .checkbox-group .ant-checkbox-group-item {
  width: 106px;
}

.form-group.add-button {
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 0px;
  width: 100%;
  right: 0px;
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
