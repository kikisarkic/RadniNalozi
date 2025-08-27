import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../constants"
import RadniciService from "../../services/RadniciService";
import { useEffect, useState } from "react";


export default function RadniciPromjena(){
   
    const navigate  = useNavigate();
    const params = useParams();
    const [radnik,setRadnik] = useState({})

    async function ucitajRadnik() {
        const o = await RadniciService.getBySifra(params.sifra)
        setRadnik(o)
    }
    

    async function promjena(sifra,radnik){
        const odgovor = await RadniciService.promjeni(sifra,radnik);
        navigate(RouteNames.RADNIK_PREGLED);
    }

    useEffect(()=>{
        ucitajRadnik()
    },[])
    async function promjena(sifra,radnik){
        const odgovor = await RadniciService.promjeni(sifra,radnik);
        navigate (RouteNames.RADNIK_PREGLED);
    }

    function odradiSubmit(e){ //e je event
        e.preventDefault();

        let podaci = new FormData(e.target); // dohvaćamo sve podatke iz forme

        promjena(
            params.sifra,
            {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            telefon:podaci.get('telefon'),
            }
        )


    }


    return (
        <>
        Dodavanje radnika
        <Form onSubmit={odradiSubmit}>

            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime" required defaultValue={radnik.ime}/>
            </Form.Group>

            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime" required defaultValue={radnik.prezime} />
            </Form.Group>

        

            <Form.Group controlId="telefon">
                <Form.Label>Telefon</Form.Label>
                <Form.Control type="text" name="telefon" defaultValue={radnik.telefon} />
            </Form.Group>

           

            <hr style={{marginTop: '50px'}} />

            <Row>
                <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                    <Link to={RouteNames.RADNIK_PREGLED}
                    className="btn btn-danger">Odustani</Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit">
                        Promjeni radnika
                    </Button>
                </Col>
            </Row>

        </Form>



        

        </>
    )
}