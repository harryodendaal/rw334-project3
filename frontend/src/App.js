import "./App.css"

import {useState, useEffect} from 'react';
import {Home,Login,Register, Post, PostForm} from './pages/index';
import {Navbar} from './components/index'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import {QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  
   const [token, setToken] = useState(false);

  const changeTokenState =() => {
    setToken(state => state = !state)
  }
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, [token]);
  return (
  <Router>
    <QueryClientProvider client={queryClient}>

      <Navbar token={token} changeTokenState={changeTokenState} />

      <Route exact path='/' component= {Home}/>
      <Route exact path='/login'>
        <Login changeToken={changeTokenState}/>
      </Route>
      <Route exact path='/register'>
        <Register changeToken={changeTokenState}/>
      </Route>
      <Route exact path="/post/:id">
        <Post/>
      </Route>
      <Route exact path="/postForm/:id?">
        <PostForm/>
      </Route>
    </QueryClientProvider>
    </Router>
  );
}

export default App;
