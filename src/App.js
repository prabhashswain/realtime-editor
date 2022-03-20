import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import EditorPage from './pages/EditorPage';

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/editor/:roomid' element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
