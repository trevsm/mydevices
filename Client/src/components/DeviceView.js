import React, { useState } from 'react'
import './DeviceView.css'

export default function DeviceViews(props) {
  const [scale, setScale] = useState(0.5)
  function handleLoad(e){
    console.log(e.target)
  }
  function views() {
    return props.currentDevices.map(name => {
      const obj = props.devices[name]
      return (
        <div
          className={`${name} device`}
          key={name}
          
        >
          <img
            src={`http://localhost:5000/api?q=${props.url}&width=${obj.width}&height=${obj.height})`}
            alt={name}
            style={{
              width: obj.width * scale,
              height: obj.height * scale,
            }}
            onLoad={handleLoad}
          />
        </div>
      )
    })
  }
  return <div className="viewContainer">{views()}</div>
}
