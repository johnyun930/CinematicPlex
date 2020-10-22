import React,{useState} from 'react';
import './App.scss';
import Home from './mainComponents/Home';
import {Route,Switch} from 'react-router-dom';
import Search from './mainComponents/Search';
import Trailer from './mainComponents/Trailer';
import Login from './components/Login';
import Signup from './components/Signup';
import Userpage from './mainComponents/UserPage';
import ChangePassword from './mainComponents/ChangePassword';
import store from './store/store';





function App() {
  const[login,setlogin] = useState(store.getState().login);
  store.subscribe(()=>{
    setlogin(store.getState().login);
  })
  return (
    <div className="App">
      <Switch>
      <Route path='/trailer/:id' component={Trailer}></Route>
      <Route path='/search/:id' component={Search}></Route>
      <Route path='/password' component={login?ChangePassword:Home}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/signup' component={Signup}></Route>
      <Route path='/userpage' component={login?Userpage:Home}></Route>
      <Route path='/' component={Home}></Route>

      </Switch>
    </div>
  );
  
}






export default App;
