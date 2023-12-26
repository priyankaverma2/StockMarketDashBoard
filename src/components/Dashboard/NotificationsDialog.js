// NotificationsDialog.js
import React from 'react';
import './NotificationsDialog.css'; // Create a corresponding CSS file for styling


const NotificationsDialog = () => {
  
  // Customize the content of your notifications
  const notifications = [
    "Check new stocks",
    "Win exciting prizes",
    "Latest raise and fall",
  ];

  return (
    <div className="notifications-dialog" >
     
      <ol>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ol>
    </div>
  );
};

export default NotificationsDialog;
