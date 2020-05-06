<template>
  <ul class="card-list">
    <li v-for="item in items" :key="item.slug" class="card-list-item">
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
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 0 0 0 -30px;
  padding: 60px 30px 30px;
  width: 100%;
  max-width: 1100px;

  @supports (display: grid) {
    display: grid;
    grid-template-columns: repeat(auto-fill, 230px);
    grid-gap: 30px;
    flex-flow: initial;
    justify-content: center;
    margin: 0;
  }
}

.card-list-item {
  margin: 0 0 30px 30px;
  flex: 0 0 230px;

  @supports (display: grid) {
    margin: 0;
    flex: initial;
  }
}
</style>
