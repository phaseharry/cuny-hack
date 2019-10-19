import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../actions/index.js'

const items = [{
    name: 'apple',
    price: 399
}, {
    name: 'melon',
    price: 499
}, {
    name: 'ass',
    price: 9001
}]

function Home() {
    const [ inputName, setInputName ] = useState('')
    const [ inputPrice, setInputPrice ] = useState('')
    /** @type {String[]} */
    const listings = useSelector(state => state.listings)
    const dispatch = useDispatch()

    return <div>
        { listings.length} items
        <br />
        { listings.map((item, i) => <div key={i}><h1>Name: {item.name}<br />Price: {item.price}</h1></div>) }
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
