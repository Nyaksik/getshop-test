import ExitButton from '../../components/ExitButton/ExitButton'
import QRCodeInfo from '../../components/QRCodeInfo/QRCodeInfo'
import './Info.css'

function Info() {
    return (
    <div className="info-screen">
        <div className='banner-info-screen info-screen__banner'>
            <p className='banner-info-screen__title'>
                Заявка принята
            </p>
            <p className='banner-info-screen__subtitle'>
                Держите телефон под рукой.<br/>Скоро с Вами свяжется наш менеджер.
            </p>
        </div>
        <ExitButton />
        <QRCodeInfo />
    </div>
    )
}

export default Info
