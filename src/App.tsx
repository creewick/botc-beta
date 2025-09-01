import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CharactersListPage from './pages/CharactersListPage'
import './App.css'
import CharacterPage from './pages/CharacterPage'

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/characters" element={<CharactersListPage />} />
      <Route path="/characters/:id" element={<CharacterPage />} />
     </Routes>
    </>
  )
}

export default App
