import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import './index.css'; 
import App from './App';
import StoreProvider from "./store/configStore";
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <BrowserRouter>
        <StoreProvider>
            <App />
        </StoreProvider>
    </BrowserRouter>, 
    document.getElementById('root')
);

serviceWorker.unregister();
