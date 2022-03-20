import React, { useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';

const EditorPage = () => {
    const [clients,setClients] = useState([
        {socketId:1,username:"Prabhash"},
        {socketId:2,username:"Amar"},
        {socketId:3,username:"Pritam Padhi"},
        {socketId:4,username:"Naidu Malli"}

    ])
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