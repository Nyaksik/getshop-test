const URL = 'http://apilayer.net/api/validate'
const API_KEY = '032d41dc0136a41bb0975d8206b4f9ec'

export default async function phoneValidate(number) {
    const searchObj = {
        access_key: API_KEY,
        number: number
    }
    const params = new URLSearchParams(searchObj).toString()
    const res = await fetch(`${URL}?${params}`)
    return res.json()
}