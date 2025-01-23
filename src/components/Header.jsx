import React from 'react';
import '../styles.css';

export default function Header()
{
    return(
        <div className='header'>
            <img className='logo' src='logo.png' alt='MOVIEDUX'></img>
            <h2 className='app-subtitle'>watch your favourite movie here</h2>
        </div>
    );
}