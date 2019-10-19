import actions from '../constants/redux-actions.js'

const initialState = {
    listings: []
}

/**
 * @typedef ActionPayload
 * @property {String} type
 * @param {*} data
 */

/**
 * Root reducer
 * @param {Object} state 
 * @param {ActionPayload} action 
 */
function reduce(state = initialState, action) {
    const reducerFunc = reducers[action.type]
    if (!reducerFunc) {
        return state
    }
    return reducerFunc(state, action.data)
}

const reducers = {
    /**
     * @param {Object} state
     * @param {import('../actions/index.js').NewItemData} data
     */
    [actions.ADD_ITEM]: (state, data) => {
        return { ...state, listings: [ ...state.listings, data ] }
    },
    /**
     * @param {Object} state
     * @param {import('../actions/index.js').InitialLoad} data
     */
    [actions.INITIALIZE_STATE]: (state, data) => {
        return { ...state, listings: data.listings }
    }
}

export default reduce
