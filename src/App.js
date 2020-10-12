import React from 'react';
import './App.scss';
import Home from './mainComponents/Home';
import {Route,Switch,withRouter} from 'react-router-dom';
import Search from './mainComponents/Search';
import Trailer from './mainComponents/Trailer';
import Login from './components/Login';
import Signup from './components/Signup';
import Userpage from './mainComponents/UserPage';
import ChangePassword from './mainComponents/ChangePassword';





function App() {

  return (
    <div className="App">
      <Switch>
      <Route path='/trailer/:id' component={Trailer}></Route>
      <Route path='/search/:id' component={Search}></Route>
      <Route path='/password' component={ChangePassword}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/signup' component={Signup}></Route>
      <Route path='/userpage' component={Userpage}></Route>
      <Route path='/' component={Home}></Route>

      </Switch>
    </div>
  );
  
}






export default App;
