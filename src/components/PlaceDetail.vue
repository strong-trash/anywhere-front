<template>
  <div v-if="suggestion" class="place-detail">
    <article class="info-container">
      <h3>장소 정보</h3>
      <div class="name-wrap">
        <p class="name">{{ suggestion.place_name }}</p>
        <a :href="suggestion.url" target="_blank">
          <rounded-btn :imgsrc="img.map" :btntext="'카카오지도'" :handler="dummyHandler" />
        </a>
      </div>
      <div class="features">
        <p class="detailed-category">
          <span class="feature-emoji">🔖</span><span class="feature-name">세부 종류 </span>
          {{ suggestion.category }}
        </p>
        <p class="addr">
          <span class="feature-emoji">📍</span><span class="feature-name">주소 </span>
          {{ suggestion.addr }}
        </p>
        <p class="phone">
          <span class="feature-emoji">📞</span><span class="feature-name">연락처 </span>
          {{ suggestion.phone }}
        </p>
      </div>
      <div class="iframe-wrap">
        <iframe class="iframe-kakaomap" v-bind:src="kakaomapUrl"> </iframe>
      </div>
    </article>

    <article class="articles-container">
      <h3>후기</h3>
      <rounded-btn :imgsrc="img.write" :btntext="'후기 쓰기'" :handler="dummyHandler" />

      <article>
        <article-row :article-title="`타이틀`" :article-created-at="`2022-11-03`" />
        <article-row :article-title="`타이틀`" :article-created-at="`2022-11-03`" />
        <article-row :article-title="`타이틀`" :article-created-at="`2022-11-03`" />
        <article-row :article-title="`타이틀`" :article-created-at="`2022-11-03`" />
        <article-row :article-title="`타이틀`" :article-created-at="`2022-11-03`" />
        <article-row :article-title="`타이틀`" :article-created-at="`2022-11-03`" />
        <article-row :article-title="`타이틀`" :article-created-at="`2022-11-03`" />
        <article-row :article-title="`타이틀`" :article-created-at="`2022-11-03`" />
      </article>
    </article>
  </div>
</template>

<script>
import MapIcon from "@/assets/map.png";
import WriteIcon from "@/assets/write.png";
import RoundedBtn from "@/components/RoundedBtn.vue";
import ArticleRow from "@/components/ArticleRow.vue";

export default {
  props: {
    suggestion: Object,
  },
  components: {
    "rounded-btn": RoundedBtn,
    "article-row": ArticleRow,
  },
  data() {
    return {
      img: {
        map: MapIcon,
        write: WriteIcon,
      },
    };
  },
  computed: {
    kakaomapUrl: function () {
      console.log(this);
      if (!this.suggestion || !this.suggestion.url) return null;

      const splitted = this.suggestion.url.split("com/");
      const newUrl = splitted[0] + "com/m/" + splitted[1];
      console.log(newUrl);
      return newUrl;
    },
  },
  methods: {
    dummyHandler: function () {},
  },
};
</script>

<style lang="scss">
.place-detail {
  max-height: calc(100% - 36px);
  height: calc(100% - 36px);
  padding: 20px;

  display: flex;

  .info-container,
  .articles-container {
    height: 100%;
    padding: 0 24px;

    overflow: auto;
    h3 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
    }
  }

  .info-container {
    width: 60%;
    height: 100%;
    .name-wrap {
      display: flex;

      .name {
        text-align: center;
        font-size: 20px;
        flex: 1;
      }
      button {
        margin: 0;
        margin-left: auto;
        img {
          width: 18px;
          height: auto;
          margin-right: 4px;
        }
      }
    }

    .features {
      font-size: 18px;
      p {
        margin: 12px 0;
        // font-size: 16px;
      }
      .feature-emoji {
        display: inline-block;
        text-align: center;
        width: 32px;
      }
      .feature-name {
        font-weight: bold;
      }
    }

    .iframe-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      .iframe-kakaomap {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  .articles-container {
    width: 40%;
    border-left: 2px dashed lightgrey;

    button {
      img {
        width: 18px;
        height: auto;
        margin-right: 2px;
      }
    }
  }
}

@media (max-width: 768px) {
  .place-detail {
    flex-direction: column;
    padding: 10px;
    .info-container,
    .articles-container {
      width: 100%;
      padding: 12px 0;
    }

    .articles-container {
      border-left: none;
      border-top: 2px dashed lightgrey;
    }
  }
}
</style>
