import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex);
Axios.defaults.baseURL = 'http://localhost:3001/api/';
//Vue.prototype.$http = Axios;

import Auth from './modules/auth';
import Users from './modules/users';
import Employees from './modules/employees';
import Products from './modules/products';
import ProductCategories from './modules/productCategories';
import Articles from './modules/articles';
import ArticleCategories from './modules/articleCategories';
import Brands from './modules/brands';
import Carts from './modules/carts';

const employeeToken = window.localStorage.getItem('token-employee');
const userToken = window.localStorage.getItem('token-user');

if (employeeToken !== null && employeeToken !== undefined) {
  Axios.defaults.headers.common.Authorization = `Bearer ${employeeToken}`;
  Axios.defaults.headers.common.Accept = 'Application/json';
  Axios.defaults.headers.common['X-Requested-With'] = 'XmlHttpRequest';
}

if (userToken !== null && userToken !== undefined) {
  Axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;
  Axios.defaults.headers.common.Accept = 'Application/json';
  Axios.defaults.headers.common['X-Requested-With'] = 'XmlHttpRequest';
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
