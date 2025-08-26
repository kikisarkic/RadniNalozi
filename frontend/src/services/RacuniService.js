import { HttpService } from "./HttpService"


async function get() {
    return await HttpService.get('/Racun')
    // sve je u redu dobili smo odgovor
    .then((odgovor)=>{
       // console.log(odgovor.data)
       return odgovor.data
    })
    // nastala je greska, obradi ju

    .catch((e)=>{})
}

async function getBySifra(sifra) {
    return await HttpService.get('/Racun/' + sifra)
    // sve je u redu dobili smo odgovor
    .then((odgovor)=>{
       // console.log(odgovor.data)
       return odgovor.data
    })
    // nastala je greska, obradi ju

    .catch((e)=>{})
}

async function dodaj(racun) {
    return await HttpService.post('/Racun',racun)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}

async function obrisi(sifra) {
    return await HttpService.delete('/Racun/'+sifra)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}
    async function promjeni(sifra,racun) {
    return await HttpService.put('/Racun/'+sifra,racun)
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