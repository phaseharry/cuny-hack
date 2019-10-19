import actions from '../constants/redux-actions.js'

const { ADD_ITEM, INITIALIZE_STATE, REMOVE_ITEM } = actions

/**
 * @typedef InitialLoad
 * @property {Object[]} listings
 */

/**
 * @param {InitialLoad} data 
 */
export function initState(data) {
    return { type: INITIALIZE_STATE, data }
}

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
  * @param {RemoveItemData} data
  */
export function removeItem(data) {
    return { type: REMOVE_ITEM, data}
}

/**
 * 
 * @param {NewItemData} data
 */
export function addItem(data) {
    return { type: ADD_ITEM, data }
}
