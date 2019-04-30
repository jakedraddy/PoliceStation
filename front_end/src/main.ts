import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import Login from "./components/Login.vue";
import About from "./components/About.vue";
import MainPage from "./components/MainPage.vue";
import ViewEmployees from "./components/ViewEmployees.vue";
import ViewPerson from "./components/ViewPerson.vue";
import ViewCases from "./components/ViewCases.vue";

import CreatePerson from "./components/CreatePerson.vue";

const routes: any[] = [
  { path: "/", component: Login },
  { path: "/about", component: About },
  { path: "/main", component: MainPage },
  { path: "/employees", component: ViewEmployees },
  { path: "/employee/:person_id", component: ViewPerson },
  { path: "/cases", component: ViewCases },
  { path: "/main/person/CreatePerson", component: CreatePerson },
  // { path: "/", component: Login },
  // { path: "/", component: Login },
  // { path: "/", component: Login },
];

const router = new VueRouter({
  routes, // short for routes: routes
  mode: "history"
});

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  data() {
    return {
      user: null
    };
  },
  router
}).$mount("#app");
