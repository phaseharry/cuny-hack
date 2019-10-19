import actions from '../constants/redux-actions.js'

const { ADD_ITEM } = actions

export function addItem(data) {
    return { type: ADD_ITEM, data }
}
