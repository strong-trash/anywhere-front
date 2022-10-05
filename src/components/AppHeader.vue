<template>
  <div id="app-header">
    <nav>
      <router-link to="/">
        <div class="logo">
          <img :src="logoImg" alt="logo image" />
          <h1>어디로든</h1>
        </div>
      </router-link>
      <router-link to="/masil"><span class="nav-link">마실</span></router-link>
      <router-link to="/review"><span class="nav-link">후기</span></router-link>
      <router-link to="/timeline"><span class="nav-link">기록</span></router-link>
    </nav>
  </div>
</template>

<script>
import logoImg from "../assets/icon_hiker_black.png";
export default {
  data: function () {
    return {
      logoImg: logoImg,
      logoHovered: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss">
#app-header {
  nav {
    display: flex;
    align-items: center;
    padding: 6px 48px;
    background-color: white;
  }

  .logo {
    display: flex;
    align-items: center;
    padding: 4px;
    margin: 0 24px;

    img {
      width: auto;
      height: 36px;
    }
    h1 {
      font-size: 30px;
      font-family: "Gowun Batang", "Noto Sans KR";
      color: black;
    }
  }

  .nav-link {
    display: inline-block;
    padding: 8px;
    margin: 0 12px;

    font-size: 16px;
    color: black;
    border-radius: 8px;

    transition: all 0.1s;
  }
  .nav-link:hover {
    background-color: $c-highlight-bg;
    color: $c-highlight-text;
    transform: scale(1.2);
  }
  .nav-link:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    nav {
      justify-content: center;
      padding: 6px 6px;
    }
    .logo {
      margin: 0;
      h1 {
        font-size: 24px;
      }
    }
    .nav-link {
      margin: 0 6px;
      font-size: 14px;
    }
  }
}
</style>
