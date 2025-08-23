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
import RadniciPregled from './pages/radnik/RadniciPregled'
import RadniciDodaj from './pages/radnik/RadniciDodaj'
import RadniciPromjena from './pages/radnik/RadniciPromjena'



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

        
        <Route path= {RouteNames.RADNIK_PREGLED} element= {<RadniciPregled />} />
        <Route path= {RouteNames.RADNIK_NOVI} element= {<RadniciDodaj />} />
        <Route path= {RouteNames.RADNIK_PROMJENA} element= {<RadniciPromjena />} />


        </Routes>
         </Container>
        <hr />
        &copy; Edunova

    
      </Container>
  )
}

export default App
