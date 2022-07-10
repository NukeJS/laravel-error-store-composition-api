<template>
  <div v-if="hasError(name)">
    <p>
      {{ getFirstError(name) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { hasError, getFirstError } from '../stores/error';

defineProps<{
  name: string;
}>();
</script>
