import React, { useState } from 'react'
import './UrlInput.css'

export default function UrlInput(props) {
  const [validUrl, setValidUrl] = useState(false)
  function urlChangeHandler() {
    props.setUrl(document.querySelector('#url').value)
    if (props.currentDevices.length === 0) {
      props.setCurrentDevices(['Phones|Apple|iPhone 4'])
    }
  }

  function handleTyping(e) {
    if (
      e.target.value.match(
        /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/gim
      )
    ) {
      if (validUrl == false) setValidUrl(true)
    } else {
      if (validUrl == true) setValidUrl(false)
    }
  }

  return (
    <div className="urlInput">
      <input
        id="url"
        type="text"
        placeholder="https://example.com"
        onInput={handleTyping}
      />
      <button
        onClick={urlChangeHandler}
        className={validUrl ? 'valid' : 'invalid'}
      >
        Go
      </button>
    </div>
  )
}
