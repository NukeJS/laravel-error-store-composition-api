<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input v-model="user.username" />
      <ErrorField name="username" />
    </div>
    <div>
      <input v-model="user.password" />
      <ErrorField name="username" />
    </div>
    <button type="submit">Register</button>
  </form>
</template>

<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';

import { hasError, getFirstError } from './stores/error';

import ErrorField from './components/ErrorField.vue';

const user = reactive({
  username: '',
  password: '',
});

const onSubmit = async () => {
  axios.post('/some-api-endpoint', user);
};
</script>
