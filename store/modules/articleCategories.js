import Axios from 'axios'

const state = () => ({
    isArticleCategories: {},
    getArticleCategories: {},
    popularArticleCategories: {},
});

const getters = {
    isArticleCategories(state) {
        return state.isArticleCategories
    },
    getArticleCategories(state) {
        return state.getArticleCategories
    },
    popularArticleCategories(state) {
        return state.popularArticleCategories
    },
};

const actions = {
    isArticleCategories(context) {
        Axios.get(Axios.defaults.baseURL + 'article')
            .then(res => {
                const isArticleCategories = res.data.data.articles;
                const popularArticleCategories = res.data.data.popular_articles;
                context.commit('isArticleCategories', isArticleCategories);
                context.commit('popularArticleCategories', popularArticleCategories)
            }).catch(err => {
            console.log(err)
        })
    },
    getArticleCategories(context) {
        Axios.get(Axios.defaults.baseURL + 'panel/article/category')
            .then(res => {
                const getArticleCategories = res.data.data.data;
                context.commit('getArticleCategories', getArticleCategories)
            }).catch(err => {
            console.log(err)
        })
    },
};

const mutations = {
    isArticleCategories(state, payload) {
        state.isArticleCategories = payload
    },
    getArticleCategories(state, payload) {
        state.getArticleCategories = payload
    },
    popularArticleCategories(state, payload) {
        state.popularArticleCategories = payload
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
