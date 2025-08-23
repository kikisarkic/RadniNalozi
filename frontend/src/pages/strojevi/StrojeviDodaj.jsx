import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import StrojeviService from "../../services/StrojeviService";
import moment from "moment";


export default function StrojeviDodaj(){
   
    const navigate  = useNavigate();

    async function dodaj(stroj){
        const odgovor = await StrojeviService.dodaj(stroj);
        navigate(RouteNames.STROJ_PREGLED);
    }


    function odradiSubmit(e){ //e je event
        e.preventDefault();

        let podaci = new FormData(e.target); // dohvaćamo sve podatke iz forme

        dodaj(
            {
            model: podaci.get('model'),
            tip: podaci.get('tip'),
            registracija: moment.utc(podaci.get('registracija'))
            }
        )


    }


    return (
        <>
        Dodavanje stroja
        <Form onSubmit={odradiSubmit}>

            <Form.Group controlId="model">
                <Form.Label>Model</Form.Label>
                <Form.Control type="text" name="model" required />
            </Form.Group>

            <Form.Group controlId="tip">
                <Form.Label>Tip</Form.Label>
                <Form.Control type="text" name="tip" required />
            </Form.Group>

            <Form.Group controlId="registracija">
                <Form.Label>Registracija</Form.Label>
                <Form.Control type="date" name="registracija" />
            </Form.Group>

           

            <hr style={{marginTop: '50px'}} />

            <Row>
                <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                    <Link to={RouteNames.STROJ_PREGLED}
                    className="btn btn-danger">Odustani</Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit">
                        Dodaj stroj
                    </Button>
                </Col>
            </Row>

        </Form>



        

        </>
    )
}