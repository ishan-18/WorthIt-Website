import React from 'react'
import {BrowserRouter, BrowserRouter as Router} from 'react-router-dom'
import Header from './components/headers/Header'
import Pages from './components/mainpages/Pages'
import {DataProvider} from './GlobalState'

function App() {
  return (

    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Pages />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
