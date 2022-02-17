import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import "./styles.css";
export default function IconLabelButtons(props) {
  const handleClick = (event) => {

    let total = 0;
    const surveyQuestions = document.querySelectorAll('[name="survey-question"]');
    const len = surveyQuestions.length;
    //console.log(len);
    for (let i = 0, len = surveyQuestions.length; i < len; i++) {
      console.log(surveyQuestions[i].content)
    };
    //console.log(total);
   };
   
  return (
    <Stack direction="row" spacing={2} className="submit-button">
      <Button  variant="contained"  endIcon={<SendIcon/>} onClick={props.showresult}>
        Submit
      </Button>
    </Stack>
  );
}