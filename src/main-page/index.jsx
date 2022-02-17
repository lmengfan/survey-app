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
import BasicTable from '../result-table';

//create your forceUpdate hook

function App() {
  //Load Questions for form
  const [allSections, setAllSections] = useState([]);
  const modifier = "survey-app"//change this to . to deploy to github
  useEffect(() => {
    const fetchSections = async () => {
      const rsp = await fetch(modifier + "/questions.json");
      const sections = await rsp.json();
      setAllSections(sections);
    };
    fetchSections();
  }, []);

  // Load Answers for form
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const rspa = await fetch(modifier + "/answers.json");
      const answers = await rspa.json();
      setAnswers(answers);
    };
    fetchAnswers();
  }, []);

  // Load question weight for calculation
  const [questionWeight, setQuestionWeight] = useState({});

  useEffect(() => {
    const fetchQuestionWeight = async () => {
      const rspq = await fetch(modifier + "/question_weight.json");
      const qWeight = await rspq.json();
      setQuestionWeight(qWeight);
    };
    fetchQuestionWeight();
  }, []);
  

  // Load overall weight for calculation
  const [overallWeight, setOverallWeight] = useState({});

  useEffect(() => {
    const fetchOverallWeight = async () => {
      const rspo = await fetch(modifier + "/overall_weight.json");
      const oWeight = await rspo.json();
      setOverallWeight(oWeight);
    };
    fetchOverallWeight();
  }, []);

  // Load overall weight for calculation
  const [solutionScore, setsolutionScore] = useState({});

  useEffect(() => {
    const fetchSolutionScore = async () => {
      const rsps = await fetch(modifier + "/solution_score.json");
      const sScore = await rsps.json();
      setsolutionScore(sScore);
    };
    fetchSolutionScore();
  }, []);

  // Load Logos
  const [logos, setLogos] = useState({});

  useEffect(() => {
    const fetchLogos = async () => {
      const rsps = await fetch(modifier + "/logos.json");
      const sLogo = await rsps.json();
      setLogos(sLogo);
    };
    fetchLogos();
  }, []);
  
  const [blockAnswers, setBlockAnswers] = React.useState(new Map());
  const recordScoreCallback = (childData) =>{
    console.log(childData)
    setBlockAnswers(childData)
  }

  const [va, setValue] = useState(0); // integer state
  const [visible, setVisible] = useState(false);  // result visibility state
  const handleSubmit = (event) => {
    setVisible(true)
    setValue(va => va + 1)
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
            <CustomizedTables questions = {allSections} answer={answers} questionWeight={questionWeight} overallWeight={overallWeight} solutionScore={solutionScore} getScore={recordScoreCallback}/>
            <IconLabelButtons showresult={handleSubmit}/>
            
          </main>
          {visible && 
          <result>
            <BasicTable columnhead={logos} section ={allSections} rowdata={blockAnswers} />
          </result>}
    </BrowserRouter>
  );
}

export default App;
