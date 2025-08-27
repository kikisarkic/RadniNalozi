import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../constants"
import PotraziteljService from "../../services/PotraziteljiService";
import { useEffect, useState } from "react";


export default function PotraziteljPromjena(){
   
    const navigate  = useNavigate();
    const params = useParams();
    const [potrazitelj,setPotrazitelj] = useState({})

    async function ucitajPotrazitelj() {
        const o = await PotraziteljService.getBySifra(params.sifra)
        setPotrazitelj(o)
    }
    
    useEffect(()=>{
        ucitajPotrazitelj()
    },[])

    async function promjena(sifra,potrazitelj){
        const odgovor = await PotraziteljService.promjeni(sifra,potrazitelj);
        navigate (RouteNames.POTRAZITELJ_PREGLED);
    }

    function odradiSubmit(e){ //e je event
        e.preventDefault();

        let podaci = new FormData(e.target); // dohvaćamo sve podatke iz forme

        promjena(
            params.sifra,
            {
            naziv: podaci.get('naziv'),
            adresa: podaci.get('adresa'),
            oib: podaci.get('oib'),
            telefon: podaci.get('telefon'),
            email: podaci.get('email'), 
            }
        )


    }


    return (
        <>
        Dodavanje potrazitelja
        <Form onSubmit={odradiSubmit}>

            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required defaultValue={potrazitelj.naziv}/>
            </Form.Group>

            <Form.Group controlId="adresa">
                <Form.Label>Adresa</Form.Label>
                <Form.Control type="text" name="adresa" required defaultValue={potrazitelj.adresa} />
            </Form.Group>

         <Form.Group controlId="oib">
                <Form.Label>OIB</Form.Label>
                <Form.Control type="text" name="oib" required defaultValue={potrazitelj.oib}/>
            </Form.Group>

             <Form.Group controlId="telefon">
                <Form.Label>Telefon</Form.Label>
                <Form.Control type="text" name="telefon" required defaultValue={potrazitelj.telefon}/>
            </Form.Group>

             <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" required defaultValue={potrazitelj.email}/>
            </Form.Group>

           

           

            <hr style={{marginTop: '50px'}} />

            <Row>
                <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                    <Link to={RouteNames.POTRAZITELJ_PREGLED}
                    className="btn btn-danger">Odustani</Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit">
                        Promjeni potrazitelj
                    </Button>
                </Col>
            </Row>

        </Form>



        

        </>
    )
}