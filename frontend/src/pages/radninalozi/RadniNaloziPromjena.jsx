import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../constants"
import RadniNaloziService from "../../services/RadniNaloziService";
import { useEffect, useState } from "react";


export default function RadniNaloziPromjena(){
   
    const navigate  = useNavigate();
    const params = useParams();
    const [radninalog,setRadniNalozi] = useState({})

    async function ucitajRadninalog() {
        const o = await RadniNaloziService.getBySifra(params.sifra)
        setRadniNalozi(o)   
    }

    async function promjena(sifra,radninalog){
        const odgovor = await RadniNaloziService.promjeni(sifra,radninalog);
        navigate(RouteNames.RADNINALOG_PREGLED);
    }

    useEffect(()=>{
        ucitajRadninalog()
    },[])
    async function promjena(sifra,radninalog){
        const odgovor = await RadniNaloziService.promjeni(sifra,radninalog);
        navigate (RouteNames.RADNINALOG_PREGLED);
    }

    function odradiSubmit(e){ //e je event
        e.preventDefault();

        let podaci = new FormData(e.target); // dohvaćamo sve podatke iz forme

        promjena(
            params.sifra,
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

            <Form.Group controlId="potrazitelj">
                <Form.Label>Potrazitelj</Form.Label>
                <Form.Control type="text" name="potrazitelj" required />
            </Form.Group>

            <Form.Group controlId="radnik">
                <Form.Label>Radnik</Form.Label>
                <Form.Control type="text" name="radnik" required />
            </Form.Group>

             <Form.Group controlId="stroj">
                <Form.Label>Stroj</Form.Label>
                <Form.Control type="text" name="stroj" required />
            </Form.Group>

            <Form.Group controlId="racun">
                <Form.Label>Racun</Form.Label>
                <Form.Control type="text" name="racun" required />
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