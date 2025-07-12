import { useEffect, useState } from "react"
import StrojeviService from "../../services/StrojeviService";
import { Table } from "react-bootstrap";


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

    return(


        <>
        Tablicni Pregled Strojeva
        
    
     <Table striped bordered hover responsive>

     <thead>
       <tr>
        <th> Model </th>
        <th> Tip </th>
       </tr>
     </thead>

     <tbody>
        {strojevi  && strojevi.map((stroj,index)=>(
            <tr key={ index}>
                <td> {stroj.tip}</td>
                <td>{stroj.model}</td>
            </tr>        
        ))}
     </tbody>
     </Table>
     </>
    )
}