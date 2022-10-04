/*
 * 무슨 파일인가요? : vue-router에 대한 설정파일입니다.
 * 어디서 사용하나요? : src/main.js에서 불러와 div#app에 mount하기 전 router설정값으로 사용합니다.
 * 무슨 일을 하나요? : src/App.vue 컴포넌트의 <router-view>에 표시될 페이지(컴포넌트)를 Path에 따라 결정합니다.
 */

import Vue from "vue";
import VueRouter from "vue-router";

import LandingPage from "./pages/LandingPage.vue";
import MasilPage from "./pages/MasilPage.vue";
import ReviewPage from "./pages/ReviewPage.vue";
import TimelinePage from "./pages/TimelinePage.vue";
import ErrorPage from "./pages/ErrorPage.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  //mode: "history",
  routes: [
    { path: "/", component: LandingPage },
    { path: "/masil", component: MasilPage },
    { path: "/Review", component: ReviewPage },
    { path: "/Timeline", component: TimelinePage },
    { path: "*", component: ErrorPage },
  ],
});

export default router;
