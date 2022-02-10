import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import CreateForm from './Components/CreateForm';
import Detail from './Components/Detail';
import Panel from './Components/Panel';
import Coins from './Components/Coins';
// windoes + .

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<CreateForm/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/panel' element={<Panel/>}/>
        <Route path='/coins' element={<Coins/>}/>
      </Routes>
    </div>
  );
}

export default App;
