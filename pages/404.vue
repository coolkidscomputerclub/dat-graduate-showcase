<template>
  <error :error="{ statusCode: 404 }" />
</template>

<script>
import Error from '~/layouts/error.vue';

export default {
  components: {
    Error,
  },
};
</script>
