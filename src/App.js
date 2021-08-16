
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProgramScreen from './screens/ProgramScreen'
import LevelScreen from './screens/LevelScreen'
import SubjectScreen from './screens/SubjectScreen'
function App() {
  return (
    <Router>
      <Header/>
      <main className = "py-3">
        <Container>

        <Route path='/' component= {HomeScreen} exact/>
        <Route path='/:level' component= {LevelScreen} exact/>
        <Route path='/program/:code' component= {ProgramScreen} exact/>
        <Route path='/subject/:code' component= {SubjectScreen} exact/>

        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
 