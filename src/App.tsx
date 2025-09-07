import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css'
import Localized from './components/Localized'
import CharactersListPage from './pages/CharactersListPage'
import locales from './locales/locales'
import CharacterPage from './pages/CharacterPage'
import RulesPage from './pages/RulesPage'
import GlossaryPage from './pages/GlossaryPage'
import ScriptsListPage from './pages/ScriptsListPage'
import ScriptPage from './pages/ScriptPage'

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
          <Route path="scripts" element={
            <Localized locales={[locales.scripts]}><ScriptsListPage /></Localized>
          } />
          <Route path="scripts/:id" element={
            <Localized locales={[locales.scripts, locales.characters]}><ScriptPage /></Localized>
          } />
        </Route>
        <Route path="*" element={<Navigate to="/ru" />} />
      </Routes>
    </>
  )
}
