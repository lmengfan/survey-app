import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Line(props) {
  const [selectedValue, setSelectedValue] = React.useState("0");

  const handleChange = (event) => {
   setSelectedValue(event.currentTarget.querySelector('input').value);
  };

  return (
    <React.Fragment>
      {props.answer.map((a) => (
          <StyledTableCell align="center">
          <Radio
          checked={selectedValue === a.value}
          onClick={handleChange}
          key={props.question.id + String(a.value)}
          value={a.value}
          name="radio-buttons"
          inputProps={a.title}
          />
          </StyledTableCell>
      ))}
    </React.Fragment>

  );
}