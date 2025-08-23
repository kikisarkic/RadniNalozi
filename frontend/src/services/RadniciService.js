import { HttpService } from "./HttpService"


async function get() {
    return await HttpService.get('/Radnik')
    // sve je u redu dobili smo odgovor
    .then((odgovor)=>{
       // console.log(odgovor.data)
       return odgovor.data
    })
    // nastala je greska, obradi ju

    .catch((e)=>{})
}

async function getBySifra(sifra) {
    return await HttpService.get('/Radnik/' + sifra)
    // sve je u redu dobili smo odgovor
    .then((odgovor)=>{
       // console.log(odgovor.data)
       return odgovor.data
    })
    // nastala je greska, obradi ju

    .catch((e)=>{})
}

async function dodaj(radnik) {
    return await HttpService.post('/Radnik',radnik)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}

async function obrisi(sifra) {
    return await HttpService.delete('/Radnik/'+sifra)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}
    async function promjeni(sifra,radnik) {
    return await HttpService.put('/Radnik/'+sifra,radnik)
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