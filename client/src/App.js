import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import CreateForm from './Components/CreateForm';
import Detail from './Components/Detail';
import AuthorDetail from './Components/AuthorDetail'
// windoes + .

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<CreateForm/>}/>
        <Route path='/detail' element={<Detail/>}/>
        <Route path='/author' element={< AuthorDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
