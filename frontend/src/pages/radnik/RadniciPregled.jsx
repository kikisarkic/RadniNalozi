import { useEffect, useState } from "react"
import RadniciService from "../../services/RadniciService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";



export default function RadniciPregled(){

    const[radnici,setRadnici ]= useState([]);
    const navigate= useNavigate();

    async function dohvatiRadnici(){
   const odgovor = await RadniciService.get()
   setRadnici(odgovor)

    }



// hook koje ce se izvoditi prilikom dolaska na stranicu radnikevi
    useEffect(()=>{
        dohvatiRadnici()
    },[])

 

    
    function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return;
        }
        brisanje(sifra)
    }

    async function brisanje(sifra) {
        const odgovor = await RadniciService.obrisi(sifra);
        dohvatiRadnici();
    }



    return(

        <>
        <Link 
        
        className="btn btn-success"
        to={RouteNames.RADNIK_NOVI}> Dodavanje novog radnika</Link>
        
        
    
     <Table striped bordered hover responsive>

     <thead>
       <tr>
        <th> Ime </th>
        <th> Prezime </th>
         <th> Telefon</th>
         <th>Akcija</th>
       </tr>
     </thead>

     <tbody>
        {radnici  && radnici.map((radnik,index)=>(
            <tr key={ index}>
                <td> {radnik.ime}</td>
                <td>{radnik.prezime}</td>
                <td>{radnik.telefon}</td>
                <td>
                            <Button
                            onClick={()=>navigate(`/radnici/${radnik.sifra}`)}
                            >Promjena
                            </Button> 
                            &nbsp; &nbsp; &nbsp; &nbsp;

                            <Button variant="danger"
                            onClick={()=>obrisi(radnik.sifra)}>
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