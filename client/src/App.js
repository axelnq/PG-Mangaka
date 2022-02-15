import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import CreateForm from "./Components/CreateForm";
import Detail from "./Components/Detail";
import Biblioteca from "./Components/Biblioteca";
import Wishlist from "./Components/Wishlist";
import Panel from "./Components/Panel";
import Coins from "./Components/Coins";
import Register from "./Components/Access/Register";
import CreateChapters from "./Components/CreateChapters";
import { useSelector } from "react-redux";
// windoes + .

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:id" element={<Detail />} />
        {user && (
          <>
            <Route path="/library" element={<Biblioteca />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/create" element={<CreateForm />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/coins" element={<Coins />} />
            <Route path="/createChapters" element={<CreateChapters />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>      
    </div>
  );
}

export default App;
