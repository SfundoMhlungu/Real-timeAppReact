import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import RealTime from './Components/Realtime'
import GettingStarted from './Components/learning/chartjs/gettingstarted'

function App() {
 
  

  return (
    <div style={{width: "100%", height: "100%", display:"flex"}}>
       <RealTime/>
       {/* <GettingStarted/> */}

       
    </div>
  )
}

export default App
