import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './pages/StudentList';
import Details from './pages/Details';
import Scores from './pages/Scores';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<StudentList />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/scores/:id' element={<Scores />} />
      </Routes>
    </Router>
  );
}

export default App;
