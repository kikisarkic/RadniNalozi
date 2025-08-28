import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import PotraziteljiService from "../../services/PotraziteljiService";



export default function PotraziteljiDodaj(){
   
    const navigate  = useNavigate();

    async function dodaj(potrazitelj){
        const odgovor = await PotraziteljiService.dodaj(potrazitelj);
        navigate(RouteNames.POTRAZITELJ_PREGLED);
    }


    function odradiSubmit(e){ //e je event
        e.preventDefault();

        let podaci = new FormData(e.target); // dohvaćamo sve podatke iz forme

        dodaj(
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
        Dodavanje potražitelja
        <Form onSubmit={odradiSubmit}>

            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
            </Form.Group>

            <Form.Group controlId="adresa">
                <Form.Label>Adresa</Form.Label>
                <Form.Control type="text" name="adresa" required />
            </Form.Group>

             <Form.Group controlId="oib">
                <Form.Label>OIB</Form.Label>
                <Form.Control type="text" name="oib" required />
            </Form.Group>
             <Form.Group controlId="telefon">
                <Form.Label>Telefon</Form.Label>
                <Form.Control type="text" name="telefon" required />
            </Form.Group>
             <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" required />
            </Form.Group>            

           

            <hr style={{marginTop: '50px'}} />

            <Row>
                <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                    <Link to={RouteNames.STROJ_PREGLED}
                    className="btn btn-danger">Odustani</Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                    <Button variant="success" type="submit">
                        Dodaj potražitelj
                    </Button>
                </Col>
            </Row>

        </Form>



        

        </>
    )
}