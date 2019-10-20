import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Menu, Input, Button, List, Loader } from 'semantic-ui-react'
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
        padding-right: 40px;
    }
`

const LoaderWrapper = styled(Centered)`
    margin: 40px;
`

/**
 * @param {Object} coordinates 
 * @param {Number} coordinates.latitude
 * @param {Number} coordinates.longitude
 */
function formatCoordinatesForMaps(coordinates) {
    return coordinates ? `${coordinates.latitude},${coordinates.longitude}` : ''
}

function Product() {
    const [ data, setData ] = useState([])
    const [ search ] = useState('')
    const [ searchValue, setSearchValue ] = useState('')
    const [ gpsLocation, setGpsLocation ] = useState()
    const [ loading, setLoading ] = useState(true)
    const history = useHistory()
    const params = useParams()
    /** @type {String} */
    const productName = search || params.name

    const filtered = data.filter(item => item.name.toLowerCase() === productName.toLowerCase())

    useEffect(() => {
        if (gpsLocation) {
            return
        }
        navigator.geolocation.getCurrentPosition(function(position) {
            setGpsLocation(position.coords)
        })
    })
    useEffect(() => {
        if (data.length > 0 || !gpsLocation) {
            return
        }
        setLoading(true)
        fetch(`/api/foods/search?longitude=${gpsLocation.longitude}&latitude=${gpsLocation.latitude}&range=2`).then(res => {
            setLoading(false)
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

    const bodyData = loading
        ? <LoaderWrapper><h1>Loading...</h1></LoaderWrapper>
        : <div>
        <Centered>
            <h1>{productName}</h1>
        </Centered>
        <ListWrapper>
            <List>
                {filtered.map((item, index) => (
                    <List.Item key={item._id} style={{ paddingBottom: '15px' }}>
                        <List.Icon name='marker' />
                        <List.Content>
                            <List.Header as='a'>{index}</List.Header>
                            <List.Description>
                                Location: {item.latitude}, {item.longitude}
                                <br />
                                Price: {item.price}
                                <br /> <br />
                                <Button color='twitter' content='Directions' size='big' fluid onClick={e => window.open(`https://www.google.com/maps/dir/?api=1&origin=${formatCoordinatesForMaps(gpsLocation)}&destination=${formatCoordinatesForMaps(item)}`)} />
                            </List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
            { filtered.length === 0 ? <h2>No results available</h2> : <Map currentPos={gpsLocation} listOfFood={filtered.length === 0 ? [] : filtered} /> }
        </ListWrapper>
    </div>

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
            {bodyData}
        </div>
    )
}

export default Product
