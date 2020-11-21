import React, { useEffect, useState } from 'react'
import NoDevices from '../icons/NoDevices'
import './DeviceView.css'

export function Device(props) {
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState('portrait')

  useEffect(() => {
    setLoading(true)
  }, [props.url])

  const p = props.path.split('|')
  const name = p[2]
  const obj = props.devices[p[0]][p[1]][p[2]]
  let [width, height] = [obj.width + 100, obj.height]

  return (
    <div className={'deviceWrapper ' + mode}>
      <span className="deviceLabel">{`${name} ${width}x${height}`}</span>
      <div
        className={`${name} device${loading ? ' loading' : ''} ${obj.bezel}`}
        key={name}
      >
        <img
          src={`${props.apiDomain}?q=${props.url}&width=${mode=='portrait'?width:height}&height=${mode=='portrait'?height:width}&mode=${mode}`}
          alt={name}
          style={{
            minWidth: width * props.scale,
            height: height * props.scale,
          }}
          onLoad={() => {
            setLoading(false)
          }}
        />
      </div>
    </div>
  )
}

export default function DeviceViews(props) {
  const [scale, setScale] = useState(0.4)

  function views() {
    return props.currentDevices.map(path => {
      return (
        <Device
          key={path}
          path={path}
          apiDomain={props.apiDomain}
          devices={props.devices}
          url={props.url}
          scale={scale}
        />
      )
    })
  }
  return (
    <div className="viewContainer">
      {props.currentDevices.length ? (
        views()
      ) : (
        <div className="noDevices">
          <NoDevices />
          <span className="message">No devices selected.</span>
        </div>
      )}
    </div>
  )
}
