import actions from '../constants/redux-actions.js'

const { ADD_ITEM } = actions

/**
 * 
 * @typedef NewItemData
 * @property {String} name
 * @property {Number} price
 */

/**
 * 
 * @typedef RemoveItemData
 * @property {String} id
 */

/**
 * 
 * @param {NewItemData} data
 */
export function addItem(data) {
    return { type: ADD_ITEM, data }
}
