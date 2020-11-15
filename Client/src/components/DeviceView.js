import React, { useEffect, useState } from 'react'
import './DeviceView.css'

export function Device(props) {
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
  }, [props.url])

  const p = props.path.split('|')
  const name = p[2]
  const obj = props.devices[p[0]][p[1]][p[2]]
  const [width, height] = [obj.width+100, obj.height]
  return (
    <div className={`${name} device${loading ? ' loading' : ''} ${obj.bezel}`} key={name}>
      <img
        src={`http://localhost:5000/api?q=${props.url}&width=${width}&height=${height})`}
        alt={name}
        style={{
          width: width * props.scale,
          height: height * props.scale,
        }}
        onLoad={() => {
          setLoading(false)
        }}
      />
    </div>
  )
}

export default function DeviceViews(props) {
  const [scale, setScale] = useState(.4)

  function views() {
    return props.currentDevices.map(path => {
      return (
        <Device
          path={path}
          devices={props.devices}
          url={props.url}
          scale={scale}
        />
      )
    })
  }
  return <div className="viewContainer">{views()}</div>
}
