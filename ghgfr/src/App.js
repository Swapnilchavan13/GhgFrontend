import './App.css';
import { Seendelete } from './Component/Seendelete';
import { Selectdata } from './Component/Selectdata';
import Uploaddata from './Component/Uploaddata';

function App() {
  return (
    <div className="App">
     <Uploaddata/>
     <Seendelete />
     <Selectdata />
    </div>
  );
}

export default App;
