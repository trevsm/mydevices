import React from 'react'
import Spinner from './Spinner'
import './DeviceView.css'

export default function DeviceViews(props) {
  function views() {
    return props.currentDevices.map(name => {
      const obj = props.devices[name]
      return (
        <div
          className={`${name} device`}
          key={name}
          style={{ width: obj.width / 3, height: obj.height / 3 }}
        >
          <div className="spinner">
            <Spinner />
          </div>
          <img
            src={`http://localhost:5000/api?q=${props.url}&width=${obj.width}&height=${obj.height}`}
            id="Laptop"
            title={name}
            alt={name}
          />
        </div>
      )
    })
  }
  return <div className="viewContainer">{views()}</div>
}
