import React, { useEffect } from 'react'
import './DeviceView.css'

export default function DeviceViews(props) {
  const url = 'https://dotspencer.com'
  function views() {
    if (JSON.stringify(props.devices) !== '{}') {
      return props.currentDevices.map(name => {
        const obj = props.devices[name]
        const width = obj.height
        const height = obj.width
        return (
          <img
            key={name}
            src={`http://localhost:5000/api?q=${url}&width=${width}&height=${height}`}
            id="Laptop"
            title={name}
            alt={name}
            style={{ width: width / 3, height: height / 3 }}
          />
        )
      })
    } else {
      return 'loading'
    }
  }
  useEffect(() => {}, [props.devices])
  return <div className="viewContainer">{views()}</div>
}
