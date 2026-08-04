

import { Routes, Route } from 'react-router-dom'
import Improved from "./pages/ImprovedResume.jsx";
import Home from "./pages/Home.jsx"
import Preview from "./pages/Preview.jsx"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/improved" element={<Improved />} />
        <Route path="/preview/:id" element={<Preview />} />
        
      </Routes>

    </div>
  )
}

export default App
