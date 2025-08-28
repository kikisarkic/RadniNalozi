import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../constants"
import RadniNaloziService from "../../services/RadniNaloziService";
import PotraziteljiService from '../../services/PotraziteljiService';
import { useEffect, useState } from "react";
import StrojeviService from "../../services/StrojeviService";
import RacuniService from "../../services/RacuniService";
import RadniciService from "../../services/RadniciService";
import moment from "moment";


export default function RadniNaloziPromjena(){

  const params = useParams();

  const [radniNalog,setRadniNalog] = useState({})
  
      async function ucitajRadniNalog() {
          const o = await RadniNaloziService.getBySifra(params.sifra)
          console.log(o)
          setPotraziteljSifra(o.potraziteljSifra)
          setRadnikSifra(o.radnikSifra)
          setStrojSifra(o.strojSifra)
          setRacunSifra(o.racunSifra)
          o.datum = moment(o.datum).format('YYYY-MM-DD')

          setRadniNalog(o)
      }


      const [potrazitelji, setPotrazitelji] = useState([]);
  const [potraziteljSifra, setPotraziteljSifra] = useState(0);

  async function dohvatiPotrazitelje(){
    const odgovor = await PotraziteljiService.get();
    setPotrazitelji(odgovor);
    setPotraziteljSifra(odgovor[0].sifra);
  }
    useEffect(()=>{
    dohvatiPotrazitelje();
    dohvatiRadnike();
    dohvatiStrojeve();
    dohvatiRacune();
    ucitajRadniNalog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
   


 const [radnici, setRadnici] = useState([]);
  const [radnikSifra, setRadnikSifra] = useState(0);

    async function dohvatiRadnike(){
    const odgovor = await RadniciService.get();
    setRadnici(odgovor);
    setRadnikSifra(odgovor[0].sifra);
  }

      const [strojevi, setStrojevi] = useState([]);
  const [strojSifra, setStrojSifra] = useState(0);

  async function dohvatiStrojeve(){
    const odgovor = await StrojeviService.get();
    setStrojevi(odgovor);
    setStrojSifra(odgovor[0].sifra);
  }



  const [racuni, setRacuni] = useState([]);
  const [racunSifra, setRacunSifra] = useState(0);

  async function dohvatiRacune(){
    const odgovor = await RacuniService.get();
    setRacuni(odgovor);
    setRacunSifra(odgovor[0].sifra);
  }


    const navigate  = useNavigate();

    async function promjeni(radninalozi){
        const odgovor = await RadniNaloziService.promjeni(params.sifra,radninalozi);
        navigate(RouteNames.RADNINALOG_PREGLED);
    }


    function odradiSubmit(e){ //e je event
        e.preventDefault();

        let podaci = new FormData(e.target); // dohvaćamo sve podatke iz forme

        promjeni(
            {
            potraziteljSifra: parseInt(potraziteljSifra),
            radnikSifra:  parseInt(radnikSifra),
            strojSifra:  parseInt(strojSifra),
            racunSifra:  parseInt(racunSifra),
            datum: moment.utc(podaci.get('datum')),
          
            }
        )


    }


    return (
        <>
        Dodavanje radnognaloga
        <Form onSubmit={odradiSubmit}>

            <Form.Group className='mb-3' controlId='potrazitelj'>
            <Form.Label>Potrazitelj</Form.Label>
            <Form.Select 
            onChange={(e)=>{setPotraziteljSifra(e.target.value)}}
            >
            {potrazitelji && potrazitelji.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

             <Form.Group className='mb-3' controlId='radnik'>
            <Form.Label>Radnik</Form.Label>
            <Form.Select 
            onChange={(e)=>{setRadnikSifra(e.target.value)}}
            >
            {radnici && radnici.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.ime} {s.prezime}
              </option>
            ))}
            </Form.Select>
          </Form.Group>


              <Form.Group className='mb-3' controlId='stroj'>
            <Form.Label>Stroj</Form.Label>
            <Form.Select 
            onChange={(e)=>{setStrojSifra(e.target.value)}}
            >
            {strojevi && strojevi.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.tip} {s.model}
              </option>
            ))}
            </Form.Select>
          </Form.Group>




              <Form.Group className='mb-3' controlId='racun'>
            <Form.Label>Racun</Form.Label>
            <Form.Select 
            onChange={(e)=>{setRacunSifra(e.target.value)}}
            >
            {racuni && racuni.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.iznos}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

            <Form.Group controlId="datum">
                <Form.Label>Datum </Form.Label>
                <Form.Control type="date" name="datum"  defaultValue={radniNalog.datum}  />
            </Form.Group>

            <hr style={{marginTop: '50px'}} />

            <Row>
                <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                    <Link to={RouteNames.RADNINALOG_PREGLED}
                    className="btn btn-danger">Odustani</Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit">
                        Promjeni radninalog
                    </Button>
                </Col>
            </Row>

        </Form>



        

        </>
    )
}