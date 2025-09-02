import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css'
import Localized from './components/Localized'
import CharactersListPage from './pages/CharactersListPage'
import locales from './locales/locales'
import CharacterPage from './pages/CharacterPage'
import RulesPage from './pages/RulesPage'
import GlossaryPage from './pages/GlossaryPage'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/:lang">
          <Route path="" element={
            <Localized><HomePage /></Localized>
          } />
          <Route path="rules" element={
            <Localized locales={[locales.rules]}><RulesPage /></Localized>
          } />
          <Route path="glossary" element={
            <Localized locales={[locales.glossary]}><GlossaryPage /></Localized>
          } />
          <Route path="characters" element={
            <Localized locales={[locales.characters]}><CharactersListPage /></Localized>
          } />
          <Route path="characters/:id" element={
            <Localized locales={[locales.characters]}><CharacterPage /></Localized>
          } />
        </Route>
        <Route path="*" element={<Navigate to="/ru" />} />
      </Routes>
    </>
  )
}
