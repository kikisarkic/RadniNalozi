import { useEffect, useState } from "react"
import PotraziteljiService from "../../services/PotraziteljiService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";



export default function PotraziteljiPregled(){

    const[potrazitelji,setPotrazitelji] = useState([]);
    const navigate= useNavigate();

    async function dohvatiPotrazitelji(){
   const odgovor = await PotraziteljiService.get()
   setPotrazitelji(odgovor)

    }



// hook koje ce se izvoditi prilikom dolaska na stranicu Potrazitelji
    useEffect(()=>{
        dohvatiPotrazitelji()
    },[])

 

    
    function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return;
        }
        brisanje(sifra)
    }

    async function brisanje(sifra) {
        const odgovor = await PotraziteljiService.obrisi(sifra);
        dohvatiPotrazitelji();
    }



    return(

        <>
        <Link 
        
        className="btn btn-success"
        to={RouteNames.POTRAZITELJ_NOVI}> Dodavanje novog Potražitelja</Link>
        
        
    
     <Table striped bordered hover responsive>

     <thead>
       <tr>
        <th> Naziv </th>
        <th> Adresa </th>
         <th> OIB</th>
        <th> Telefon</th>
        <th> Email</th>
         <th>Akcija</th>
       </tr>
     </thead>

     <tbody>
        {potrazitelji  && potrazitelji.map((potrazitelj,index)=>(
            <tr key={ index}>
                <td> {potrazitelj.naziv}</td>
                <td>{potrazitelj.adresa}</td>
                 <td> {potrazitelj.oib}</td>
                  <td> {potrazitelj.telefon}</td>
                   <td> {potrazitelj.email}</td>
               
                <td>
                            <Button
                            onClick={()=>navigate(`/potrazitelji/${potrazitelj.sifra}`)}
                            >Promjena
                            </Button> 
                            &nbsp; &nbsp; &nbsp; &nbsp;

                            <Button variant="danger"
                            onClick={()=>obrisi(potrazitelj.sifra)}>
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