import { HttpService } from "./HttpService"


async function get() {
    return await HttpService.get('/Potrazitelj')
    // sve je u redu dobili smo odgovor
    .then((odgovor)=>{
       // console.log(odgovor.data)
       return odgovor.data
    })
    // nastala je greska, obradi ju

    .catch((e)=>{})
}

async function getBySifra(sifra) {
    return await HttpService.get('/Potrazitelj/' + sifra)
    // sve je u redu dobili smo odgovor
    .then((odgovor)=>{
       // console.log(odgovor.data)
       return odgovor.data
    })
    // nastala je greska, obradi ju

    .catch((e)=>{})
}

async function dodaj(potrazitelj) {
    return await HttpService.post('/Potrazitelj',potrazitelj)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}

async function obrisi(sifra) {
    return await HttpService.delete('/Potrazitelj/'+sifra)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}
    async function promjeni(sifra,potrazitelj) {
    return await HttpService.put('/Potrazitelj/'+sifra,potrazitelj)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}

export default{
    get,
    getBySifra,
    dodaj,
    obrisi,
    promjeni
}