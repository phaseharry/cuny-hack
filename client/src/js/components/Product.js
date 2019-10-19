import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function Product() {
    const history = useHistory()

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
        </div>
    )
}

export default Product
