import { useState } from 'react'
import ExitButton from '../../components/ExitButton/ExitButton'
import QRCodeInfo from '../../components/QRCodeInfo/QRCodeInfo'
import './Callback.css'

function Callback() {
    const [number, setNumber] = useState('+7(___)___-__-__')
    const numPad = [
        {
            value: '1'
        },
        {
            value: '2'
        },
        {
            value: '3'
        },
        {
            value: '4'
        },
        {
            value: '5'
        },
        {
            value: '6'
        },
        {
            value: '7'
        },
        {
            value: '8'
        },
        {
            value: '9'
        },
        {
            value: 'Стереть'
        },
        {
            value: '0'
        }
    ]
    return (
        <div className="callback-screen">
            <div className='banner-second-screen callback-screen__banner'>
                <p className='banner-second-screen__title'>
                    Введите ваш номер мобильного телефона
                </p>
                <p className='banner-second-screen__number'>{number}</p>
                <p className='banner-second-screen__descr'>
                    и с Вами свяжется наш менеджер для дальнейшней консультации
                </p>
                <div className='numpad'>
                    {
                        numPad.map((it, index) => {
                            return <button key={index} className='btn numpad__btn'>{it.value}</button>
                        })
                    }
                </div>
                <div className='approval'>
                    <div className='approval__square'></div>
                    <p className='approval__descr'>
                        Согласие на обработку персональных данных
                    </p>
                </div>
                <button className='btn banner-second-screen__btn' disabled={true}>Подвердить номер</button>
            </div>
            <ExitButton />
            <QRCodeInfo />
        </div>
    )
}

export default Callback
