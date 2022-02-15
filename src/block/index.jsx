import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import Line from'../line';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export default function BlockGrid(props) {
  return (
    <div>
        {props.questions.map((h) => (
            <Box sx={{ width: '100%' }}>
            <h3>{h.title}</h3>
            <Line questions={h.questions} answer={props.answer}/>
            </Box>
          ))}
    </div>

  );
}