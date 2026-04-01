"use client"
import React from 'react'
import Countdown from 'react-countdown';

// Dynamic: always 24 hours from now
const endingDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

const CountDown = () => {
  return (
    <Countdown 
      className='font-bold text-5xl text-yellow-300' 
      date={endingDate} 
    />
  )
}

export default CountDown