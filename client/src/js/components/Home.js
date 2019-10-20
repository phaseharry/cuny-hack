import React, { useState } from 'react'
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
    const [searchInputName, setSearchInputName] = useState('')
    /** @type {String[]} */
    return <div>
        <LogoStyle>
            <img src={logo} width="150" height="150"></img>
        </LogoStyle>
        <SearchWrapper>
            <Input size='massive' onChange={e => setSearchInputName(e.target.value)} icon='search' placeholder='Search a Food' onKeyDown={e => {
                if (e.key !== 'Enter') {
                    return
                }
                history.push({ pathname: `/product/${searchInputName}` })
            }} />
        </SearchWrapper>
    </div>
}

export default Home
