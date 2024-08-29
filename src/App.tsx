import { BrowserRouter } from 'react-router-dom'
import PageNavigation from './Routes/PageNavigation'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <PageNavigation></PageNavigation>
      </BrowserRouter>
    
    </>
  )
}

export default App
