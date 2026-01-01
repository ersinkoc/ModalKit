import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GettingStarted from './pages/docs/GettingStarted'
import BasicModal from './pages/docs/BasicModal'
import Dialogs from './pages/docs/Dialogs'
import Stacking from './pages/docs/Stacking'
import FocusManagement from './pages/docs/FocusManagement'
import Animation from './pages/docs/Animation'
import Accessibility from './pages/docs/Accessibility'
import ApiReference from './pages/docs/ApiReference'
import ReactGuide from './pages/docs/ReactGuide'
import Examples from './pages/Examples'
import Playground from './pages/Playground'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs">
          <Route path="getting-started" element={<GettingStarted />} />
          <Route path="basic" element={<BasicModal />} />
          <Route path="dialogs" element={<Dialogs />} />
          <Route path="stacking" element={<Stacking />} />
          <Route path="focus" element={<FocusManagement />} />
          <Route path="animation" element={<Animation />} />
          <Route path="accessibility" element={<Accessibility />} />
          <Route path="api" element={<ApiReference />} />
          <Route path="react" element={<ReactGuide />} />
        </Route>
        <Route path="examples" element={<Examples />} />
        <Route path="playground" element={<Playground />} />
      </Route>
    </Routes>
  )
}

export default App
