import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import StrojeviPregled from './pages/strojevi/StrojeviPregled'
import StrojeviDodaj from './pages/strojevi/StrojeviDodaj'
import StrojeviPromjena from './pages/strojevi/StrojeviPromjena'
import PotraziteljiPregled from './pages/potrazitelji/PotraziteljiPregled'
import PotraziteljiDodaj from './pages/potrazitelji/PotraziteljDodaj'
import PotraziteljPromjena from './pages/potrazitelji/PotraziteljPromjena'



function App() {

  return (
      <Container> 
        <NavBarEdunova />
         <Container className='app'> 
        <Routes>
         <Route path={RouteNames.HOME} element={<Pocetna />} /> 


        <Route path= {RouteNames.STROJ_PREGLED} element= {<StrojeviPregled />} />
        <Route path = {RouteNames.STROJ_NOVI} element = {<StrojeviDodaj />}/>
        <Route path = {RouteNames.STROJ_PROMJENA} element = {<StrojeviPromjena/>}/>


        <Route path= {RouteNames.POTRAZITELJ_PREGLED} element= {<PotraziteljiPregled />} />
        <Route path= {RouteNames.POTRAZITELJ_NOVI} element= {<PotraziteljiDodaj />} />
        <Route path= {RouteNames.POTRAZITELJ_PROMJENA} element= {<PotraziteljPromjena />} />
        </Routes>
         </Container>
        <hr />
        &copy; Edunova

    
      </Container>
  )
}

export default App
