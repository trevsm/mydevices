import React from 'react'
import './CategoryInputs.css'

export default function CategoryInputs(props) {
  function toggleActive(trace) {
    let final = [...props.currentDevices]

    if (props.currentDevices.includes(trace)) {
      final = final.filter(item => item !== trace)
    }

    if (final.length >= 3) {
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

  function toggleOpen(e) {
    const parent = e.target.parentElement
    parent.classList.toggle('open')
    closeOtherOpenCategories(parent)
  }

  function closeOtherOpenCategories(elem) {
    const group = document.querySelectorAll(`.${elem.getAttribute('group')}`)
    group.forEach(curr => {
      if (elem !== curr) {
        curr.classList.remove('open')
      }
    })
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
            onClick={toggleOpen}
          >
            {category}
          </label>
          <div className="options">
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
                    onClick={toggleOpen}
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

  function urlChangeHandler() {
    props.setUrl(document.querySelector('#url').value)
    if (props.currentDevices.length === 0) {
      props.setCurrentDevices(['Phones|Apple|iPhone 4'])
    }
  }

  function clearAllHandler() {
    document.querySelectorAll('.open').forEach(x => {
      x.classList.remove('open')
    })
    props.setCurrentDevices([])
  }

  return (
    <>
      <div className="urlInput">
        <input id="url" type="text" placeholder="https://example.com" />
        <button onClick={urlChangeHandler}>Go</button>
        <button onClick={clearAllHandler}>Clear All</button>
      </div>
      <div className="inputList">{inputList()}</div>
    </>
  )
}
