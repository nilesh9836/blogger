import PhotoService from '@/services/PhotoService'
import partials from '../partials'

export const namespaced = true

export const state = {
  photos: [],
  totalPhotos: 0,
  perPage: 9,
  page: 1,
  loadState: partials.LOAD_STATE.LOADING,
  orderBy: 'latest'
}

export const mutations = {
  SET_PHOTOS(state, photos) {
    state.photos.push(photos)
	localStorage.setItem('photos',JSON.stringify(state.photos));
  },
  SET_TOTAL_PHOTOS(state, total) {
    state.totalPhotos = total
  },
  SET_ORDER(state, order) {
    state.orderBy = order
  },
  SET_PAGE(state, page) {
    state.page = page
  },
  SET_LOAD_STATE(state, value) {
    state.loadState = value
  }
}

export const actions = {
  fetch({ commit, state }, { page, order }) {
    PhotoService.getPhotos({
      page: page,
      perPage: state.perPage,
      orderBy: order
    })
      .then(response => {
        commit('SET_PHOTOS', response.data)
        commit('SET_TOTAL_PHOTOS', response.headers['x-total'])
        commit('SET_PAGE', page)
        commit('SET_ORDER', order)
        commit('SET_LOAD_STATE', partials.LOAD_STATE.SUCCESS)
      })
      .catch(error => {
        commit('SET_LOAD_STATE', partials.LOAD_STATE.ERROR)
        console.log('Error: ' + error.response.data.errors[0])
      })
  }
}
