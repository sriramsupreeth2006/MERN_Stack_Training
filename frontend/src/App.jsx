import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import LoginPage from './Pages/LoginPage/LoginPage'
import ProfilePage from './Pages/Profile/ProfilePage'
import Urlshortner from './Pages/URLShortener/ShortUrl'
import URLHistory from './Pages/URLShortener/URLHistory'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import { HeaderMegaMenu } from './Components/Navbar/HeaderMegaMenu'
import './index.css'

function App() {
  return (
    <Router>
      <HeaderMegaMenu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/url-shortener' element={<Urlshortner />} />
          <Route path='/url-history' element={<URLHistory />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;