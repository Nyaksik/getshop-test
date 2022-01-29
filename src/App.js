import { Route, Routes } from 'react-router-dom'
import Promo from './pages/Promo/Promo'
import Callback from './pages/Callback/Callback'
import Info from './pages/Info/Info'
import './App.css'

function App() {
	return (
		<div className="App">
			<Routes>
                <Route path='/' element={<Promo />} />
                <Route path='/callback' element={<Callback />} />
                <Route path='/info' element={<Info />} />
            </Routes>
		</div>
	)
}

export default App
