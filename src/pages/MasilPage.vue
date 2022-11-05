<template>
  <div id="masil-page">
    <masil-maps
      v-on:showMsgCard="showMessageCard"
      v-on:hideMsgCard="hideMessageCard"
      v-on:requestPlace="requestPlace"
      v-on:mapsActionChange="deactivateSlideWindow"
      :suggestion="suggestedPlace"
    ></masil-maps>
    <message-card :msg="msgCard.msg" :active="msgCard.isActive"></message-card>
    <bottom-dialog :active="slideWindow.isActive">
      <place-detail :suggestion="suggestedPlace" />
    </bottom-dialog>
  </div>
</template>

<script>
import { GET } from "@/assets/request.js";

import MasilMaps from "@/components/MasilMaps.vue";

import BottomDialog from "@/components/BottomDialog.vue";
import PlaceDetail from "@/components/PlaceDetail";
import MessageCard from "@/components/MessageCard.vue";

export default {
  components: {
    "message-card": MessageCard,
    "masil-maps": MasilMaps,
    "bottom-dialog": BottomDialog,
    "place-detail": PlaceDetail,
  },
  data: function () {
    return {
      suggestedPlace: null,
      msgCard: {
        msg: "",
        isActive: false,
      },
      slideWindow: {
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
    deactivateSlideWindow: function () {
      this.slideWindow.isActive = false;
    },
    activateSlideWindow: function () {
      this.slideWindow.isActive = true;
    },
    requestPlace: async function (body) {
      const vm = this;

      const res = await GET.place(body);
      if (!res) return;

      vm.suggestedPlace = res;
      vm.activateSlideWindow();
    },
  },
};
</script>

<style lang="scss">
#masil-page {
  flex: 1;
  overflow-y: hidden;
}
</style>
