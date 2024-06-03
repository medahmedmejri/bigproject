import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Colectt from './Colectt';
import Users from './Users';
import Films from './Films';
import AddUsers from './AddUsers';
import AddFilms from './AddFilms';


function App() {
  
  return (
    <div>
   <BrowserRouter>
  <Routes>
    <Route    path='/' element={< Colectt/>}/>
   <Route    path='/Users' element={< Users/>}/>
    <Route    path='/Films' element={< Films/>}/>
    <Route    path='/AddUser' element={< AddUsers/>}/>
    <Route    path='/AddFilms' element={< AddFilms/>}/>
</Routes>
   </BrowserRouter>
   
    </div>
  )
}

export default App;

