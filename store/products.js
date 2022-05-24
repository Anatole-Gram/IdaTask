
export const state = () => ({
    products: [],
    sort: ['sortByName', 'upCost', 'bottomCost'],
    apiUrl: 'http://project-lucy.fun/api/products/',
});
export const actions = {
    async getJson({ state }, payload) {
        const response = await fetch(new URL(state.apiUrl + payload.url), payload.data);
        const data = await response.json();
        return data
    },
    async getData({ dispatch, commit }) {
        const products = await dispatch('getJson', { url: '', data: { method: 'GET' } });
        commit('setProducts', products)
    },
    async addProduct({ dispatch, commit }, product) {
        const newProduct = await dispatch('getJson', {
            url: 'add',
            data: {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            }
        })
        commit('addProduct', newProduct)

    },
    async rmProduct({ dispatch, commit }, payload) {
        await dispatch('getJson', { url: `rm?id=${payload.id}`, data: { method: 'DELETE' } })
        commit('delProduct', payload.idx)
    },
    sortProducts({ state, commit }, sortPos) {
        commit(`${state.sort[sortPos]}`);
    }
};
export const mutations = {
    setProducts(state, products) {
        state.products = products;
    },
    addProduct(state, product) {
        state.products.push(product)
    },
    delProduct(state, idx) {
        state.products.splice(idx, 1)
    },
    sortByName(state) {
        state.products.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    },
    upCost(state) {
        state.products.sort((a, b) => a.cost - b.cost)
    },
    bottomCost(state) {
        state.products.sort((a, b) => b.cost - a.cost)
    }

};
export const getters = {
    products(state) {
        return state.products;
    }
};
