import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Line from'../line';

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

export default function BlockGrid(props) {
  return (
    <React.Fragment>
        {props.questions.map((row) => (
            <StyledTableRow name="survey-question" content={row.id} key={row.id + "row"}>
            <StyledTableCell key={row.id} component="th" scope="row">
              {row.title}
            </StyledTableCell>
              <Line question={props.section} key={row.title} answer={props.answer}/>
          </StyledTableRow>
          ))}
    </React.Fragment>

  );
}