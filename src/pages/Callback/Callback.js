import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExitButton from '../../components/ExitButton/ExitButton'
import Numpad from '../../components/Numpad/Numpad'
import QRCodeInfo from '../../components/QRCodeInfo/QRCodeInfo'
import './Callback.css'

function Callback() {
    const navigate = useNavigate()

    const [number, setNumber] = useState('')
    const [approval, setApproval] = useState(false)
    const [position, setPosition] = useState({ row: 2, column: 2 })
    const maxLength = 16
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
        const newValue = value
            .replace(/[^0-9]/g, '')
            .replace(/^(7)?(\d[0-9]{0,2})?(\d{0,3})?(\d{0,2})?(\d{0,2})?(\d*)/g, function(_, p1, p2, p3, p4, p5) {
                return `+${p1 || '7'}(${p2 || ''})${p3 || ''}-${p4 || ''}-${p5 || ''}`
            })
        return newValue
    }

    function backspaceCase() {
        if(number.length === 2) {
            setNumber('')
        } else {
            const backSpace = number.slice(0, -1)
            setNumber(backSpace)
        }
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
            const newValue = `${number}${currentNumber}`
            const inputMask = phoneMask(newValue)
            setNumber(inputMask)
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
                enterCase()
                break
            case 'Backspace':
                backspaceCase()
                break
            default:
                const newValue = `${number}${e.key}`
                const inputMask = phoneMask(newValue)
                setNumber(inputMask)
                break
        }
    }
    return (
        <div className="callback-screen">
            <div className='banner-second-screen callback-screen__banner'>
                <p className='banner-second-screen__title'>
                    Введите ваш номер мобильного телефона
                </p>
                <input placeholder='+7(___)___-__-__' className='banner-second-screen__input' readOnly value={number} />
                <p className='banner-second-screen__descr'>
                    и с Вами свяжется наш менеджер для дальнейшней консультации
                </p>
                <Numpad numpad={numPad} inputHandle={inputHandle} position={position} />
                <div className='approval'>
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
                <button
                    className={
                        position.row === 6
                        ? 'btn btn_focus banner-second-screen__btn'
                        : 'btn banner-second-screen__btn'
                    }
                    disabled={!(isMaxLength && approval)}>
                        Подвердить номер
                </button>
            </div>
            <ExitButton />
            <QRCodeInfo />
        </div>
    )
}

export default Callback
