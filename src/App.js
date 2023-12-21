import { Routes, Route } from 'react-router-dom';
import './App.css';
import ClientLayout from './components/client/ClientLayout.js'
import AdminLayout from './components/admin/AdminLayout.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<ClientLayout />} />
      </Routes>
    </div>
  );
}

export default App;
