import React from 'react'
import './CategoryInputs.css'

export default function CategoryInputs(props) {
  const categories = [
    'Apple',
    'HP',
    'Dell',
    'LG',
    'HTC',
    'Samsung',
    'Lenovo',
    'Atari',
    'Amiga',
    'Nintendo',
    'Windows',
  ]

  function singleList(category) {
    return (
      <div className="category" key={category}>
        <label htmlFor={category}>{category}</label>
        <select id={category}>
          <option defaultValue value>
            -- None --
          </option>
          {Object.keys(props.devices).map(deviceName => {
            if (deviceName.includes(category))
              return (
                <option key={deviceName} value={deviceName}>
                  {deviceName}
                </option>
              )
          })}
        </select>
      </div>
    )
  }

  function allDropDownLists(categories) {
    return (
      <div className="categories">
        {categories.map(item => {
          return singleList(item)
        })}
      </div>
    )
  }

  return <>{allDropDownLists(categories)}</>
}
