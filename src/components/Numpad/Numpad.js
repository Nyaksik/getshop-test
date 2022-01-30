import './Numpad.css'

function Numpad({ numpad, inputHandle, position }) {
    return (
        <div className='numpad' onKeyDown={inputHandle}>
            {
                numpad.map((it) => {
                    return (
                        <button
                            key={it.value}
                            autoFocus={it.value === '5'}
                            className={
                                position.row === it.row && position.column === it.column
                                ? 'btn btn_focus numpad__btn'
                                : 'btn numpad__btn'
                            }>
                            {it.value}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default Numpad
