import { useRef, useState } from 'react'
import Slide1 from '../../assets/image/slide-1.png'
import Slide2 from '../../assets/image/slide-2.png'
import Slide3 from '../../assets/image/slide-3.png'
import ExitButton from '../../components/ExitButton/ExitButton'
import './InfoSlider.css'

function InfoSlider() {
    const imgRef1 = useRef(null)
    const imgRef2 = useRef(null)
    const imgRef3 = useRef(null)
    const [currentSlide, setCurrnetSlide] = useState(1)
    const [direction, setDirection] = useState('rigth')
    const width = 1500
    const minSlide = currentSlide === 1
    const maxSlide = currentSlide === 3

    const imgs = [
        {
            id: 1,
            src: Slide1,
            ref: imgRef1
        },
        {
            id: 2,
            src: Slide2,
            ref: imgRef2
        },
        {
            id: 3,
            src: Slide3,
            ref: imgRef3
        },
    ]

    function keyArrowLeft() {
        let currentImg, prevtImg
        switch(currentSlide) {
            case 1:
                currentImg = imgRef1
                break
            case 2:
                prevtImg = imgRef1
                currentImg = imgRef2
                break
            case 3:
                prevtImg = imgRef2
                currentImg = imgRef3
                break
        }
        if(!minSlide) {
            prevtImg.current.style.transform = `translateX(0px)`
            currentImg.current.style.transform = `translateX(${width}px)`
            setDirection('left')
        } else {
            setDirection('')
        }
        setCurrnetSlide(Math.max(1, currentSlide - 1))
    }

    function keyArrowRigth() {
        let currentImg, nextImg
        switch(currentSlide) {
            case 1:
            currentImg = imgRef1
            nextImg = imgRef2
            break
            case 2:
            currentImg = imgRef2
            nextImg = imgRef3
            break
            case 3:
            currentImg = imgRef3
            break
        }
        if(!maxSlide) {
            nextImg.current.style.transform = `translateX(0px)`
            currentImg.current.style.transform = `translateX(-${width}px)`
            setDirection('rigth')
        } else {
            setDirection('')
        }
        setCurrnetSlide(Math.min(currentSlide + 1, 3))
    }

    function sliderControler(e) {
        switch(e.key) {
            case 'ArrowRight':
                keyArrowRigth()
                break
            case 'ArrowLeft':
                keyArrowLeft()
                break
        }
    }
    
    return (
        <div className='info-slider'>
            {
                imgs.map(it => {
                    return <img
                        key={it.id}
                        className={currentSlide === it.id ? 'info-slider__img' : 'info-slider__img info-slider__img_translate'}
                        ref={it.ref}
                        src={it.src}
                        alt={`slide${it.id}`} />
                })
            }
            <div className='info-slider__buttons-block buttons-block'>
                <button className={direction === 'left' ? 'buttons-block__button buttons-block__button_active' : 'buttons-block__button'}>Влево</button>
                <button className={direction === 'rigth' ? 'buttons-block__button buttons-block__button_active' : 'buttons-block__button'} autoFocus onKeyDown={sliderControler}>Вправо</button>
            </div>
            <ExitButton />
        </div>
    )
}

export default InfoSlider