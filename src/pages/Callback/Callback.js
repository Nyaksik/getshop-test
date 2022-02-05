import useArrowNavigation from '../../hooks/useArrowNavigation'
import ExitButton from '../../components/ExitButton/ExitButton'
import Numpad from '../../components/Numpad/Numpad'
import QRCodeInfo from '../../components/QRCodeInfo/QRCodeInfo'
import './Callback.css'

function Callback() {
    const numPad = [
        {
            value: '1',
            row: 1,
            column: 1
        },
        {
            value: '2',
            row: 1,
            column: 2
        },
        {
            value: '3',
            row: 1,
            column: 3
        },
        {
            value: '4',
            row: 2,
            column: 1
        },
        {
            value: '5',
            row: 2,
            column: 2
        },
        {
            value: '6',
            row: 2,
            column: 3
        },
        {
            value: '7',
            row: 3,
            column: 1
        },
        {
            value: '8',
            row: 3,
            column: 2
        },
        {
            value: '9',
            row: 3,
            column: 3
        },
        {
            value: 'Стереть',
            row: 4,
            column: 1
        },
        {
            value: '0',
            row: 4,
            column: 2
        }
    ]
    const arrowNavigation = useArrowNavigation(numPad)

    function phoneMask(value) {
        return value.replace(/[^0-9]/g, '')
            .replace(/^(\d{0,1})?(\d{0,3})?(\d{0,3})?(\d{0,2})?(\d{0,2})?(\d*)$/g, function(_, p1, p2, p3, p4, p5) {
                return `+${p1 || '7'}(${p2 || '___'})${p3 || '___'}-${p4 || '__'}-${p5 || '__'}`
            })
    }

    return (
        <div className="callback-screen">
            <div className='banner-second-screen callback-screen__banner'>
                <p className='banner-second-screen__title'>
                    Введите ваш номер мобильного телефона
                </p>
                <input
                    placeholder='+7(___)___-__-__'
                    className={
                        arrowNavigation.isMaxLength ? 'banner-second-screen__input' : 'banner-second-screen__input banner-second-screen__input_err'
                    }
                    readOnly
                    value={phoneMask(arrowNavigation.number)} />
                <p className='banner-second-screen__descr'>
                    и с Вами свяжется наш менеджер для дальнейшней консультации
                </p>
                <Numpad numpad={numPad} {...arrowNavigation} />
                {arrowNavigation.isMaxLength
                    ? <div className='approval'>
                        <div className={
                            arrowNavigation.approval
                            ? 'approval__square approval__square_focus approval__square_check'
                            : arrowNavigation.position.row === 5
                            ? 'approval__square approval__square_focus'
                            : 'approval__square'
                            }>
                        </div>
                        <p className='approval__descr'>
                            Согласие на обработку персональных данных
                        </p>
                    </div>
                    : <p className='approval__err'>Неверно введён номер</p>
                }
                <button
                    className={
                        arrowNavigation.position.row === 6
                        ? 'btn btn_focus banner-second-screen__btn'
                        : 'btn banner-second-screen__btn'
                    }
                    disabled={!(arrowNavigation.approval && arrowNavigation.isMaxLength)}>
                        Подвердить номер
                </button>
            </div>
            <ExitButton column={arrowNavigation.position.column} />
            <QRCodeInfo />
        </div>
    )
}

export default Callback