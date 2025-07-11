import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Router, Routes } from 'react-router-dom'
import { RouteNames } from './constants'


function App() {

  return (
      <Container> 
        <NavBarEdunova />
        <Routes>
         <Router path={RouteNames.HOME} element={<Pocetna />} /> 

        </Routes>

    Hello
      </Container>
  )
}

export default App
