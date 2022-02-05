import './ExitButton.css'

function ExitButton({ column, autoFocus, enterPress }) {
    return (
        <button
        autoFocus={autoFocus}
        className={column === 4 || autoFocus ? "exit-button exit-button_focus" : "exit-button"}
        onKeyDown={enterPress}>
            &#215;
        </button>
    )
}

export default ExitButton
