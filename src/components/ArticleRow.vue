<template>
  <section class="article-row">
    <rounded-btn class="title" :btntext="articleTitle" :handler="handleClick" />
    <rounded-btn class="createdAt" :btntext="articleCreatedAt" :handler="handleClick" />
  </section>
</template>

<script>
import RoundedBtn from "./RoundedBtn.vue";

export default {
  components: {
    "rounded-btn": RoundedBtn,
  },
  props: {
    articleTitle: String,
    articleCreatedAt: String,
  },
  data() {
    return {
      //
    };
  },
  methods: {
    handleClick: () => {
      //
    },
  },
};
</script>

<style lang="scss">
.article-row {
  margin: 8px 0;

  .title,
  .createdAt {
    display: inline-block;
  }

  .title {
    margin-right: 8px;
  }
}
</style>
