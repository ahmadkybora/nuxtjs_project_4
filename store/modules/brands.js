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
    async RegisterBrand(context, payload) {
        let formData = new FormData();

        formData.append('name', payload.name);
        formData.append('employeeId', payload.employeeId);
        formData.append('description', payload.description);
        formData.append('status', payload.status);
        formData.append('image', payload.image);

        /*const isRegister = {
            name: payload.name,
            employeeId: payload.employeeId,
            description: payload.description,
            status: payload.status,
            image: payload.image
        };*/
            await Axios.post(Axios.defaults.baseURL + 'panel/brands/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
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
