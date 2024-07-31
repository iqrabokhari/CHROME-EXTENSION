import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [colour, setColour] = useState('');
  const onclick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.url && !tab.url.startsWith('chrome://')) {
      chrome.scripting.executeScript<string[], void>({
        target: { tabId: tab.id! },
        args: [colour],
        func: (colour) => {
          alert('hello from vite extension');
          document.body.style.backgroundColor = colour;
        },
      });
    } else {
      console.error('Cannot access a chrome:// URL');
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>My Vite Extension</h1>
      <div className="card">
        <input
          type="color"
          onChange={(e) => setColour(e.currentTarget.value)}
        ></input>
        <button onClick={onclick}>Set Color</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
