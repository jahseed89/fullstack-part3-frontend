import React from 'react'

const Filter = ({onChange}) => {
  return (
    <div>
        <p>
          Fliter shown with{" "}
          <input type="text" name="search" onChange={onChange} />
        </p>
      </div>
  )
}

export default Filter