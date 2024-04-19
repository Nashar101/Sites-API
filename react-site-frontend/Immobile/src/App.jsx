import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import sitesList from "./features/sites/SitesList.jsx";
import SitesList from "./features/sites/SitesList.jsx";
function App() {
  const [count, setCount] = useState(0)

  return (
       <div><SitesList/></div>
  )
}

export default App
