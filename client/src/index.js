import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/components/index.js'
import { Provider } from 'react-redux'
import store from './js/store/index.js'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
