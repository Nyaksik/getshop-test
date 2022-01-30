import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import phoneValidate from '../../service/apiPhoneValidate'
import ExitButton from '../../components/ExitButton/ExitButton'
import Numpad from '../../components/Numpad/Numpad'
import QRCodeInfo from '../../components/QRCodeInfo/QRCodeInfo'
import './Callback.css'

function Callback() {
    const navigate = useNavigate()

    const [number, setNumber] = useState('')
    const [approval, setApproval] = useState(false)
    const [valid, setValid] = useState(true)
    const [position, setPosition] = useState({ row: 2, column: 2 })
    const maxLength = 11
    const isMaxLength = number.length === maxLength

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

    function phoneMask(value) {
        return value.replace(/[^0-9]/g, '')
            .replace(/^(\d{0,1})?(\d{0,3})?(\d{0,3})?(\d{0,2})?(\d{0,2})?(\d*)$/g, function(_, p1, p2, p3, p4, p5) {
                return `+${p1 || '7'}(${p2 || '___'})${p3 || '___'}-${p4 || '__'}-${p5 || '__'}`
            })
    }

    function backspaceCase() {
        if(number.length < 2) {
            setNumber('')
        } else {
            const backSpace = number.slice(0, -1)
            setNumber(backSpace)
        }
    }

    async function validate(phoneNumber) {
        const res = await phoneValidate(phoneNumber)
        setValid(res?.valid)
    }

    function enterCase() {
        if(position.row === 4 && position.column === 1) {
            backspaceCase()
        } else if(position.row === 5) {
            setApproval(!approval)
        } else if(position.row === 6) {
            navigate('/info')
        } else {
            const currentNumber = numPad.find(it => it.row === position.row && it.column === position.column)?.value
            setNumber(`${number}${currentNumber}`)
        }
    }

    function inputHandle(e) {
        switch(e.key) {
            case 'ArrowUp':
                const ArrowUp = Math.max(1, position.row - 1)
                setPosition({ ...position, row: ArrowUp })
                break
            case 'ArrowDown':
                const acceptRow = approval && isMaxLength ? 6 : 5
                const ArrowDown = Math.min(acceptRow, position.row + 1)
                setPosition({ ...position, row: ArrowDown })
                break
            case 'ArrowLeft':
                const ArrowLeft = Math.max(1, position.column - 1)
                setPosition({ ...position, column: ArrowLeft })
                break
            case 'ArrowRight':
                const ArrowRight = Math.min(3, position.column + 1)
                setPosition({ ...position, column: ArrowRight })
                break
            case 'Enter':
                if(!isMaxLength) {
                    enterCase()
                }
                break
            case 'Backspace':
                backspaceCase()
                break
            default:
                if(!isMaxLength) {
                    setNumber(`${number}${e.key}`)
                }
                break
        }
    }

    useEffect(() => {
        if(isMaxLength) {
            validate(number)
        }
    }, [isMaxLength, number])
    return (
        <div className="callback-screen">
            <div className='banner-second-screen callback-screen__banner'>
                <p className='banner-second-screen__title'>
                    Введите ваш номер мобильного телефона
                </p>
                <input
                    placeholder='+7(___)___-__-__'
                    className={
                        valid ? 'banner-second-screen__input' : 'banner-second-screen__input banner-second-screen__input_err'
                    }
                    readOnly
                    value={phoneMask(number)} />
                <p className='banner-second-screen__descr'>
                    и с Вами свяжется наш менеджер для дальнейшней консультации
                </p>
                <Numpad numpad={numPad} maxLength={16} inputHandle={inputHandle} position={position} />
                {valid
                    ? <div className='approval'>
                        <div className={
                            approval
                            ? 'approval__square approval__square_check'
                            : position.row === 5
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
                        position.row === 6
                        ? 'btn btn_focus banner-second-screen__btn'
                        : 'btn banner-second-screen__btn'
                    }
                    disabled={!(approval && valid)}>
                        Подвердить номер
                </button>
            </div>
            <ExitButton />
            <QRCodeInfo />
        </div>
    )
}

export default Callback