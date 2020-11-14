import React, { useState} from 'react'
import devices from './deviceList/devices.json';
import CategoryInputs from './components/CategoryInputs'
import DeviceView from './components/DeviceView'
import 'minireset.css'
import './App.css'

export default function App() {
  const [url, setUrl] = useState('https://example.com')
  const [currentDevices, setCurrentDevices] = useState(['BlackBerry Z30'])

  return (
    <>
      <CategoryInputs
        devices={devices}
        setUrl={setUrl}
        url={url}
        currentDevices={currentDevices}
        setCurrentDevices={setCurrentDevices}
      />
      <DeviceView devices={devices} url={url} currentDevices={currentDevices} />
    </>
  )
}
