import Home from './Home';
import GoogleMap from './GoogleMap';
import { Routes, Route } from 'react-router-dom';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map/:id" element={<GoogleMap />} />
        </Routes>
    )
}