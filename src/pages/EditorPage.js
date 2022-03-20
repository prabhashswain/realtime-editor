import React, { useEffect, useRef, useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import toast from 'react-hot-toast';
import { useNavigate,useLocation, Navigate,useParams } from 'react-router-dom';
import ACTIONS from '../Actions';

const EditorPage = () => {
    const reactNavigate = useNavigate();
    const location = useLocation();
    const { roomId } = useParams();
    const socketRef = useRef(null);
    const [clients,setClients] = useState([])

    useEffect(() => {
      const init = async ()=>{
          socketRef.current = await initSocket();
          socketRef.current.on('connect_error', (err) => handleErrors(err));
          socketRef.current.on('connect_failed', (err) => handleErrors(err));
          function handleErrors(e) {
            console.log('socket error', e);
            toast.error('Socket connection failed, try again later.');
            reactNavigate('/');
          }
          socketRef.current.emit(ACTIONS.JOIN,{
              roomId,
              username:location.state?.username
          })
          socketRef.current.on(ACTIONS.JOINED,({ clients, username, socketId })=>{
              if (location.state?.username !== username ) {
                  toast.success(`${username} joined the room.`)
              }
              setClients(clients)
          })
      }
      init()
    }, [])
    
    
    if (!location.state?.username) {
        <Navigate to="/" />
    }
  return (
    <div className="mainWrap">
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img
                            className="logoImage"
                            src="/code-sync.png"
                            alt="logo"
                        />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client
                                key={client.socketId}
                                username={client.username}
                            />
                        ))}
                    </div>
                </div>
                <button className="btn copyBtn" >
                    Copy ROOM ID
                </button>
                <button className="btn leaveBtn" >
                    Leave
                </button>
            </div>
            <div className="editorWrap">
                <Editor
                    // socketRef={socketRef}
                    // roomId={roomId}
                    // onCodeChange={(code) => {
                        // codeRef.current = code;
                    // }}
                />
            </div>
        </div>
  )
}

export default EditorPage