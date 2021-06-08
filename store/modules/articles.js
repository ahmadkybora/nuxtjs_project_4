import Axios from 'axios'

const state = () => ({
    isArticles: {},
    isArticle: {},
    getArticles: {},
    popularArticles: {},
});

const getters = {
    isArticles (state) {
        return state.isArticles
    },
    getArticles (state) {
        return state.getArticles
    },
    popularArticles (state) {
        return state.popularArticles
    },
};

const actions = {
    isArticles (context) {
        Axios.get(Axios.defaults.baseURL + 'articles').then(res => {
            const isArticles = res.data.data.articles;
            const popularArticles = res.data.data.popular_articles;
            context.commit('isArticles', isArticles);
            context.commit('popularArticles', popularArticles)
        }).catch(err => {
            console.log(err)
        })
    },
    getArticles (context) {
        Axios.get(Axios.defaults.baseURL + 'panel/articles').then(res => {
            const getArticles = res.data.data.data;
            context.commit('getArticles', getArticles)
        }).catch(err => {
            console.log(err)
        })
    },
    showArticle (context, payload) {
        const articleId = payload.article.id;
        const articles = context.state.getArticles;
        console.log(articles[3].id);
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].id === articleId) {
                const isArticle = articles[i];
                context.commit('isArticle', isArticle);
            }
        }
    }
};

const mutations = {
    isArticles (state, payload) {
        state.isArticles = payload
    },
    isArticle (state, payload) {
        state.isArticle = payload
    },
    getArticles (state, payload) {
        state.getArticles = payload
    },
    popularArticles (state, payload) {
        state.popularArticles = payload
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
