import React, { useState } from 'react';
import Display from './Display';
import Button from './button';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleButtonClick = (label) => {
    if (label === '=') {
      calculateResult();
    } else if (label === 'C') {
      clearInput();
    } else if (label === 'CE') {
      clearEntry();
    } else if (label === 'Clear History') {
      clearHistory();
    } else {
      setInput((prevInput) => prevInput + label);
    }
  };

  const calculateResult = () => {
    try {
      const newResult = eval(input);
      setResult(newResult);
      setHistory([...history, { input, result: newResult }]);
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const clearEntry = () => {
    setInput('');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleHistoryClick = (entry) => {
    setInput(entry.input);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const buttons = [
    '7', '8', '9', '+',
    '4', '5', '6', '-',
    '1', '2', '3', '*',
    'C', '0', '=', '/',
    'CE', 'Clear History'
  ];

  return (
    <div className={`navbar ${darkMode ? 'dark-mode' : 'light-mode'}`}>
  <h2>Calculatrice-App</h2>

    <div className={`plan ${darkMode ? 'dark-mode' : 'light-mode'}`}>
     <center> <h1>Calculatrice</h1></center>
     <div className="calculator">
      <Display input={input} result={result} />
      <div className="buttons">
        {buttons.map((label, index) => (
          <Button key={index} label={label} onClick={handleButtonClick} />
        ))}
      </div>
      <div className="history">
        <h2>Historique des calculs</h2>
        {history.map((entry, index) => (
          <div key={index} onClick={() => handleHistoryClick(entry)}>
            {entry.input} = {entry.result}
          </div>
        ))}
      </div>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Mode Clair' : 'Mode Sombre'}
      </button>
     </div>
    </div>
    </div>
  );
};

export default App;
