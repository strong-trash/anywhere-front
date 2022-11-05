<template>
  <button class="rounded-btn" type="button" @mousedown="handler" :disabled="disabled">
    <img v-if="imgsrc" :src="imgsrc" /> {{ btntext }}
  </button>
</template>

<script>
export default {
  props: ["imgsrc", "handler", "btntext", "disabled"],
};
</script>

<style lang="scss">
.rounded-btn {
  display: flex;
  justify-content: center;
  align-items: center;

  // width: 36px;
  height: 36px;
  margin-right: 8px;
  margin-top: 8px;

  background-color: white;
  // border-radius: 50%;
  border-radius: 16px;
  border: 1px solid lightgrey;
  cursor: pointer;
  transition: all 0.2s;
  img {
    width: 22px;
    height: 22px;
    filter: opacity(0.8);
  }
}
.rounded-btn:hover {
  transform: scale(1.1);
}
.rounded-btn:active {
  transform: scale(0.9);
}
.rounded-btn:disabled {
  cursor: not-allowed;
  filter: brightness(70%);
}
</style>
