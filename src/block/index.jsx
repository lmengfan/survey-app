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
  const [sectionAnswers, setSectionAnswers] = React.useState(new Map());
  const [overallAnswers, setOverallAnswers] = React.useState(new Map());
  const [sectionPlatformScores, setSectionPlatformScores] = React.useState(new Map());
  const [overallPlatformScores, setOverallPlatformScores] = React.useState(new Map());

  const recordAnswerCallback = (childData) =>{
    const sectionScores = sectionAnswers;
    sectionScores.set(childData.question, childData.value*props.questionWeight[childData.question])
    setSectionAnswers(sectionScores)

    const overallScores = overallAnswers;
    overallScores.set(childData.question, childData.value*props.overallWeight[childData.question])
    setOverallAnswers(overallScores)

    for (let i = 0, len = props.solutionScore.length; i < len; i++) {
      let scores = []
      let overall = []
      for (let a = 0, len = Array.from(sectionAnswers.keys()).length; a < len; a++) {
        scores.push(props.solutionScore[i][(Array.from(sectionAnswers.keys())[a])]["Id"]*sectionAnswers.get(Array.from(sectionAnswers.keys())[a]))
        overall.push(props.solutionScore[i][(Array.from(sectionAnswers.keys())[a])]["Id"]*overallAnswers.get(Array.from(sectionAnswers.keys())[a]))
      }
      let sectionSum = scores.reduce((partialSum, a) => partialSum + a, 0)
      let overallSum = overall.reduce((partialSum, a) => partialSum + a, 0)
      sectionPlatformScores.set("name", props.section.title)
      sectionPlatformScores.set(props.solutionScore[i].Title, sectionSum)
      overallPlatformScores.set("name", props.section.title)
      overallPlatformScores.set(props.solutionScore[i].Title, overallSum)
    };
    props.recordBlockAnswers({section:props.section.section, answers:{score:sectionPlatformScores, overall:overallPlatformScores}})
  }

  return (
    <React.Fragment>
        {props.questions.map((row) => (
            <StyledTableRow name="survey-question" 
                            content={row.id} 
                            key={row.id + "row"}>
            <StyledTableCell key={row.id} 
                            component="th" 
                            scope="row">
              {row.title}
            </StyledTableCell>
              <Line question={props.section} 
                    key={row.title} 
                    name={row.id} 
                    answer={props.answer} 
                    recordAnswers={recordAnswerCallback}/>
          </StyledTableRow>
          ))}
    </React.Fragment>
  );
}