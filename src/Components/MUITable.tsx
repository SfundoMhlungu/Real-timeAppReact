import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// fisher yates shuffle
function randomize (arr)
{
 
    // Start from the last element and swap
    // one by one. We don't need to run for
    // the first element that's why i > 0
    for (let i = arr.length - 1; i > 0; i--)
    {
     
        // Pick a random index from 0 to i inclusive
        let j = Math.floor(Math.random() * (i + 1));
 
        // Swap arr[i] with the element
        // at random index
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}




export default function MuiTable({data}: {data: Array<Record<any,any>>}) {
   const [rows, setRows] = useState([])
   useEffect(()=> {
        // shuffle array and show different data
        if(data.length > 5){
           randomize(data)
           
           setRows(data.slice(0, 6))
        }else{
           setRows(data)
        }
   }, [data])


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="Realtime Data">
        <TableHead>
          <TableRow>
         
            <TableCell>firstName</TableCell>
            <TableCell align="right">email&nbsp;</TableCell>
            <TableCell align="right">sex&nbsp;</TableCell>
            <TableCell align="right">Unsubed&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell component="th" scope="row">{row.firstName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.sex}</TableCell>
              <TableCell align="right">{Date.now()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
