import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage'
import CollectionPage from './pages/collectionpage'
import Error from './pages/error'
import Navbar from './components/navbar/navbar'

function App() {


  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/collection" element={<CollectionPage />}/>
        <Route parh="*" element={<Error />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
