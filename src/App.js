//styles
import './App.css';


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';


//Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//context
import { AuthProvider } from './context/AuthContext';

//pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'
import NotFound from './pages/NotFound/NotFound'
import Search from './pages/Search/Search';
import Post from './pages/post/Post';
import Loading from './pages/Loading/Loading';
import EditPost from './pages/EditPost/EditPost';
import Settings from './pages/Settings.js/Settings';
import Header from './components/Header';
import Profile from './pages/Profile/Profile';
import EditeProfile from './pages/Profile/EditeProfile';

function App() {

  const [isExpanded, setExpandedState] = useState(false)
  const [infProfile, setInfProfile] = useState(false)

  const toggleExpanded = () => {
    setExpandedState(!isExpanded)
  }
  const popUp = () => {
    setInfProfile(!infProfile)
  }

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if (loadingUser) {
    return <Loading />
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar isExpanded={isExpanded} toggleExpanded={toggleExpanded} />
          <Header isExpanded={isExpanded} popUp={popUp} infProfile={infProfile} />
          <div className={isExpanded ? "container" : "container_NX container"}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/search' element={<Search />} />
              <Route path='/posts/:id' element={<Post />} />
              <Route path='/*' element={<NotFound />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/editeprofile' element={<EditeProfile />} />
              <Route
                path='/login'
                element={!user ? <Login /> : <Navigate to='/' />}
              />
              <Route
                path='/register'
                element={!user ? <Register /> : <Navigate to='/' />}
              />
              <Route
                path='/posts/edit/:id'
                element={user ? <EditPost /> : <Navigate to='/login' />}
              />
              <Route
                path='/posts/create'
                element={user ? <CreatePost /> : <Navigate to='/login' />}
              />
              <Route
                path='/dashboard'
                element={user ? <Dashboard /> : <Navigate to='/login' />}
              />
              <Route
                path='/settings'
                element={user ? <Settings /> : <Navigate to='/login' />}
              />
            </Routes>
          </div>
          <Footer isExpanded={isExpanded} />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
