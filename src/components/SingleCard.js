import React from 'react'
import './SingleCard.css'
import imgCover from '../assets/images/cover.png'

export const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
                <img className='front' src={card.src} alt='card front' />
                <img className='back' src={imgCover} onClick={handleClick} alt='card back' />
            </div>
        </div>
    )
}
