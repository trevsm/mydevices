import React, { useState } from 'react'
import Search from '../icons/Search'
import './UrlInput.css'

export default function UrlInput(props) {
  const [validUrl, setValidUrl] = useState(false)

  function handleTyping(e) {
    if (
      e.target.value.match(
        /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/gim
      )
    ) {
      if (validUrl == false) {
        setValidUrl(true)
      }
    } else {
      if (validUrl == true) setValidUrl(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (validUrl) {
      const form = document.querySelector('.form')
      if(!form.url.value.match(/(https?:\/\/)/g)){
        form.url.value = 'https://'+form.url.value
      }
      props.setUrl(form.url.value)
      if (props.currentDevices.length === 0) {
        props.setCurrentDevices(['Phones|Apple|iPhone 4'])
      }
    } else {
      console.log('invalid url')
    }
  }

  return (
    <div className="urlInput">
      <form className="form" onSubmit={handleSubmit}>
        <input
          id="url"
          name="url"
          type="text"
          className={validUrl ? 'valid' : 'invalid'}
          placeholder="https://example.com"
          onInput={handleTyping}
        />
        <div className="searchIcon" onClick={handleSubmit}>
          <Search />
        </div>
      </form>
    </div>
  )
}
