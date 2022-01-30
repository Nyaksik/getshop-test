import { useNavigate } from 'react-router-dom'
import './ExitButton.css'

function ExitButton() {
    const navigate = useNavigate()
    return (
        <button className="exit-button" onClick={e => navigate('/')}>&#215;</button>
    )
}

export default ExitButton
