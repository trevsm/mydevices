import React from 'react'
import './CategoryInputs.css'

export default function CategoryInputs(props) {
  function toggleActive(deviceName) {
    let final = [...props.currentDevices]

    if (props.currentDevices.includes(deviceName)) {
      final = final.filter(item => item !== deviceName)
    }

    if (final.length >= 3) {
      final.shift()
    }
    
    if (!props.currentDevices.includes(deviceName)) {
      final.push(deviceName)
    }
    
    props.setCurrentDevices(final)
  }

  function handleInputClick(e) {
    const target = e.target
    const value = target.getAttribute('value')
    toggleActive(value)
  }

  function inputList() {
    return Object.keys(props.devices).map(deviceName => {
      return (
        <div
          className={`input ${
            props.currentDevices.includes(deviceName) ? 'active' : ''
          }`}
          key={deviceName}
          value={deviceName}
          onClick={handleInputClick}
        >
          {deviceName}
        </div>
      )
    })
  }

  function urlChangeHandler() {
    props.setUrl(document.querySelector('#url').value)
    if(props.currentDevices.length === 0){
      props.setCurrentDevices(["BlackBerry Z30"])
    }
  }
  function clearAllHandler() {
    props.setCurrentDevices([])
  }

  return (
    <>
      <div className="inputList">{inputList()}</div>
      <div className="urlInput">
        <input id="url" type="text" placeholder="https://example.com" />
        <button onClick={urlChangeHandler}>Go</button>
        <button onClick={clearAllHandler}>Clear All</button>
      </div>
    </>
  )
}
