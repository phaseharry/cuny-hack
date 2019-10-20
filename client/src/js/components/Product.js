import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Menu, Input, Button, Card } from 'semantic-ui-react'
import styled from 'styled-components'
import Map from './Map/MapContainer'
const MAX_PER_PAGE = 4
const Centered = styled.div`
    display: flex;
    justify-content: center;
`

const ListWrapper = styled.div`
    display: flex;
    padding: 40px 60px;
    > div:first-child {
        margin-right: 30px;
        max-width: 350px;
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
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ loading, setLoading ] = useState(true)
    const history = useHistory()
    const params = useParams()
    /** @type {String} */
    const productName = search || params.name

    const filtered = data.filter(item => item.name.toLowerCase() === productName.toLowerCase())
    const pages = []
    const tempPage = []
    for (const item of filtered) {
        tempPage.push(item)
        if (tempPage.length >= MAX_PER_PAGE) {
            pages.push([ ...tempPage ])
            tempPage.length = 0
        }
    }
    if (tempPage.length > 0) {
        pages.push(tempPage)
    }
    console.log(pages)

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
    }, [ data.length, gpsLocation ])

    const bodyData = loading
        ? <LoaderWrapper><h1>Loading...</h1></LoaderWrapper>
        : <div>
        <Centered>
            <h1>{productName}</h1>
        </Centered>
        <ListWrapper>
            <div>
                { !pages[currentPage] ? null : <Button.Group fluid style={{ marginBottom: '10px' }}>
                    <Button size='large' disabled={currentPage <= 0} onClick={e => currentPage <= 0 ? null : setCurrentPage(currentPage - 1)}>Previous</Button>
                    <Button.Or text={`${currentPage + 1}/${pages.length}`} />
                    <Button size='large' disabled={currentPage + 1 >= pages.length} onClick={e => currentPage + 1 >= pages.length ? null : setCurrentPage(currentPage + 1)}>Next</Button>
                </Button.Group>
                }
                <Card.Group>
                    {(pages[currentPage] || []).map((item, index) => (
                        <Card fluid key={item._id}>
                            <Card.Content>
                                <Card.Header>Result {index}</Card.Header>
                                <Card.Meta style={{ breakWord: 'all' }}>Location: {item.latitude}, {item.longitude}</Card.Meta>
                                <Card.Description>
                                ${item.price}0
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button color='twitter' content='Directions' size='large' fluid onClick={e => window.open(`https://www.google.com/maps/dir/?api=1&origin=${formatCoordinatesForMaps(gpsLocation)}&destination=${formatCoordinatesForMaps(item)}`)} />
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </div>
            { filtered.length === 0 ? <h2>No results available</h2> : <Map currentPos={gpsLocation} listOfFood={filtered.length === 0 ? [] : filtered} /> }
        </ListWrapper>
    </div>

    return (
        <div>
            <Menu size='massive'>
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
