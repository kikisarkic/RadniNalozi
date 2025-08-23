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

async function getBySifra(sifra) {
    return await HttpService.get('/Stroj/' + sifra)
    // sve je u redu dobili smo odgovor
    .then((odgovor)=>{
       // console.log(odgovor.data)
       return odgovor.data
    })
    // nastala je greska, obradi ju

    .catch((e)=>{})
}

async function dodaj(stroj) {
    return await HttpService.post('/Stroj',stroj)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}

async function obrisi(sifra) {
    return await HttpService.delete('/Stroj/'+sifra)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}
    async function promjeni(sifra,stroj) {
    return await HttpService.put('/Stroj/'+sifra,stroj)
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