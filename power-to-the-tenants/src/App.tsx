import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ViewAllProfiles from "./components/view-all-profiles/view-all-profiles.tsx";
import {ProfileView} from "./components/profile-view/profile-view.tsx";


function App() {
  return (

    <>
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ViewAllProfiles />}/>
                    <Route path="/view-profile/:id" element={<ProfileView />}/>
                </Routes>
            </BrowserRouter>
        </div>
    </>
  )
}

export default App
