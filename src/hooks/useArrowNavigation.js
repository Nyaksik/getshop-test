import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useArrowNavigation(numPad) {
    const navigate = useNavigate()
    const [number, setNumber] = useState('')
    const [approval, setApproval] = useState(false)
    const [position, setPosition] = useState({ row: 2, column: 2 })
    const maxLength = 11
    const isMaxLength = number.length === maxLength

    function backspaceCase() {
        if(number.length < 2) {
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
        } else if(position.column === 4) {
            navigate('/')
        } else {
            const currentNumber = numPad.find(it => it.row === position.row && it.column === position.column)?.value
            if(!isMaxLength) {
                setNumber(`${number}${currentNumber}`)
            }
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
                const ArrowRight = Math.min(4, position.column + 1)
                setPosition({ ...position, column: ArrowRight })
                break
            case 'Enter':
                enterCase()
                break
            case 'Backspace':
                backspaceCase()
                break
            default:
                const onlyNumber = e.key.replace(/\D/, '')
                if(!isMaxLength) {
                    setNumber(`${number}${onlyNumber}`)
                }
                break
        }
    }

    return {
        number, approval, position, isMaxLength, inputHandle
    }
}