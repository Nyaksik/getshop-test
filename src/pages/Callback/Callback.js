import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react/cjs/react.development'
import ExitButton from '../../components/ExitButton/ExitButton'
import QRCodeInfo from '../../components/QRCodeInfo/QRCodeInfo'
import './Callback.css'

function Callback() {
    const numPadRef = useRef(null)
    const navigate = useNavigate()

    const [number, setNumber] = useState('')
    const [approval, setApproval] = useState(false)
    const [rowsColumns, setRowsColumns] = useState({ row: 2, column: 2 })

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
        if(rowsColumns.row === 4 && rowsColumns.column === 1) {
            backspaceCase()
        } else if(rowsColumns.row === 5) {
            setApproval(!approval)
        } else if(rowsColumns.row === 6) {
            navigate('/info')
        } else {
            const currentNumber = numPad.filter(it => it.row === rowsColumns.row && it.column === rowsColumns.column)[0].value
            const newValue = `${number}${currentNumber}`
            const inputMask = phoneMask(newValue)
            setNumber(inputMask)
        }
    }

    function inputHandle(e) {
        switch(e.key) {
            case 'ArrowUp':
                const ArrowUp = Math.max(1, rowsColumns.row - 1)
                setRowsColumns({ ...rowsColumns, row: ArrowUp })
                console.log()
                break
            case 'ArrowDown':
                if(approval && number.length === 16) {
                    const ArrowDown = Math.min(6, rowsColumns.row + 1)
                    setRowsColumns({ ...rowsColumns, row: ArrowDown })
                } else {
                    const ArrowDown = Math.min(5, rowsColumns.row + 1)
                    setRowsColumns({ ...rowsColumns, row: ArrowDown })
                }
                break
            case 'ArrowLeft':
                const ArrowLeft = Math.max(1, rowsColumns.column - 1)
                setRowsColumns({ ...rowsColumns, column: ArrowLeft })
                break
            case 'ArrowRight':
                const ArrowRight = Math.min(3, rowsColumns.column + 1)
                setRowsColumns({ ...rowsColumns, column: ArrowRight })
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
    
    useEffect(() => {
        numPadRef.current.focus()
    })
    return (
        <div className="callback-screen">
            <div className='banner-second-screen callback-screen__banner'>
                <p className='banner-second-screen__title'>
                    Введите ваш номер мобильного телефона
                </p>
                <input placeholder='+7(___)___-__-__' className='banner-second-screen__input' readOnly value={number} onChange={inputHandle} />
                <p className='banner-second-screen__descr'>
                    и с Вами свяжется наш менеджер для дальнейшней консультации
                </p>
                <div className='numpad' onKeyDown={inputHandle}>
                    {
                        numPad.map((it, index) => {
                            if(index === 4) {
                                return (
                                    <button
                                        key={index}
                                        ref={numPadRef}
                                        className={
                                            rowsColumns.row === it.row && rowsColumns.column === it.column
                                            ? 'btn btn_focus numpad__btn'
                                            : 'btn numpad__btn'
                                            }>
                                        {it.value}
                                    </button>
                                )
                            }
                            return (
                                <button
                                    key={index}
                                    className={
                                        rowsColumns.row === it.row && rowsColumns.column === it.column
                                        ? 'btn btn_focus numpad__btn'
                                        : 'btn numpad__btn'
                                        }>
                                    {it.value}
                                </button>
                            )
                        })
                    }
                </div>
                <div className='approval'>
                    <div className={
                        approval
                        ? 'approval__square approval__square_check'
                        : rowsColumns.row === 5
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
                        rowsColumns.row === 6
                        ? 'btn btn_focus banner-second-screen__btn'
                        : 'btn banner-second-screen__btn'
                    }
                    disabled={!(number.length === 16 && approval)}>
                        Подвердить номер
                </button>
            </div>
            <ExitButton />
            <QRCodeInfo />
        </div>
    )
}

export default Callback
