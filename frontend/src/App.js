import "./App.css"
import {Home,Login,Register} from './pages/index';
import {Navbar} from './components/index'
import {Route, BrowserRouter as Router} from 'react-router-dom'

function App() {
  
  return (
  <Router>
      <Navbar />

      <Route exact path='/' component= {Home}/>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/register'>
        <Register/>
      </Route>
    </Router>
  );
}

export default App;
