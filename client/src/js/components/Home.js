import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../actions/index.js'
import { Search } from 'semantic-ui-react'
import styled from 'styled-components'

const SearchWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px 10px;
`

function Home() {
    const [ inputName, setInputName ] = useState('')
    const [ inputPrice, setInputPrice ] = useState('')
    const [ searchInputName, setSearchInputName ] = useState('')
    // const [ searching, setSearching ] = useState(false)
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
        <SearchWrapper>
            <Search size='massive'
                onResultSelect={(e, data) => setSearchInputName(data.result.title)}
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
