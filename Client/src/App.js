import React, { useState } from 'react'
import devices from './deviceList/devices.json'
import CategoryInputs from './components/CategoryInputs'
import DeviceView from './components/DeviceView'
import UrlInput from './components/UrlInput'
import 'minireset.css'
import './App.css'

export default function App() {
  const [url, setUrl] = useState('https://example.com')
  const [currentDevices, setCurrentDevices] = useState([
    'Phones|Apple|iPhone 4',
  ])

  const maxDeviceLimit = 5
  const apiDomain = 'http://143.198.111.217/api'

  return (
    <>
      <UrlInput
        setUrl={setUrl}
        currentDevices={currentDevices}
        setCurrentDevices={setCurrentDevices}
      />
      <DeviceView
        apiDomain={apiDomain}
        devices={devices}
        url={url}
        currentDevices={currentDevices}
      />
      <CategoryInputs
        maxDeviceLimit={maxDeviceLimit}
        devices={devices}
        setUrl={setUrl}
        url={url}
        currentDevices={currentDevices}
        setCurrentDevices={setCurrentDevices}
      />
    </>
  )
}
