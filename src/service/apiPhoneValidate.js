const URL = 'http://apilayer.net/api/validate'
const API_KEY = '33c12490c47c326617cfff86a22dd691'

export default async function phoneValidate(number) {
    const searchObj = {
        access_key: API_KEY,
        number: number
    }
    const params = new URLSearchParams(searchObj).toString()
    const res = await fetch(`${URL}?${params}`)
    return res.json()
}