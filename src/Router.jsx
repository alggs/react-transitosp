import Home from './pages/Home';
import GoogleMap from './pages/GoogleMap';
import { Routes, Route } from 'react-router-dom';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map/:id" element={<GoogleMap />} />
        </Routes>
    )
}