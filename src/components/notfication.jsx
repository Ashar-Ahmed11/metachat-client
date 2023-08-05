import React, { useState, useEffect, useContext } from "react";
import { getToken } from "../firebaseInit.js";
import ChatContext from "./context/chatcontext.jsx";

const Notifications = (props) => {
  const context = useContext(ChatContext)
  const {notificationController} = context
  const [isTokenFound, setTokenFound] = useState(false);

  console.log("Token found", isTokenFound);

  // To load once
  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        console.log("Token is", data);
        notificationController(data)
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;