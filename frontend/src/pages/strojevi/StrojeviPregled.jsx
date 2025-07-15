import { useEffect, useState } from "react"
import StrojeviService from "../../services/StrojeviService";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function StrojeviPregled(){

    const[strojevi,setStrojevi] = useState([]);

    async function dohvatiStrojevi(){
   const odgovor = await StrojeviService.get()
   setStrojevi(odgovor)

    }



// hook koje ce se izvoditi prilikom dolaska na stranicu Strojevi
    useEffect(()=>{
        dohvatiStrojevi()
    },[])


    
    function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return;
        }
        brisanje(sifra)
    }

    async function brisanje(sifra) {
        const odgovor = await StrojeviService.obrisi(sifra);
        dohvatiStrojevi();
    }



    return(

        <>
        <Link 
        
        className="btn btn-success"
        to={RouteNames.STROJ_NOVI}> dodavanje novog Stroja</Link>
        
        
    
     <Table striped bordered hover responsive>

     <thead>
       <tr>
        <th> Model </th>
        <th> Tip </th>
         <th> Registracija</th>
         <th>Akcija</th>
       </tr>
     </thead>

     <tbody>
        {strojevi  && strojevi.map((stroj,index)=>(
            <tr key={ index}>
                <td> {stroj.tip}</td>
                <td>{stroj.model}</td>
                <td>{stroj.registracija}</td>

                <td>
                            <Button variant="danger"
                            onClick={()=>obrisi(stroj.sifra)}>
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