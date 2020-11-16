import React from 'react'
import './UrlInput.css'

export default function UrlInput(props) {
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
    <div className="urlInput">
      <input id="url" type="text" placeholder="https://example.com" />
      <button onClick={urlChangeHandler}>Go</button>
      <button onClick={clearAllHandler}>Clear All</button>
    </div>
  )
}
