import React from 'react'
import { useSelector } from 'react-redux'
//import Alert from 'react-bootstrap/Alert'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  console.log('NOTIFICATION INSIDE COMPONENT:', notification)

  const message = notification.message
  //const colorClass = notification.color;

  if (message === null) {
    return null
  }

  return (
    <div className="container">
      {(message &&
        <Alert severity="success">
          {message}
        </Alert>
      )}
    </div>
  )
}

export default Notification
