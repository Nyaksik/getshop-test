import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Video from '../../assets/video/video.mp4'
import QRcode from '../../assets/image/qr-code.png'
import './Promo.css'

function Promo() {
    const navigate = useNavigate()

    const videoPlayer = useRef(null)
    const okButton = useRef(null)

    const [seconds, setSeconds] = useState(0)

    function handleEnterPress(e) {
        if(e.key === 'Enter') {
            navigate('/callback')
        }
    }

    useEffect(() => {
        if(okButton.current) {
            okButton.current.focus()
        }
    }, [seconds])

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(Math.floor(videoPlayer.current.currentTime))
        }, 1000)
        return () => clearInterval(timer)
    }, [])
    return (
        <div className='video-player'>
            <video ref={videoPlayer} muted={true} autoPlay={true}>
                <source src={Video} type='video/mp4' />
            </video>
            {seconds >= 5 && 
                <div className='banner-main video-player__banner'>
                    <p className='banner-main__title'>
                        Исполните мечту вашего малыша!<br/>Подарите ему собаку!
                    </p>
                    <img className='banner-main__img' src={QRcode} alt='qr-code' />
                    <p className='banner-main__descr'>
                        Сканируйте QR-код<br/>или нажмите ОК
                    </p>
                    <button ref={okButton} onKeyPress={handleEnterPress} className='btn'>Ок</button>
                </div>}
        </div>
    )
}

export default Promo