import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage'
import CollectionPage from './pages/collectionpage'
import ContactPage from './pages/contactpage'
import Error from './pages/error'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/Footer'


function App() {


  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/collection" element={<CollectionPage />}/>
        <Route path="/contact" element={<ContactPage />}/>
        <Route path="*" element={<Error />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
