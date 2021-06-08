import Axios from 'axios'

const state = () => ({
    getUsers: {},
    isUser: {},
});

const getters = {
    getUsers(state) {
        return state.getUsers
    },
    isUser(state) {
        return state.isUser
    },
};

const actions = {
    getUsers(context) {
        Axios.get(Axios.defaults.baseURL + 'panel/user').then(res => {
            const getUsers = res.data.data.data;
            context.commit('getUsers', getUsers);
        }).catch(err => {
            console.log(err)
        })
    },
    showUser(context, payload) {
        const userId = payload.id;
        const users = context.state.getUsers;
        console.log(users[3].id);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                const isUser = users[i];
                context.commit('isUser', isUser);
            }
        }
    },
    editUser(context, payload) {
        const userId = payload.id;
        const users = context.state.getUsers;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                const isUser = users[i];
                context.commit('isUser', isUser);
            }
        }
    },
    isUserUpdate(context, payload) {
        const isUpdate = {
            id: payload.id,
            first_name: payload.first_name,
            last_name: payload.last_name,
            username: payload.username,
            email: payload.email,
            mobile: payload.mobile,
            home_phone: payload.home_phone,
            zip_code: payload.zip_code,
            password: payload.password,
            confirmation_password: payload.confirmation_password,
            home_address:payload.home_address,
            work_address: payload.work_address,
        };
        Axios.patch(Axios.defaults.baseURL + 'panel/user/' + payload.id, isUpdate)
            .then(res => {
            const getUsers = res.data.data.data;
            context.commit('getUsers', getUsers);
        }).catch(err => {
            console.log(err)
        })
    },
    deleteUser(context, payload) {
        state.isUser = payload.id;
        const id = payload.id;
        Axios.delete(Axios.defaults.baseURL + 'panel/user/' + id)
            .then(() => {
                /*let idx = user.indexOf(id)
                const getUsers = state.getUsers.splice(idx,1)*/
                //context.commit('deleteUser', getUsers);
            }).catch(err => {
            console.log(err)
        })
    },
};

const mutations = {
    isUser(state, payload) {
        state.isUser = payload
    },
    getUsers(state, payload) {
        state.getUsers = payload
    },
    showUser(state, payload) {
        state.isUser = payload
    },
    editUser(state, payload) {
        state.isUser = payload
    },
    deleteUser(state, payload) {
        state.getUsers = payload
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
