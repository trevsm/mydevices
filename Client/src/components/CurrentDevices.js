import React from 'react'
import './CurrentDevices.css'

export function Device(props) {
  return (
    <div className="input active" trace={props.device} onClick={props.callback}>
      {props.device.split('|')[2]}
    </div>
  )
}

export function DeviceList(props) {
  if (!props.currentDevices.length)
    return <div className="message">No device picked...</div>
  return props.currentDevices.map(device => {
    return <Device key={device} device={device} callback={props.callback} />
  })
}

export default function CurrentDevices(props) {
  function handleClick(e) {
    let final = [...props.currentDevices]
    const trace = e.target.getAttribute('trace')
    final = final.filter(item => {
      return trace !== item
    })

    props.setCurrentDevices(final)
  }
  return (
    <div className="currentDevices">
      <DeviceList
        currentDevices={props.currentDevices}
        callback={handleClick}
      />
    </div>
  )
}
