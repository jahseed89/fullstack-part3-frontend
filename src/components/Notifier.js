import React from 'react'

const Notifier = ({notifier}) => {
    if(notifier === null) {
        return null
    }
  return (
    <div style={{padding: '1rem .5rem', border: '2px solid green'}}>{notifier}</div>
  )
}

export default Notifier