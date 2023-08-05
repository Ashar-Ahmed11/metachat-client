import React from 'react'
import './App.css'
import AppBody from './components/appBody'
import ChateState from './components/context/chatState'
import { BrowserRouter as Router } from 'react-router-dom'
export default function App() {
  return (
    <>
      <Router>
        <ChateState>
          <AppBody />
        </ChateState>
      </Router>
    </>
  )
}