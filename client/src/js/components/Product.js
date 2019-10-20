import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import Map from './Map/MapContainer'

function Product() {
    const [data, setData] = useState([])
    const history = useHistory()
    const params = useParams()
    /** @type {String} */
    const productName = params.name
    // const list = data.filter(item => item.name.toLowerCase() === productName.toLowerCase()).map(item => (
    //     <div key={item._id}>
    //         <h3>{item.name}</h3>
    //         {item.price}
    //     </div>
    // ))
    const foodObj = data.reduce((listsObj, currentItem) => {
        if (currentItem.name.toLowerCase() === productName.toLowerCase()) {
            listsObj.divArray.push((
                <div key={currentItem._id}>
                    <h3>{currentItem.name}</h3>
                    {currentItem.price}
                </div>
            ))
            listsObj.itemsObj.push(currentItem)
        }
        return listsObj
    }, {
        divArray: [],
        itemsObj: []
    })

    const list = foodObj.divArray
    const listObj = foodObj.itemsObj // for the map

    useEffect(() => {
        if (data.length > 0) {
            return
        }
        fetch('/api/foods/search?longitude=-73.984739&latitude=40.740582&range=2').then(res => {
            if (res.status !== 200) {
                throw new Error(`Non-200 status code ${res.status}`)
            }
            return res.json()
        }).then(data => {
            console.log(data)
            if (data.msg && data.msg.includes('No food')) {
                return
            } else {
                setData(data)
            }
        }).catch(console.error)
    })

    return (
        <div>
            Product Page
            <Menu>
                <Menu.Item name='home' onClick={e => history.push('/')}>
                    Home
                </Menu.Item>
                <Menu.Item name='categories'>
                    Categories
                </Menu.Item>
            </Menu>
            {list.length === 0 ? 'Nothing' : list}
            <Map listOfFood={listObj.length === 0 ? [] : listObj} />
        </div>
    )
}

export default Product
