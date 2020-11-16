import React from 'react'
import './CurrentDevices.css'

export default function CurrentDevices(props) {
  function handleClick(e) {
      let final = [...props.currentDevices]
      const trace = e.target.getAttribute('trace')
      final = final.filter(item => {
          return trace !== item
      })

      props.setCurrentDevices(final)
  }
  function devices() {
    return props.currentDevices.map(device => {
      return (
        <div className="input active" trace={device} onClick={handleClick}>
          {device.split('|')[2]}
        </div>
      )
    })
  }
  return <div className="currentDevices">{devices()}</div>
}
