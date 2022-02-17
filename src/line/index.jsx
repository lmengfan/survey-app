import * as React from 'react';
import Radio from '@mui/material/Radio';
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

export default function Line(props) {
  const [selectedValue, setSelectedValue] = React.useState(-1);

  const handleChange = (event) => {
   setSelectedValue(event.currentTarget.querySelector('input').value);
   props.recordAnswers({question:event.currentTarget.querySelector('input').name, value:event.currentTarget.querySelector('input').value})
  };

  return (
    <React.Fragment>
      {props.answer.map((a) => (
          <StyledTableCell align="center" key={props.question.id + String(a.value)}>
          <Radio
            checked={selectedValue === a.value}
            onClick={handleChange}
            key={props.question.id + String(a.value)}
            value={a.value}
            name={props.name}
          />
          </StyledTableCell>
      ))}
    </React.Fragment>

  );
}