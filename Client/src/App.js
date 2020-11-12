import React, { useState, useEffect } from 'react'
import CategoryInputs from './components/CategoryInputs'
import DeviceView from './components/DeviceView'
import 'minireset.css'

export default function App() {
  const [devices, setDevices] = useState({})
  const [currentDevices, setCurrentDevices] = useState([
    'Apple iPhone 5',
  ])
  useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/trevsm/6a99a2e4b55b767687f7d7eb28cb7454/raw/cb4db3ad1ab83fb4b5007f0b8bb31f215951c36a/devices.json'
    )
      .then(data => data.json())
      .then(json => {
        setDevices(json)
      })
  }, [])
  return (
    <>
      <CategoryInputs devices={devices} setCurrentDevices={setCurrentDevices} />
      <DeviceView devices={devices} currentDevices={currentDevices} />
    </>
  )
}
