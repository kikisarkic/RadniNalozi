import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import RacuniService from "../../services/RacuniService";
import moment from "moment";


export default function RacuniDodaj(){
   
    const navigate  = useNavigate();

    async function dodaj(racun){
        const odgovor = await RacuniService.dodaj(racun);
        navigate(RouteNames.RACUN_PREGLED);
    }


    function odradiSubmit(e){ //e je event
        e.preventDefault();

        let podaci = new FormData(e.target); // dohvaćamo sve podatke iz forme

        dodaj(
            {
            iznos: podaci.get('iznos'),
            nacinplacanja: podaci.get('nacinplacanja'),
           
            }
        )


    }


    return (
        <>
        Dodavanje racuna
        <Form onSubmit={odradiSubmit}>

            <Form.Group controlId="iznos">
                <Form.Label>Iznos</Form.Label>
                <Form.Control type="text" name="iznos" required />
            </Form.Group>

            <Form.Group controlId="nacinplacanja">
                <Form.Label>NacinPlacanja</Form.Label>
                <Form.Control type="text" name="nacinplacanja" required />
            </Form.Group>

            

           

            <hr style={{marginTop: '50px'}} />

            <Row>
                <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                    <Link to={RouteNames.RACUN_PREGLED_PREGLED}
                    className="btn btn-danger">Odustani</Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit">
                        Dodaj racun
                    </Button>
                </Col>
            </Row>

        </Form>



        

        </>
    )
}