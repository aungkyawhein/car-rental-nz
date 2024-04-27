import React, { useEffect, useState } from 'react'
import './App.css'
import logo from './assets/logo.png'

export interface CarModel {
  name: string,
  perHr: number,
  perKm: number,
  perDay: number,
  price: number
}

function App() {
  const [data, setData] = useState({
    km: 0,
    hr: 0
  })
  const [daily, toggleDaily] = useState(false)
  const cityhop = [
    {
      name: 'YARIS',
      perHr: 10.50,
      perKm: 0.45,
      perDay: 63,
    },
    {
      name: 'COROLLA',
      perHr: 12.50,
      perKm: 0.45,
      perDay: 75
    },
    {
      name: 'RAV 4',
      perHr: 13.75,
      perKm: 0.45,
      perDay: 82.50
    },
    {
      name: 'E-GOLF',
      perHr: 20,
      perKm: 0,
      perDay: 120
    },
  ]
  const calcPrice = (perHr: number, perKm: number) => {
    const hr = (data.hr > 6) ? 6 : data.hr
    const price = (perHr * hr) + (perKm * data.km)
    return Number(price.toFixed(2))
  }
  const [cars, updateCars] = useState(
    cityhop.map((car) => {
      return {
        ...car,
        price: calcPrice(car.perHr, car.perKm)
      }
    })
  )

  useEffect(() => {
    toggleDaily(data.hr > 6)
    updateCars((cars) => {
      return cars.map((car: CarModel) => {
        return {
          ...car,
          price: calcPrice(car.perHr, car.perKm)
        }
      })
    })
  }, [data])

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget
    let val = +value
    if (name === 'hr' && val > 24) {
      val = 24
    }
    setData((oldData) => (
      { ...oldData, [name]: val }
    ))
  }

  return (
    <>
      <div className='background'>
        <img className='logo' alt='Car wheel' src={logo} width={100} height={100} />
      </div>
      <div className='content'>
        <h1>Car rental price</h1>
        <p>Price comparison for car rental (currently CityHop) based on distance and duration.</p>
        <label>
          <input type='number' id='km' name='km' onChange={handleChange} value={Number(data.km).toString()} min={0} /> km
        </label>
        <label>
          <input type='number' id='hr' name='hr' onChange={handleChange} value={Number(data.hr).toString()} min={0} /> hr
        </label>
        {daily && <p><small>More than 6 hrs is 1 day.</small></p>}
        <CarsList cars={cars} daily={daily} />
      </div>
    </>
  )
}

function CarsList(props: {cars: Array<CarModel>, daily: boolean}) {
  const {cars, daily} = props
  const [lowestIndex, setLowestIndex] = useState(0)

  useEffect(() => {
    setLowestIndex(() => {
      const car = cars.reduce((accumulator: CarModel, currentValue: CarModel) =>
        currentValue.price < accumulator.price ? currentValue : accumulator
      )
      const carIndex = cars.indexOf(car)
      return carIndex
    })
  }, [cars, lowestIndex])

  function Table() {
    return (
      <table>
        <thead>
          <tr>
            <th>Car</th>
            <th>Hourly Rate</th>
            <th>Daily Rate (+6 hrs)</th>
            <th>Distance Rate (per km)</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
        {
          cars.map((car, i) => {
            return (
              <tr key={i} className={lowestIndex === i ? 'highlight' : ''}>
                <td>{car.name}</td>
                <td>
                  <span className={daily ? 'disabled' : 'active'}>
                    $ {car.perHr}
                  </span>
                </td>
                <td>
                  <span className={daily ? 'active' : 'disabled'}>
                    $ {car.perDay}
                  </span>
                </td>
                <td>$ {car.perKm}</td>
                <td>
                  <span>
                    $ {car.price}
                  </span>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    )
  }

  function List() {
    return (
      <div className='cars'>
        {
          cars.map((car, i) => {
            return (
              <div key={i} className={lowestIndex === i ? 'car highlight' : 'car'}>
                <div className='car-name'>
                  <strong>{car.name}</strong>
                  <span>
                    ${car.price}
                  </span>
                </div>
                <div>${car.perKm} / km</div>
                <div>
                  <span className={daily ? 'disabled' : 'active'}>
                    ${car.perHr} / hr
                  </span>
                  <span className='separator'>|</span>
                  <span className={daily ? 'active' : 'disabled'}>
                    ${car.perDay} / day
                  </span>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <>
      <Table />
      <List />
    </>
  )
}

export default App
