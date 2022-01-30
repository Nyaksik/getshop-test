import { Route, Routes } from 'react-router-dom'
import Promo from './pages/Promo/Promo'
import Callback from './pages/Callback/Callback'
import Info from './pages/Info/Info'
import InfoSlider from './pages/InfoSlider/InfoSlider'
import './App.css'

function App() {
	return (
		<div className="App">
			<Routes>
                <Route path='/' element={<Promo />} />
                <Route path='/callback' element={<Callback />} />
                <Route path='/info' element={<Info />} />
				<Route path='/infoslider' element={<InfoSlider />} />
            </Routes>
		</div>
	)
}

export default App
