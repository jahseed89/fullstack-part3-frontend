import React from 'react'

const InvalidNotification = ({invalidInfo}) => {
    if(invalidInfo === null) {
        return null
    }
  return (
    <div style={{border: '1px solid red', color: 'red'}}>{invalidInfo}</div>
  )
}

export default InvalidNotification