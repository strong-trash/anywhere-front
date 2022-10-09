<template>
  <div id="message-card" :class="{ inactive: !active, active: active }">
    <div class="hr-line"></div>
    <p>{{ msg }}</p>
    <div class="hr-line"></div>
  </div>
</template>

<script>
export default {
  props: ["msg", "active"],
  data: function () {
    return {};
  },
};
</script>

<style lang="scss">
#message-card {
  position: fixed;
  z-index: 997;
  bottom: 32px;
  left: 50%;

  display: flex;
  align-items: center;
  width: 100%;

  transform: translateX(-50%);

  p {
    padding: 18px 12px;
    white-space: nowrap;
    border-radius: 12px;
    border: 3px solid #b39cd0;
    color: #845ec2;
    font-size: 16px;
    background-color: white;
  }
}

#message-card.inactive {
  filter: opacity(0);

  transition: all 0.5s;
  pointer-events: none;
}
#message-card.active {
  filter: opacity(1);
  transition: all 0.5s;
}
.hr-line {
  content: "";
  flex-grow: 1;
  background: #b39cd0;
  height: 3px;
  width: 50px;
  line-height: 0;
}
</style>
