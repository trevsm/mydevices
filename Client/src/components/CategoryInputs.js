import React, { useState } from 'react'
import CurrentDevices from './CurrentDevices'
import OpenIcon from '../icons/Open'
import './CategoryInputs.css'

export default function CategoryInputs(props) {
  const [open, setOpen] = useState(false)

  function toggleActive(trace) {
    let final = [...props.currentDevices]

    if (props.currentDevices.includes(trace)) {
      final = final.filter(item => item !== trace)
    }

    if (final.length >= props.maxDeviceLimit) {
      final.shift()
    }

    if (!props.currentDevices.includes(trace)) {
      final.push(trace)
    }

    props.setCurrentDevices(final)
  }

  function handleInputClick(e) {
    const target = e.target
    const trace = target.getAttribute('trace')
    toggleActive(trace)
  }

  function toggleInputList() {
    // document.querySelector('#root').classList.toggle('disabled')
    setOpen(!open)
  }

  function inputList() {
    // const currentTraceList = props.currentDevices

    // const amIActive = type => {
    //   return currentTraceList.join(', ').includes(type.join('|'))
    // }

    return Object.keys(props.devices).map((category, ia) => {
      return (
        <div
          className={`category ${category}`}
          group="category"
          name={category}
          key={category}
          tabIndex={ia + 1}
        >
          <label htmlFor={category}>{category}</label>
          <div className="group">
            {Object.keys(props.devices[category]).map((company, ib) => {
              return (
                <div
                  className={`company ${company}`}
                  group="company"
                  name={company}
                  key={company}
                  tabIndex={ib + 1 * 10}
                >
                  <label htmlFor={company}>{company}</label>
                  <div className={`options`}>
                    {Object.keys(props.devices[category][company]).map(
                      deviceName => {
                        const trace = [category, company, deviceName]
                        const active = props.currentDevices.includes(
                          trace.join('|')
                        )
                          ? ' active'
                          : ''
                        return (
                          <div
                            className={`input${active}`}
                            key={deviceName}
                            trace={trace.join('|')}
                            onClick={handleInputClick}
                          >
                            {deviceName}
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    })
  }

  return (
    <div className={`inputList${open ? ' open' : ''}`}>
      <div className="top">
        <CurrentDevices
          currentDevices={props.currentDevices}
          setCurrentDevices={props.setCurrentDevices}
        />
        <div onClick={toggleInputList}>
          <OpenIcon />
        </div>
      </div>
      <div className="main">{inputList()}</div>
    </div>
  )
}
