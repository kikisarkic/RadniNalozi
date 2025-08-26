import { useEffect, useState } from "react"
import RacuniService from "../../services/RacuniService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";


export default function RacuniPregled(){

    const[racuni,setRacuni] = useState([]);
    const navigate= useNavigate();

    async function dohvatiRacuni(){
   const odgovor = await RacuniService.get()
   setRacuni(odgovor)

    }



// hook koje ce se izvoditi prilikom dolaska na stranicu Strojevi
    useEffect(()=>{
        dohvatiRacuni()
    },[])

 

    
    function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return;
        }
        brisanje(sifra)
    }

    async function brisanje(sifra) {
        const odgovor = await RacuniService.obrisi(sifra);
        dohvatiRacuni();
    }



    return(

        <>
        <Link 
        
        className="btn btn-success"
        to={RouteNames.RACUN_NOVI}> Dodavanje novog Racuna</Link>
        
        
    
     <Table striped bordered hover responsive>

     <thead>
       <tr>
        <th> Iznos </th>
        <th> NacinPlacanja </th>
         <th>Akcija</th>
       </tr>
     </thead>

     <tbody>
        {racuni && racuni.map((racun,index)=>(
            <tr key={ index}>
                <td> {racun.iznos}</td>
                <td>{racun.nacinplacanja}</td>

                <td>
                            <Button
                            onClick={()=>navigate(`/racuni/${racun.sifra}`)}
                            >Promjena
                            </Button> 
                            &nbsp; &nbsp; &nbsp; &nbsp;

                            <Button variant="danger"
                            onClick={()=>obrisi(racun.sifra)}>
                                Obriši
                            </Button>                        
                        </td>
            </tr>        
        ))}
     </tbody>
     </Table>
     </>
    )

}