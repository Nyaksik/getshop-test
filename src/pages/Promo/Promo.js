import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Video from '../../assets/video/video.mp4'
import QRcode from '../../assets/image/qr-code.png'
import './Promo.css'

function Promo() {
    const navigate = useNavigate()

    const videoPlayer = useRef(null)
    const [seconds, setSeconds] = useState(0)
    const isShow = seconds >= 5

    function handleEnterPress(e) {
        if(e.key === 'Enter') {
            sessionStorage.setItem('currentTime', videoPlayer.current.currentTime)
            navigate('/callback')
        }
    }

    useEffect(() => {
        const currentTime = sessionStorage.getItem('currentTime')
        videoPlayer.current.currentTime = currentTime
        videoPlayer.current.play()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(Math.floor(videoPlayer.current.currentTime))
        }, 1000)
        return () => clearInterval(timer)
    }, [])
    return (
        <div className='video-player'>
            <video ref={videoPlayer} muted autoPlay>
                <source src={Video} type='video/mp4' />
            </video>
            {isShow && 
                <div className='banner-main video-player__banner'>
                    <p className='banner-main__title'>
                        Исполните мечту вашего малыша!<br/>Подарите ему собаку!
                    </p>
                    <img className='banner-main__img' src={QRcode} alt='qr-code' />
                    <p className='banner-main__descr'>
                        Сканируйте QR-код<br/>или нажмите ОК
                    </p>
                    <button  onKeyPress={handleEnterPress} autoFocus className='btn btn_focus'>Ок</button>
                </div>}
        </div>
    )
}

export default Promo