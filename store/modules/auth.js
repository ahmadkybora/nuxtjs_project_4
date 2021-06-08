import Axios from 'axios'

/*Axios.defaults.baseURL = 'http://localhost:3001/api/';
const employeeToken = window.localStorage.getItem('token-employee');
const userToken = window.localStorage.getItem('user-token');

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
}*/

const state = () => ({
  tokenEmployee: window.localStorage.getItem('token-employee'),
  tokenUser: window.localStorage.getItem('token-user'),
  isUser: window.localStorage.getItem('is-user'),
  is_employee: window.localStorage.getItem('is-employee'),
  isEmployee: window.localStorage.getItem('is-admin'),
  isEmployeeLogin: {
    first_name: '',
    last_name: '',
    username: '',
  },
  isEmployeeRegister: {},
  isUserLogin: {
    first_name: '',
    last_name: '',
    username: '',
  },
  isUserRegister: {},
});

const getters = {
  isAuthenticatedUser(state) {
    return state.tokenUser
  },
  isAuthenticatedEmployee(state) {
    return state.tokenEmployee
  },
  fullNameUser(state) {
    return state.isUserLogin.first_name + ' ' + state.isUserLogin.last_name;
  },
  fullNameEmployee(state) {
    return state.isEmployeeLogin.first_name + ' ' + state.isEmployeeLogin.last_name;
  }
};

const actions = {
  isEmployeeRegister(context, payload) {
    const register = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      username: payload.username,
      email: payload.email,
      mobile: payload.mobile,
      home_phone: payload.home_phone,
      zip_code: payload.zip_code,
      password: payload.password,
      home_address: payload.home_address,
      work_address: payload.work_address,
    };
    Axios.post(Axios.defaults.baseURL + 'register', register)
      .then(res => {
        const isRegister = res.data.data.data;
        context.commit('isRegister', isRegister);
      });

  },
  isEmployeeLogin(context, payload) {
    const login = {
      username: payload.username,
      password: payload.password,
    };
    Axios.post(Axios.defaults.baseURL + 'login', login)
      .then(res => {
        const employee = res.data.data;
        const tokenEmployee = employee.accessToken;
        const isLogin = {
          username: employee.username,
          first_name: employee.first_name,
          last_name: employee.last_name,
        };
        context.state.isEmployeeLogin.first_name = employee.first_name;
        context.state.isEmployeeLogin.last_name = employee.last_name;
        context.state.isEmployeeLogin.username = employee.username;

        let is_employee = isLogin.first_name + ' ' + isLogin.last_name;
        let is_admin = isLogin.username;

        window.localStorage.setItem('token-employee', tokenEmployee);
        window.localStorage.setItem('is-admin', is_admin);
        window.localStorage.setItem('is-employee', is_employee);

        //window.localStorage.setItem('token-employee', JSON.stringify(isLogin));

        //if (JSON.parse(window.localStorage.getItem('token')) != null)
        if (window.localStorage.getItem('token-employee') != null && window.localStorage.getItem('is-admin') != null) {
          if (is_admin === 'admin') {
            this.$router.push('/panel/dashboard');
            //location.reload();
          } else {
            this.$router.push('/panel/dashboard');
            //location.reload();
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
  },
  isEmployeeLogout(context){
      window.localStorage.removeItem('token-employee');
      window.localStorage.removeItem('is-admin');
      window.location.reload();
    Axios.get(Axios.defaults.baseURL + 'panel/logout', {
      headers: {
        Authorization: 'Bearer ' + context.state.tokenEmployee,
      }
    })
        .then(() => {
          window.localStorage.removeItem('token-employee');
          window.localStorage.removeItem('is-admin');
          delete context.state.tokenEmployee;
          delete context.state.isEmployee;
          window.location.reload();
        })
        .catch(err => {
        })
  },
  isUserRegister(context, payload) {
    const register = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      username: payload.username,
      email: payload.email,
      mobile: payload.mobile,
      home_phone: payload.home_phone,
      zip_code: payload.zip_code,
      password: payload.password,
      home_address: payload.home_address,
      work_address: payload.work_address,
    };
    Axios.post(Axios.defaults.baseURL + 'register', register)
      .then(res => {
        const isRegister = res.data.data;
        context.commit('isRegister', isRegister);
      });

  },
  isUserLogin(context, payload) {
    const login = {
      username: payload.username,
      password: payload.password,
    };
    Axios.post(Axios.defaults.baseURL + 'login', login)
      .then(res => {
        const user = res.data.data;
        const tokenUser = user.accessToken;
        const isLogin = {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
        };
        context.state.isUserLogin.first_name = user.first_name;
        context.state.isUserLogin.last_name = user.last_name;

        let is_user = isLogin.first_name + ' ' + isLogin.last_name;
        window.localStorage.setItem('token-user', tokenUser);
        window.localStorage.setItem('is-user', is_user);

        if (window.localStorage.getItem('token-user') != null) {
          if (is_user)
          {
            this.$router.push('/');
            window.location.reload();
          }
          else
          {
            this.$router.push('/login');
            //location.reload();
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
  },
  isUserLogout(context)
  {
    Axios.get(Axios.defaults.baseURL + 'logout', {
      headers: {
        Authorization: 'Bearer ' + context.state.tokenUser,
      }
    })
        .then(() => {
          window.localStorage.removeItem('token-user');
          window.localStorage.removeItem('is-user');
          delete context.state.tokenUser;
          delete context.state.isUser;
          window.location.reload();
        })
        .catch(err => {
        })
  }
};

const mutations = {
  accessToken(state, payload) {
    state.token = payload.token
  },
  isEmployeeRegister(state, payload) {
    state.status = 'success';
    state.token = payload.token;
    state.user = payload.user;
  },
  isEmployeeLogin(state, payload) {
    state.isEmployeeLogin = payload;
  },
  isUserRegister(state, payload) {
    state.status = 'success';
    state.token = payload.token;
    state.user = payload.user;
  },
  isEmployeeLogout(state) {
    state.tokenEmployee = '';
  },
  isUserLogin(state, payload) {
    state.tokenUser = payload;
  },
  isUserLogout(state) {
    state.token = '';
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
