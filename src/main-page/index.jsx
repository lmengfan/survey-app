import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from "react";
import logo from './logo.svg';
import './main-page.css';
import ResponsiveAppBar from '../header';
import IconLabelButtons from '../button';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomizedTables from'../table';
import Radio from '@mui/material/Radio';
import RadioButtons from '../radio';
function App() {
  const [allSections, setAllSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      const rsp = await fetch("./questions.json",{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      });
      const sections = await rsp.json();
      setAllSections(sections);
    };
    fetchSections();
  }, []);

  const [answers, setAnswers] = useState([]);

useEffect(() => {
  const fetchAnswers = async () => {
    const rspa = await fetch("./answers.json",{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    });
    const answers = await rspa.json();
    setAnswers(answers);
  };
  fetchAnswers();
}, []);

const [selectedVal, setSelectedVal] = React.useState('b');

const handleChange = (event) => {
  setSelectedVal(event.currentTarget.querySelector('input').value)
};
  return (
    <BrowserRouter basename = {process.env.PUBLIC_URL}>
        <ResponsiveAppBar/>
         <main>
            <header>
                <h1 id="title">PMIS Selection Tool</h1>
                <p id="description">Thank You For Taking Your Time To Give Us FeedBack</p>
            </header>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
              }}>
              <TextField
                helperText="Please enter your name"
                id="demo-helper-text-aligned"
                label="Project Name"
              />
            </Box>
            <RadioButtons/>
            <CustomizedTables questions = {allSections} answer={answers}/>
            <div>
            <Radio
              checked={selectedVal ==='a'}
              key="aaqwwda"
              onClick={handleChange}
              value='a'
              name="radio-buttons"
              inputProps={{ 'aria-label': 'A' }}
            />
            <Radio
              checked={selectedVal === 'b'}
              key="bbasd"
              onClick={handleChange}
              value='b'
              name="radio-buttons"
              inputProps={{ 'aria-label': 'B' }}
            />
          </div>
            <IconLabelButtons/>
          </main>



    </BrowserRouter>
  );
}

export default App;
