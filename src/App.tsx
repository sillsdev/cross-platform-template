import logo from './logo.svg';
import './App.css';
import { Box, Button } from '@mui/material';

const ipc = (window as any)?.electron;
const buildDate = require('./buildDate.json').date;

function App() {
  const handleClick = async () => {
    console.log('clicked Hello world');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {ipc && <p>Built on {buildDate}</p>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Box sx={{ p: 2 }}>
          <Button variant="contained" onClick={handleClick}>
            Hello world
          </Button>
        </Box>
      </header>
    </div>
  );
}

export default App;
