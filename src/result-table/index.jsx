import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import "./styles.css";
import { StyledEngineProvider } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      light: '#EEEEEE',
      main: '#E0E0E0',
      dark: '#BDBDBD',
      contrastText: '#FAFAFA',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
function CircularProgressWithLabel(props) {
  let circleColor = "error"
  if(Math.round(props.value) < 33){
    circleColor = "error"}
  else if(Math.round(props.value) < 66){ 
    circleColor = "error"
  }
  else{
    circleColor="success" 
  }
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} color={circleColor} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography variant="caption" component="div" color={circleColor}>
          {`${Math.round(props.value)}`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};



const StyledWinnerCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: customTheme.palette.primary.light,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: theme.palette.common.white,
    fontSize: 14,
  },
  [`&.${tableCellClasses.footer}`]: {
    backgroundColor: customTheme.palette.primary.light,
    color: theme.palette.common.black,
    fontSize: 14,
    fontWeight: 'bold'
  },
}));

const NormalCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: customTheme.palette.primary.light,
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: theme.palette.common.white,
    fontSize: 14,
  },
  [`&.${tableCellClasses.footer}`]: {
    backgroundColor: customTheme.palette.primary.light,
    color: theme.palette.common.black,
    fontSize: 14,
    fontWeight: 'bold'
  },
}));


function NormalHeading(props) {
  return (              
    <NormalCell align="center" key = {props.column.col}>
    <img className="logo" key = {props.column.col} alt={props.column.col} src={props.column.img}></img>
    </NormalCell>)
}

function StyledHeading(props) {
  return (
  <StyledEngineProvider injectFirst>              
  <StyledWinnerCell align="center" className= "winnerth" key = {props.column.col}>
  <img className="logo" key = {props.column.col} alt={props.column.col} src={props.column.img}></img>
  </StyledWinnerCell>
  </StyledEngineProvider>
  )
}

function NormalBody(props) {
  return (              
    <NormalCell align="center">
      <CircularProgressWithLabel  variant="determinate" value={Math.round((props.row[props.column.col]**0.5)*25)} />
    </NormalCell>)
}

function StyledBody(props) {
  return (              
    <StyledWinnerCell className= "winnertb" align="center">
      <CircularProgressWithLabel  variant="determinate" value={Math.round((props.row[props.column.col]**0.5)*25)} />
    </StyledWinnerCell>)
}

function NormalFoot(props) {
  return (              
    <NormalCell align="center">
      <CircularProgressWithLabel  variant="determinate" value={Math.round((props.row[props.column.col]**0.5)*25)} />
    </NormalCell>)
}

function StyledFoot(props) {
  return (       
    <StyledEngineProvider injectFirst>         
    <StyledWinnerCell className= "winnertf" align="center">
      <CircularProgressWithLabel  variant="determinate" value={Math.round((props.row[props.column.col]**0.5)*25)} />
    </StyledWinnerCell>
    </StyledEngineProvider>)
}

function Head(props) {
  const winnerSelect = props.winner === props.column.col;
  if (winnerSelect) {
    return <StyledHeading column={props.column} winner={props.winner}/>;
  }
  return <NormalHeading column={props.column} winner={props.winner}/>;
}
function Body(props) {
  const winnerSelect = props.winner === props.column.col;
  if (winnerSelect) {
    return <StyledBody column={props.column} row={props.row} winner={props.winner}/>;
  }
  return <NormalBody column={props.column} row={props.row} winner={props.winner}/>;
}

function Foot(props) {
  const winnerSelect = props.winner === props.column.col;
  if (winnerSelect) {
    return <StyledFoot column={props.column} row={props.row} winner={props.winner}/>;
  }
  return <NormalFoot column={props.column} row={props.row} winner={props.winner}/>;
}

export default function BasicTable(props) {
  const rows = [];
  const footer = [];
  for (let i = 0, len = props.section.length; i < len; i++) {
    let section = props.section[i].section
    //console.log(props.rowdata)
    if(Array.from(props.rowdata.keys()).includes(section)){
      rows.push(Object.fromEntries(props.rowdata.get(section).score))
    }
  };
  const sum = new Map();
  let winner = "blank";
  let winnerScore = 0;
  sum.set("name", "Total");

  for (let i = 0, len = props.columnhead.length; i < len; i++) {
    let platform = props.columnhead[i].col
    let total = 0
    const scores = Array.from(props.rowdata.values())
    for (let i = 0, len = scores.length; i < len; i++) {
      total += scores[i].overall.get(platform)
    }
    sum.set(platform, total)
    if(total > winnerScore){
      winner = platform
      winnerScore = total
    }
  }
  footer.push(Object.fromEntries(sum))
  //rows.push(Object.fromEntries(sum))
  console.log("Winner" + winner)
  //console.log(rows)
  return (
    
      <TableContainer component={Paper}>
      <Table sx={{ minwidth: 850, maxHeight: 200}} aria-label="simple table">
        <TableHead>
          <TableRow >
            <NormalCell style={{ width: 160 }}>Sections</NormalCell>
            {props.columnhead.map((column) => (
              <Head column={column} winner={winner}/>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <NormalCell style={{ width: 160 }} scope="row">
                {row.name}
              </NormalCell>
              {props.columnhead.map((column) => (
                <Body column={column} row={row} winner={winner}/>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        {footer.map((foot) => (
            <TableRow
              key={foot.name}>
              <NormalCell scope="row">
                {foot.name}
              </NormalCell>
              {props.columnhead.map((column) => (
                <Foot column={column} row={foot} winner={winner}/>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </TableContainer>
   
  );
}