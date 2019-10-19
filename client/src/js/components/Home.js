import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../actions/index.js'
import { Menu, Search } from 'semantic-ui-react'
import styled from 'styled-components'
import logo from '../../InstaPrice Logos/logo.png';


const SearchWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px 10px;
`
const LogoStyle = styled.div`
     display: flex;
    justify-content: center;
    align-items: center;
`

function Home() {
    const [ inputName, setInputName ] = useState('')
    const [ inputPrice, setInputPrice ] = useState('')
    const [ searchInputName, setSearchInputName ] = useState('')
    /** @type {String[]} */
    const listings = useSelector(state => state.listings)
    const filteredListings = searchInputName ? listings.filter(item => item.name.toLowerCase().includes(searchInputName.toLowerCase())) : listings
    const dispatch = useDispatch()
    const foodNames = new Set()
    listings.forEach(item => {
        if (item.name.toLowerCase().includes(searchInputName.toLowerCase())) {
            foodNames.add(item.name)
        }
    })

    return <div>
        <Menu>
            <Menu.Item name='editorials'>
            Editorials
            </Menu.Item>
            <Menu.Item name='reviews'>
            Reviews
            </Menu.Item>
            <Menu.Item name='upcomingEvents'>
            Upcoming Events
            </Menu.Item>
        </Menu>
        <LogoStyle>
            <img src = {logo} width="150" height="150"></img>
        </LogoStyle> 
        <SearchWrapper>
            <Search size='massive'
                onResultSelect={(e, data) => {
                    console.log(data)
                    setSearchInputName(data.result.title)}}
                results={Array.from(foodNames).map(name => ({ title: name }))}
                value={searchInputName}
                onSearchChange={(e, data) => setSearchInputName(data.value)} />
        </SearchWrapper>
        { listings.length} items, after filtered: {filteredListings.length}
        <br />
        { filteredListings.map((item, i) => <div key={i}><h1>Name: {item.name}<br />Price: {item.price}</h1></div>) }
        <input placeholder='item name' value={inputName} onChange={e => setInputName(e.target.value)} />
        <br />
        <input placeholder='item price' value={inputPrice} onChange={e => setInputPrice(e.target.value)} />
        <br />
        <button onClick={e => {
            if (!inputName || !inputPrice) {
                alert('youre missin name or price, matey')
                return
            }
            dispatch(addItem({ name: inputName, price: inputPrice }))
            setInputName('')
            setInputPrice('')
        }}>Click me to add a listing</button>
    </div>
}

export default Home
