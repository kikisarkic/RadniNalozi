import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../constants"
import RacuniService from "../../services/RacuniService";
import { useEffect, useState } from "react";


export default function RacuniPromjena(){
   
    const navigate  = useNavigate();
    const params = useParams();
    const [racun,setRacun] = useState({})

    async function ucitajRacun() {
        const o = await RacuniService.getBySifra(params.sifra)
       
        setRacun(o)
    }
    

    async function promjena(sifra,racun){
        const odgovor = await RacuniService.promjeni(sifra,racun);
        navigate(RouteNames.RACUN_PREGLED);
    }

    useEffect(()=>{
        ucitajRacun()
    },[])
    async function promjena(sifra,racun){
        const odgovor = await RacuniService.promjeni(sifra,racun);
        navigate (RouteNames.RACUN_PREGLED);
    }

    function odradiSubmit(e){ //e je event
        e.preventDefault();

        let podaci = new FormData(e.target); // dohvaćamo sve podatke iz forme

        promjena(
            params.sifra,
            {
            iznos: podaci.get('iznos'),
            nacinPlacanja: podaci.get('nacinPlacanja'),
          
            }
        )


    }


    return (
        <>
        Dodavanje računa
        <Form onSubmit={odradiSubmit}>

            <Form.Group controlId="iznos">
                <Form.Label>Iznos</Form.Label>
                <Form.Control type="text" name="iznos" required defaultValue={racun.iznos}/>
            </Form.Group>

            <Form.Group controlId="nacinPlacanja">
                <Form.Label>Način plaćanja</Form.Label>
                <Form.Control type="text" name="nacinPlacanja" required defaultValue={racun.nacinPlacanja} />
            </Form.Group>

    

           

            <hr style={{marginTop: '50px'}} />

            <Row>
                <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                    <Link to={RouteNames.STROJ_PREGLED}
                    className="btn btn-danger">Odustani</Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit">
                        Promjeni račun
                    </Button>
                </Col>
            </Row>

        </Form>



        

        </>
    )
}