import React, { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState({
    km: 0,
    hr: 0
  })
  const [price, setPrice] = useState(0)
  const perHr = 10.50
  const perKm = 0.45

  function handleClick() {
    setPrice((perHr * data.hr) + (perKm * data.km))
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget
    setData((oldData) => (
      { ...oldData, [name]: value }
    ))
  }

  return (
    <>
      <h1>Car rental price</h1>
      <p>Price comparison for car rental (currently CityHop) based on distance and duration.</p>
      <input type='number' id='km' name='km' onChange={handleChange} />
      <input type='number' id='hr' name='hr' onChange={handleChange} />
      <button onClick={handleClick}>Calculate</button>
      <p>Your price = {price}</p>
    </>
  )
}

export default App
