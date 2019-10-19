import actions from '../constants/redux-actions.js'

const initialState = {
    listings: []
}

/**
 * Root reducer
 * @param {Object} state 
 * @param {Object} action 
 * @param {String} action.type
 * @param {*} action.data
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
     * @param {Object} data
     * @param {Object} data.name
     * @param {Object} data.price
     */
    [actions.ADD_ITEM]: (state, data) => {
        return { ...state, listings: [ ...state.listings, data ] }
    }
}

export default reduce
