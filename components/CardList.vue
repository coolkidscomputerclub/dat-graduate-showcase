<template>
  <ul class="card-list">
    <li v-for="item in items" :key="item.slug">
      <component :is="card" v-bind="{ ...item }" />
    </li>
  </ul>
</template>

<script>
import ProjectCard from '~/components/ProjectCard.vue';
import StudentCard from '~/components/StudentCard.vue';

export default {
  components: {
    ProjectCard,
    StudentCard,
  },

  props: {
    items: {
      type: Array,

      required: true,
    },

    card: {
      type: String,

      required: true,
    },
  },
};
</script>

<style scoped>
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  grid-gap: 30px;
  justify-content: center;
  list-style: none;
  margin: 0 auto;
  padding: 60px 30px 30px;
}
</style>
