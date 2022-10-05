<template>
  <footer id="app-footer">
    <p>©어디로든</p>
    <a href="https://github.com/strong-trash" target="_blank">
      <p style="font-size: 12px; margin-left: 4px">2022 장현규 이원진</p>
    </a>

    <a
      href="https://github.com/strong-trash/anywhere-front"
      target="_blank"
      style="margin-left: auto"
    >
      <p>Credit</p>
    </a>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
#app-footer {
  display: flex;
  align-items: flex-end;
  padding: 4px 24px;
  background-color: $c-highlight-bg;

  p {
    font-size: 14px;
    font-weight: lighter;

    color: $c-highlight-text;
  }
}
</style>
