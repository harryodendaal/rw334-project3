import "./App.css"

import {useState, useEffect} from 'react';
import {Home,Login,Register, Post, PostForm, Groups, Group, CommentForm, Chat, Feed, Search, User} from './pages/index';
import {Navbar} from './components/index'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import {QueryClient, QueryClientProvider } from 'react-query'
import { GroupForm } from "./pages/groupform/Groupform";

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
      <Route exact path='/feed' component= {Feed}/>
      <Route exact path='/chat' component= {Chat}/>
      <Route exact path="/groups">
        <Groups/>
      </Route>
      <Route exact path='/login'>
        <Login changeToken={changeTokenState}/>
      </Route>
      <Route exact path='/register'>
        <Register changeToken={changeTokenState}/>
      </Route>
      <Route exact path="/post/:id">
        <Post/>
      </Route>
      <Route exact path="/postForm/:groupId?/:postId?">
        <PostForm/>
      </Route>
      <Route exact path="/group/:id">
        <Group/>
      </Route>
      <Route exact path="/groupForm/:groupid?">
        <GroupForm/>
      </Route>
      <Route exact path="/commentForm/:postId/:commentId?">
        <CommentForm/>
      </Route>
      <Route exact path="/search" component= {Search}>
        <Search/>
      </Route>
      <Route exact path="/user/:id">
        <User/>
      </Route>
    </QueryClientProvider>
    </Router>
  );
}

export default App;
