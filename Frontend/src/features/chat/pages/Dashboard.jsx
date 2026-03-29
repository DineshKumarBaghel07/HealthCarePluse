import React, { use } from 'react'
import { useAuth } from '../../auth/hooks/useAuth';
import { useSelector } from 'react-redux';
import { useChat } from '../hooks/useChat.js';
import { useEffect } from 'react';
const Dashboard = () =>{
   const chat = useChat()
  const user = useSelector(state => state.auth.user)
  console.log(user)

  useEffect(()=>{
    chat.initializeSocketConnection()
  },[])
return (<>Dashboard</>);
}

export default Dashboard;