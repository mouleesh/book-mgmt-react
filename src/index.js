import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './pages/app/App';
import registerServiceWorker from './registerServiceWorker';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

ReactDOM.render(<BrowserRouter>
                    <App />
                </BrowserRouter>, 
                document.getElementById('root'));
                
registerServiceWorker();
