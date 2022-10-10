<template>
  <div id="masil-page">
    <masil-maps
      v-on:showMsgCard="showMessageCard"
      v-on:hideMsgCard="hideMessageCard"
      v-on:requestPlace="requestPlace"
      :suggestion="suggestedPlace"
    ></masil-maps>
    <message-card :msg="msgCard.msg" :active="msgCard.isActive"></message-card>
  </div>
</template>

<script>
import { apiRequestURL } from "@/assets/variables.js";
import MasilMaps from "@/components/MasilMaps.vue";
import MessageCard from "@/components/MessageCard.vue";

export default {
  components: {
    "message-card": MessageCard,
    "masil-maps": MasilMaps,
  },
  data: function () {
    return {
      suggestedPlace: null,
      msgCard: {
        msg: "",
        isActive: false,
      },
    };
  },
  methods: {
    showMessageCard: function (_msg) {
      this.msgCard = {
        msg: _msg,
        isActive: true,
      };
    },
    hideMessageCard: function () {
      this.msgCard = {
        ...this.msgCard,
        isActive: false,
      };
    },

    requestPlace: async function (body) {
      const vm = this;

      const url = apiRequestURL.placeByUserinput;
      console.log(url, body);
      // const res = await axios.get(url, body);

      const DUMMY_RES = {
        x: 37.5507377,
        y: 127.0742838,
        place_name: "테스트응답장소",
      };
      vm.suggestedPlace = DUMMY_RES;
    },
  },
};
</script>

<style lang="scss">
#masil-page {
  flex: 1;
}
</style>
