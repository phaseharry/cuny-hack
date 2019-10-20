import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'
import styled from 'styled-components'
import logo from '../../InstaPrice Logos/logo.png'
import { useHistory } from 'react-router-dom'


import Map from './Map'

const SearchWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px 10px;
`
const LogoStyle = styled.div`
    padding-top : 10%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Title1 = styled.h1`
    text-align: center;
    
`

function Home() {
    const history = useHistory()
    const [ searchInputName, setSearchInputName ] = useState('')
    /** @type {String[]} */
    return <div>
        <LogoStyle>
            <img src={logo} width="200" height="200"></img>
        </LogoStyle>
        <Title1>
            What food are you looking for?
        </Title1>
        <SearchWrapper>
            <Input size='massive' onChange={e => setSearchInputName(e.target.value)} icon='search' placeholder='Search a Food' onKeyDown={e => {
                if (e.key !== 'Enter') {
                    return
                }
                history.push({ pathname: `/product/${searchInputName}`})
            }} />
        </SearchWrapper>
    </div>
}

export default Home
