import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Input } from 'semantic-ui-react'
import styled from 'styled-components'
import logo from '../../InstaPrice Logos/logo.png'
import { useHistory } from 'react-router-dom'


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
    const history = useHistory()
    const [ searchInputName, setSearchInputName ] = useState('')
    const [ searching, setSearching ] = useState(false)
    /** @type {String[]} */
    const listings = useSelector(state => state.listings)
    const foodNames = new Set()
    listings.forEach(item => {
        if (item.name.toLowerCase().includes(searchInputName.toLowerCase())) {
            foodNames.add(item.name)
        }
    })
    

    return <div>
        <LogoStyle>
            <img src = {logo} width="150" height="150"></img>
        </LogoStyle>
        <SearchWrapper>
            <Input size='massive' onChange={e => setSearchInputName(e.target.value)} icon='search' loading={searching} placeholder='Search a Food' onKeyDown={e => {
                if (e.key !== 'Enter') {
                    return
                }
                setSearching(true)
                fetch('/api/foods/search?longitude=40.740582&latitude=73.984739&range=2').then(res => {
                    if (res.status !== 200) {
                      throw new Error(`Non-200 status code ${res.status}`)
                    }
                    setSearching(false)
                    return res.json()
                  }).then(data => {
                      history.push({ pathname: `/product/${searchInputName}`, state: { data } })
                  }).catch(console.error)
            }} />
        </SearchWrapper>
    </div>
}

export default Home
