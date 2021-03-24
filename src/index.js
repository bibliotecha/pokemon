import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
require('dotenv').config();

ReactDOM.render(<Router />, document.getElementById('root'));
