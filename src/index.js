import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import {Queue} from "./components/Queue"
import './index.css';




ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Queue />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);



