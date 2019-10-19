import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function Product() {
    const [ data, setData ] = useState([])
    const history = useHistory()
    const params = useParams()
    /** @type {String} */
    const productName = params.name

    const list = data.filter(item => item.name.toLowerCase() === productName.toLowerCase()).map(item => (
        <div key={item._id}>
            <h3>{item.name}</h3>
            {item.price}
        </div>
    ))
    useEffect(() => {
        if (data.length > 0) {
            return
        }
        fetch('/api/foods/search?longitude=40.740582&latitude=73.984739&range=2').then(res => {
            if (res.status !== 200) {
              throw new Error(`Non-200 status code ${res.status}`)
            }
            return res.json()
        }).then(data => {
            setData(data)
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
        </div>
    )
}

export default Product
