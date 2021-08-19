
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/enduser/HomeScreen'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProgramScreen from './screens/enduser/ProgramScreen'
import LevelScreen from './screens/enduser/LevelScreen'
import SubjectScreen from './screens/enduser/SubjectScreen'
import LoginScreen from './screens/admin/LoginScreen'
import UserListScreen from './screens/admin/UserListScreen'
import LevelListScreen from './screens/admin/LevelListScreen'


function App() {
  return (
    <Router>
      <Header/>
      <main className = "py-3">
        <Container>
<Switch>
        <Route path='/' component= {HomeScreen} exact/>
        <Route path='/login' component= {LoginScreen } exact/>
        <Route path='/program/:code' component= {ProgramScreen} exact/>
        <Route path='/subject/:code' component= {SubjectScreen} exact/>
        <Route path='/level/:level' component= {LevelScreen} exact/>
        <Route path='/admin/users' component= {UserListScreen} exact/>
        <Route path='/admin/levels' component= {LevelListScreen} exact/>
        </Switch>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
 