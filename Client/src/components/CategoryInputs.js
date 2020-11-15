import React from 'react'
import './CategoryInputs.css'

export default function CategoryInputs(props) {
  function toggleActive(deviceName) {
    let final = [...props.currentDevices]

    if (props.currentDevices.includes(deviceName)) {
      final = final.filter(item => item !== deviceName)
    }

    if (final.length >= 3) {
      final.shift()
    }

    if (!props.currentDevices.includes(deviceName)) {
      final.push(deviceName)
    }

    props.setCurrentDevices(final)
  }

  function handleInputClick(e) {
    const target = e.target
    const traceBack = target.getAttribute('trace-back')
    const traceBackElems = document.querySelectorAll(traceBack)

    traceBackElems.forEach((node)=>{
      node.querySelector('label').classList.toggle('active')
    })

    const value = target.getAttribute('value')
    toggleActive(value)
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
    return Object.keys(props.devices).map((category, ia) => {
      return (
        <div
          className={`category ${category}`}
          group="category"
          name={category}
          key={category}
          tabIndex={ia + 1}
        >
          <label htmlFor={category} onClick={toggleOpen}>
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
                  <label htmlFor={company} onClick={toggleOpen}>
                    {company}
                  </label>
                  <div className="options">
                    {Object.keys(props.devices[category][company]).map(
                      deviceName => {
                        const active = props.currentDevices.includes(deviceName)
                          ? ' active'
                          : ''
                        return (
                          <div
                            className={`input${active}`}
                            trace-back={`.${company}, .${category}`}
                            key={deviceName}
                            value={deviceName}
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
      props.setCurrentDevices(['BlackBerry Z30'])
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
      <div className="inputList">{inputList()}</div>
      <div className="urlInput">
        <input id="url" type="text" placeholder="https://example.com" />
        <button onClick={urlChangeHandler}>Go</button>
        <button onClick={clearAllHandler}>Clear All</button>
      </div>
    </>
  )
}
