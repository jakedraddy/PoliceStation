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
import ViewPeople from "./components/ViewPeople.vue";
import ViewPerson from "./components/ViewPerson.vue";
import ViewEmployees from "./components/ViewEmployees.vue";
import ViewVisits from "./components/ViewVisits.vue";
import ViewArrests from "./components/ViewArrests.vue";
import ViewCases from "./components/ViewCases.vue";
import ViewForensics from "./components/ViewForensics.vue";

//import CreatePerson from "./components/CreatePerson.vue";
import CreateArrest from "./components/CreateArrest.vue";
import CreateCase from "./components/CreateCase.vue";
import CreateTest from "./components/CreateTest.vue";

const routes: any[] = [
  { path: "/", component: Login },
  { path: "/about", component: About },
  { path: "/main", component: MainPage },
  { path: "/main/People", component: ViewPeople},
  { path: "/main/People/add", name: "addPerson", component: ViewPerson },
  { path: "/main/People/view/:person_id", name: "viewPerson", component: ViewPerson },
  { path: "/main/Employees", component: ViewEmployees },
  { path: "/main/Visits", component: ViewVisits },
  { path: "/main/Visits/add", component: MainPage },//needs Comp
  { path: "/main/Arrests", component: ViewArrests },
  { path: "/main/Arrests/add", component: CreateArrest },//needs Comp
  { path: "/main/Cases", component: ViewCases },
  { path: "/main/Cases/edit", name: "inspectCase", component: CreateCase},
  { path: "/main/Cases/add", component: CreateCase },
  { path: "/main/ForensicTests", component: ViewForensics },
  { path: "/main/ForensicTests/edit", name: "inspectTest", component: CreateTest },
  { path: "/main/ForensicTests/add", component: MainPage },//needs Comp
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
