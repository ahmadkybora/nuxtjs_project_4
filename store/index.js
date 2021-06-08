import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex);
Axios.defaults.baseURL = 'http://localhost:8000/api/';
Vue.prototype.$http = Axios;

import Auth from './modules/auth';
import Users from './modules/users';
import Employees from './modules/employees';
import Products from './modules/products';
import ProductCategories from './modules/productCategories';
import Articles from './modules/articles';
import ArticleCategories from './modules/articleCategories';
import Brands from './modules/brands';
import Carts from './modules/carts';

Axios.defaults.baseURL = 'http://localhost:8000/api/';
const employeeToken = window.localStorage.getItem('token-employee');
const userToken = window.localStorage.getItem('token-user');

if (employeeToken) {
  Axios.defaults.headers.common.Authorization = `Bearer ${employeeToken}`;
  Axios.defaults.headers.common['X-Requested-With'] = 'XmlHttpRequest';
  Axios.defaults.headers.common['Content-type'] = 'Application/json';
  Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
}

if (userToken) {
  Axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;
  Axios.defaults.headers.common['X-Requested-With'] = 'XmlHttpRequest';
  Axios.defaults.headers.common['Content-type'] = 'Application/json';
  Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
}

const createStore = () => {

  return new Vuex.Store({
    state: () => ({
/*      tokenEmployee: window.localStorage.getItem('token-employee'),
      tokenUser: window.localStorage.getItem('token-user'),*/
    }),
    actions: {},
    mutations: {},
    getters: {
/*      isAuthenticatedUser(state)
      {
        return state.tokenUser
      }*/
    },
    modules: {
      Auth,
      Users,
      Employees,
      Products,
      ProductCategories,
      Articles,
      ArticleCategories,
      Brands,
      Carts
    }
  })
};

export default createStore;