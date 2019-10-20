import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Menu, Input, Button, List } from 'semantic-ui-react'
import styled from 'styled-components'
import Map from './Map/MapContainer'

const Centered = styled.div`
    display: flex;
    justify-content: center;
`

const ListWrapper = styled.div`
    display: flex;
    padding: 40px 60px;
    > div:first-child {
        font-size: 120%;
    }
`

function Product() {
    const [ data, setData ] = useState([])
    const [ search ] = useState('')
    const [ searchValue, setSearchValue ] = useState('')
    const history = useHistory()
    const params = useParams()
    /** @type {String} */
    const productName = search || params.name

    const filtered = data.filter(item => item.name.toLowerCase() === productName.toLowerCase())

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
            if (data.msg && data.msg.includes('No food')) {
                return
            } else {
                console.log(data)
                setData(data)
            }
        }).catch(console.error)
    })

    return (
        <div>
            <Menu>
                <Menu.Item name='home' onClick={e => history.push('/')}>
                    Home
                </Menu.Item>
                <Menu.Item name='categories'>
                    Categories
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input placeholder='Search...' value={searchValue}  onChange={e => setSearchValue(e.target.value)} onKeyDown={e => {
                            if (e.key === 'Enter') {
                                history.push(`/product/${searchValue}`)
                                setSearchValue('')
                            }
                        }} />
                        <Button style={{ marginLeft: '5px' }} icon='search' onClick={e => {
                            history.push(`/product/${searchValue}`)
                            setSearchValue('')
                        }} />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Centered>
                <h1>{productName}</h1>
            </Centered>
            <ListWrapper>
                <List>
                    {filtered.map((item, index) => (
                        <List.Item key={item._id}>
                            <List.Icon name='marker' />
                            <List.Content>
                                <List.Header as='a'>{index}</List.Header>
                                <List.Description>
                                    Location: {item.latitude}, {item.longitude}
                                    <br />
                                    Price: {item.price}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
                { filtered.length === 0 ? <h2>No results available</h2> : <Map listOfFood={filtered.length === 0 ? [] : filtered} /> }
            </ListWrapper>
        </div>
    )
}

export default Product
