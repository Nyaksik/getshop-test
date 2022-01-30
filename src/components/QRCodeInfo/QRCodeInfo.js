import QRcode from '../../assets/image/qr-code.png'
import './QRCodeInfo.css'

function QRCodeInfo() {
    return (
        <div className='qr-code-info'>
            <p className='qr-code-info__descr'>Сканируйте QR-код для получения дополнительной информации</p>
            <img className='qr-code-info__img' src={QRcode} alt='qr-code' />
        </div>
    )
}

export default QRCodeInfo
