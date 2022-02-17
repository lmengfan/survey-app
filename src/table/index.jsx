import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import { getValue } from '@testing-library/user-event/dist/utils';
import Line from'../line';
import BlockGrid from'../block';

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

export default function CustomizedTables(props) {

  const [blockAnswers, setBlockAnswers] = React.useState(new Map());

  const recordAnswerBlockCallback = (childData) =>{
    const collection = blockAnswers;
    collection.set(childData.section, childData.answers)
    //console.log(collection)
    setBlockAnswers(collection)
    props.getScore(blockAnswers)
  }

  return (
    <div key="sections">
    {props.questions.map((h) => (
    <Box sx={{ width: '100%' }} key={h.section}>
    <h3 key={h.section + "head"}>{h.title}</h3>
    <TableContainer component={Paper} key={h.section + "tc"}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">Questions</StyledTableCell>
          {props.answer.map((h) => (
            <StyledTableCell align="center" key={h.title}>{h.title}</StyledTableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <BlockGrid section={h} 
                    questions={h.questions} 
                    answer={props.answer} 
                    recordBlockAnswers={recordAnswerBlockCallback} 
                    questionWeight={props.questionWeight} 
                    overallWeight={props.overallWeight}
                    solutionScore={props.solutionScore}/>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>))}
    </div>
  );
}
