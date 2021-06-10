import Axios from 'axios'
import Swal from "sweetalert2";

window.Swal = Swal;

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

    async isBrands(context) {
        await Axios.get(Axios.defaults.baseURL + 'brands')
            .then(res => {
                const isBrands = res.data.data.brands;
                const popularBrands = res.data.data.popular_brands;
                context.commit('isBrands', isBrands);
                context.commit('popularBrands', popularBrands)
            }).catch(err => {
                console.log(err)
            })
    },

    async getBrands(context) {
        await Axios.get(Axios.defaults.baseURL + 'panel/brands')
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

        await Axios.post(Axios.defaults.baseURL + 'panel/brands/store', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then(res => {
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getBrands = res.data.data;
                                context.commit('getBrands', getBrands);
                                this.$router.push('/panel/brands');
                            });
                        break;
                    case 403:
                        Swal.fire('Warning!', res.data.message, 'warning')
                            .then(() => {

                            });
                        break;
                    case 422:
                        alert("ok");
                        Swal.fire('Error!', 'whooops', 'error')
                            .then(() => {

                            });
                        break;
                    case 503:
                        Swal.fire('Danger!', 'Service is Unavailable', 'error');
                        break;
                    default:
                        Swal.fire('Warning!', 'Your Basic Information', 'warning');
                        break;
                }
            }).catch(err => {
                switch (err.response.status) {
                    case 422:
                        for (let i = 0; i < err.response.data.errors.length; i++) {
                            Swal.fire('Warning!', err.response.data.errors[i].message, 'warning')
                                .then(() => {

                                });
                        }
                        break;
                    case 503:
                        for (let i = 0; i < err.response.data.errors.length; i++) {
                            Swal.fire('Warning!', err.response.data.errors[i].message, 'warning')
                                .then(() => {

                                });
                        }
                        break;
                    default:
                        Swal.fire('Warning!', 'Your Basic Information', 'warning');
                        break;
                }
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
