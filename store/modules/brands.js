import Axios from 'axios'

const state = () => ({
    isBrands: {},
    getBrands: {},
    popularBrands: {},
});

const getters = {
    isBrands(state) {
        return state.isBrands
    },
    getBrands(state) {
        return state.getBrands
    },
    popularBrands(state) {
        return state.popularBrands
    },
};

const actions = {
    isBrands(context) {
        Axios.get(Axios.defaults.baseURL + 'brands', {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token-employee'),
                Accept: 'Application/json',
            }
        })
            .then(res => {
                const isBrands = res.data.data.brands;
                const popularBrands = res.data.data.popular_brands;
                context.commit('isBrands', isBrands);
                context.commit('popularBrands', popularBrands)
            }).catch(err => {
            console.log(err)
        })
    },
    getBrands(context) {
        Axios.get(Axios.defaults.baseURL + 'panel/brands', {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token-employee'),
                Accept: 'Application/json',
            }
        })
            .then(res => {
                const getBrands = res.data.data;
                context.commit('getBrands', getBrands)
            }).catch(err => {
            console.log(err)
        })
    },
    RegisterBrand(context, payload) {
        const isRegister = {
            name: payload.name,
            employeeId: payload.employeeId,
            description: payload.description,
            status: payload.status,
        };
        Axios.post(Axios.defaults.baseURL + 'panel/brands/store', isRegister)
            .then(res => {
                const getBrands = res.data.data;
                context.commit('getBrands', getBrands)
            }).catch(err => {
            console.log(err)
        })
    }
};

const mutations = {
    isBrands(state, payload) {
        state.isBrands = payload
    },
    getBrands(state, payload) {
        state.getBrands = payload
    },
    popularBrands(state, payload) {
        state.popularBrands = payload
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
