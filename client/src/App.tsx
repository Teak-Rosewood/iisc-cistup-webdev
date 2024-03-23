import { Route, Routes, useNavigate } from "react-router-dom";
import Predict from "./pages/Predict";
import ImageList from "./pages/ImageList";
import "./App.css";

function App() {
    const navigate = useNavigate();
    const navBar = (
        <nav className="bg-gray-800 p-2 text-white fixed top-0 right-0 left-0">
            <div className="container mx-auto flex justify-between">
                <div className="text-2xl font-bold">IISc CiSTUP Round 1 Submission</div>
                <div className="flex space-x-4">
                    <button className="hover:text-gray-300" onClick={() => navigate('/')}>
                        Home
                    </button>
                    <button className="hover:text-gray-300" onClick={() => navigate('/predict')}>
                        Predicted Images
                    </button>
                </div>
            </div>
        </nav>
    );
    return (
        <>
            {navBar}
            <Routes>
                <Route path="/" element={<Predict />} />
                <Route path="/predict" element={<ImageList />} />
            </Routes>
        </>
    );
}

export default App;
