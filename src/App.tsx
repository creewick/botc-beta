import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css'
import Localized from './components/Localization'
import CharactersListPage from './pages/CharactersListPage'
import locales from './locales/locales'
import CharacterPage from './pages/CharacterPage'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/:lang">
          <Route path="" element={
            <Localized element={<HomePage />} />
          } />
          <Route path="characters" element={
            <Localized element={<CharactersListPage />} locales={[locales.ui, locales.characters]} />
          } />
          <Route path="characters/:id" element={
            <Localized element={<CharacterPage />} locales={[locales.ui, locales.characters]} />
          } />
        </Route>
        <Route path="*" element={<Navigate to="/ru" />} />
      </Routes>
    </>
  )
}
