import React,{useContext} from 'react'
import NoteContext from "./components/NoteContext";
function Alert() {
  const context = useContext(NoteContext);
    let { alert} =context;

  return (
  alert &&<div><d
  iv className={`alert alert-${alert.type}`} role="alert">
    {alert.msg}
  </d></div>
  )
}

export default Alert