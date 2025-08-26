import { useEffect, useState } from "react"
import RadniNaloziService from "../../services/RadniNaloziServiceService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";


export default function RadninaloziPregled(){

    const[strojevi,setRadninalozi] = useState([]);
    const navigate= useNavigate();

    async function dohvatiRadninalozi(){
   const odgovor = await RadniNaloziService.get()
   setRadninalozi(odgovor)

    }



// hook koje ce se izvoditi prilikom dolaska na stranicu Strojevi
    useEffect(()=>{
        dohvatiRadninalozi()
    },[])

 

    
    function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return;
        }
        brisanje(sifra)
    }

    async function brisanje(sifra) {
        const odgovor = await RadniNaloziService.obrisi(sifra);
        dohvatiRadninalozi();
    }



    return(

        <>
        <Link 
        
        className="btn btn-success"
        to={RouteNames.RADNINALOG_NOVI}> Dodavanje novog RadniNalog</Link>
        
        
    
     <Table striped bordered hover responsive>

     <thead>
       <tr>
        <th> potrazitelj </th>
        <th> radnik </th>
        <th> stroj </th>
        <th> racun </th>
         
         <th>Akcija</th>
       </tr>
     </thead>

     <tbody>
        {radninalozi  && radninalozi.map((radninalog,index)=>(
            <tr key={ index}>
                <td> {radninalog.potrazitelj}</td>
                <td> {radninalog.radnik}</td>
                <td> {radninalog.stroj}</td>
                <td> {radninalog.racun}</td>
              
                <td>
                            <Button
                            onClick={()=>navigate(`/radninalozi/${radninalog.sifra}`)}
                            >Promjena
                            </Button> 
                            &nbsp; &nbsp; &nbsp; &nbsp;

                            <Button variant="danger"
                            onClick={()=>obrisi(radninaloglog.sifra)}>
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