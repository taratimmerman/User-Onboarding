import React from 'react'

function User({ details }) {
  if (!details) {
    return <h3>Working fetching your User&apos;s details...</h3>
  }

  return (
    <div className='usercontainer'>
      <h3>{details.name}</h3>
      <p>Email: {details.email}</p>
      <p>Role: {details.role}</p>
    </div>
  )
}

export default User
