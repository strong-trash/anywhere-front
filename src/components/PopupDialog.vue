<!-- 팝업 대화창입니다. 후기(article)의 제목을 클릭했을 때 세부내용을 보여주는 용도로 활용할 수 있습니다. -->

<template>
  <div v-if="false" class="popup-dialog">
    <background-drop />
    <div class="container">
      <header></header>
      <article></article>
    </div>
  </div>
</template>

<script>
import BackgroundDrop from "@/components/BackgroundDrop.vue";
export default {
  components: {
    "background-drop": BackgroundDrop,
  },
};
</script>

<style lang="scss">
.popup-dialog {
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    position: absolute;
    min-width: 50vw;
    min-height: 50vh;

    padding: 16px;
    border-radius: 16px;
    background-color: white;
  }
}
</style>
