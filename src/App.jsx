import React from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Workflow from './components/Workflow'
import PlumberList from './components/PlumberList'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <div className="app-main">
      <Navbar />
      <Header />
      <main>
        <PlumberList />
        <Workflow />
      </main>
      <Footer />
    </div>
  )
}

export default App
