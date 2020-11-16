import React from 'react'
import CurrentDevices from "./CurrentDevices"
import './CategoryInputs.css'

export default function CategoryInputs(props) {
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

  function inputList() {
    const currentTraceList = props.currentDevices

    const amIActive = type => {
      return currentTraceList.join(', ').includes(type.join('|'))
    }

    return Object.keys(props.devices).map((category, ia) => {
      return (
        <div
          className={`category ${category}`}
          group="category"
          name={category}
          key={category}
          tabIndex={ia + 1}
        >
          <label
            className={`${amIActive([category]) ? 'active' : ''}`}
            htmlFor={category}
          >
            {category}
          </label>
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
                  <label
                    className={`${
                      amIActive([category, company]) ? 'active' : ''
                    }`}
                    htmlFor={company}
                  >
                    {company}
                  </label>
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
    <div className="inputList">
      <CurrentDevices
        currentDevices={props.currentDevices}
        setCurrentDevices={props.setCurrentDevices}
      />
      {inputList()}
    </div>
  )
}
