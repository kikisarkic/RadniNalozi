import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import RadniNaloziService from "../../services/RadniNaloziService";
import PotraziteljiService from '../../services/PotraziteljiService';
import { useEffect, useState } from "react";



export default function RadniNaloziDodaj(){


      const [potrazitelji, setPotrazitelji] = useState([]);
  const [potraziteljSifra, setPotraziteljSifra] = useState(0);


  async function dohvatiPotrazitelje(){
    const odgovor = await PotraziteljiService.get();
    setPotrazitelji(odgovor);
    setPotraziteljSifra(odgovor[0].sifra);
  }


  
    useEffect(()=>{
    dohvatiPotrazitelje();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
   



    async function dohvatiPotrazitelje(){
    const odgovor = await PotraziteljiService.get();
    setPotrazitelji(odgovor);
    setPotraziteljSifra(odgovor[0].sifra);
  }

    useEffect(()=>{
    dohvatiPotrazitelje();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  
    const navigate  = useNavigate();

    async function dodaj(radninalozi){
        const odgovor = await RadniNaloziService.dodaj(radninalozi);
        navigate(RouteNames.RADNINALOG_PREGLED);
    }


    function odradiSubmit(e){ //e je event
        e.preventDefault();

        let podaci = new FormData(e.target); // dohvaćamo sve podatke iz forme

        dodaj(
            {
            potrazitelj: podaci.get('potrazitelj'),
            radnik: podaci.get('radnik'),
            stroj: podaci.get('stroj'),
            racun: podaci.get('racun'),
          
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
                {s.naziv}
              </option>
            ))}
            </Form.Select>
          </Form.Group>


              <Form.Group className='mb-3' controlId='stroj'>
            <Form.Label>Stroj</Form.Label>
            <Form.Select 
            onChange={(e)=>{setRadnikSifra(e.target.value)}}
            >
            {strojevi && strojevi.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

              <Form.Group className='mb-3' controlId='racun'>
            <Form.Label>Radnik</Form.Label>
            <Form.Select 
            onChange={(e)=>{setRadnikSifra(e.target.value)}}
            >
            {racuni && racuni.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

           

            <hr style={{marginTop: '50px'}} />

            <Row>
                <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                    <Link to={RouteNames.RADNINALOG_PREGLED}
                    className="btn btn-danger">Odustani</Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit">
                        Dodaj radninalog
                    </Button>
                </Col>
            </Row>

        </Form>



        

        </>
    )
}