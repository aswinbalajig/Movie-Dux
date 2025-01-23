import React from 'react'
import '../styles.css'

function returnDate()
{
    return new Date().getFullYear();
}

export default function Footer()
{   
    return (
        <footer className='footer'>
          <p className='footer-text'>©{returnDate()}MOVIEDUX</p>
        </footer>
    );
    
}
