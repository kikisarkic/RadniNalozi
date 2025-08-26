import { HttpService } from "./HttpService"


async function get() {
    return await HttpService.get('/radninalog')
    // sve je u redu dobili smo odgovor
    .then((odgovor)=>{
       // console.log(odgovor.data)
       return odgovor.data
    })
    // nastala je greska, obradi ju

    .catch((e)=>{})
}

async function getBySifra(sifra) {
    return await HttpService.get('/RadniNalog/' + sifra)
    // sve je u redu dobili smo odgovor
    .then((odgovor)=>{
       // console.log(odgovor.data)
       return odgovor.data
    })
    // nastala je greska, obradi ju

    .catch((e)=>{})
}

async function dodaj(radninalog) {
    return await HttpService.post('/RadniNalog',radninalog)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}

async function obrisi(sifra) {
    return await HttpService.delete('/RadniNalog/'+sifra)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}
    async function promjeni(sifra,radninalog) {
    return await HttpService.put('/RadniNalog/'+sifra,radninalog)
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