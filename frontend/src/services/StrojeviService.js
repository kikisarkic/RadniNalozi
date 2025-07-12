import { HttpService } from "./HttpService"

async function get() {
    return await HttpService.get('/Stroj')
    // sve je u redu dobili smo odgovor
    .then((odgovor)=>{
       // console.log(odgovor.data)
       return odgovor.data
    })
    // nastala je greska, obradi ju
    
    .catch((e)=>{})
}

export default {
    get
}