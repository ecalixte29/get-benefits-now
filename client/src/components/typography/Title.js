import React from 'react'
import './Title.css'
const Title = ({title, subtitle}) => {
  return (
    <div className='title'>
        { subtitle && (
            <p>{subtitle}</p>
        )}
        {title && (
            <h2>{title}</h2>
        )}
    </div>
  )
}

export default Title
