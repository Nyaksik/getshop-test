import { useEffect, useState, useRef } from 'react'
import Video from '../../assets/video/video.mp4'
import QRcode from '../../assets/image/qr-code.png'
import './Banner.css'

function Banner() {
    const videoPlayer = useRef(null)
    // const [seconds, setSeconds] = useState(0)

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setSeconds(Math.floor(videoPlayer.current.currentTime))
    //     }, 1000)
    //     console.log(seconds)
    //     return () => clearInterval(timer)
    // }, [seconds])
    return (
        <div className='video-player'>
            <video controls={true} ref={videoPlayer} autoPlay={true}>
                <source src={Video} type='video/mp4' />
            </video>
            <div className='banner-main video-player__banner'>
                <p className='banner-main__title'>
                    Исполните мечту вашего малыша!<br/>Подарите ему собаку!
                </p>
                <img className='banner-main__img' src={QRcode} alt='qr-code' />
                <p className='banner-main__descr'>
                    Сканируйте QR-код<br/>или нажмите ОК
                </p>
                <button className='btn'>Ок</button>
            </div>
        </div>
    )
}

export default Banner