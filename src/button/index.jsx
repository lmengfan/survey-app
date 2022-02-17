import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import "./styles.css";
export default function IconLabelButtons(props) {
   
  return (
    <Stack direction="row" spacing={2} className="submit-button">
      <Button  variant="contained"  endIcon={<SendIcon/>} onClick={props.showresult}>
        Submit
      </Button>
    </Stack>
  );
}