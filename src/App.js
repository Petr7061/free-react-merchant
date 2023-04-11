import Card from "./components/UI/Card/Card.tsx";
import {
  Route,
  Routes
} from "react-router-dom";
import Sms from "./components/UI/Sms/Sms.tsx";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Card/>} />
        <Route path="/sms" element={<Sms />} />
        <Route path="*" element={<Card />} />
      </Routes>
    </div>
  );
}

export default App;
