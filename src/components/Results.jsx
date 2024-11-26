import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from "@mui/material/Button";

export const Results = ({ content, expression }) => {
  const [calcHistory, setCalculations] = useState([]);
  const [definitions, setDefinitions] = useState([])
  useEffect(() => {
    // const savedCalculations = JSON.parse(localStorage.getItem('calculations') || '[]');
    // setCalculations(savedCalculations);
    if(typeof content == 'number'){
      setCalculations([
        ...calcHistory,
        expression.match(/(\d+(\.\d+)?|[=+\-*/()])|\S/g).join(" ")+" = "+content
      ])
    }

    if(expression.includes("=")){
      let ex = expression.match(/\b([a-z])\b\s*=\s*/)
      setDefinitions((prevVal) => {
        const filterd = prevVal.filter(
          (item) => item.split(" = ")[0] !== ex[1]
        );
        
        return [
          ...filterd,
          ex[1]+" = "+localStorage.getItem(ex[1]) ?? " "
        ]
      })
    }
  }, [content]);

  return (
  <div>
  <Card data-testid="results">
    <CardContent>
      <Typography variant="h5">Results</Typography>
      <SubdirectoryArrowRightIcon style={{ marginRight: 10 }}/> { typeof content == 'number' ? expression.match(/(\d+(\.\d+)?|[=+\-*/()])|\S/g).join(" ")+" = "+content : content}
      <List>
      {calcHistory.slice(0,-1).reverse().map((calc, index) => (
        <ListItem key={index}>
          <Typography variant="body1" style={{ marginRight: 10 }}>
            {index + 1}.
          </Typography>
          <ListItemText 
            primary={`${calc}`} 
          />
        </ListItem>
      ))}
    </List>
    <Button variant="outlined" color="error"
    onClick={() =>{
      // localStorage.removeItem('calculations');
      setCalculations([]);
    }}
    >
      Erase Results</Button>
    </CardContent>
  </Card>

  <Card data-testid="definitions">
    <CardContent>
      <Typography variant="h5">Definitions</Typography>
      <List>
      {definitions.map((calc, index) => (
        <ListItem key={index}>
          <ListItemText 
            primary={calc} 
          />
        </ListItem>
      ))}
    </List>
    <Button variant="outlined" color="error"
    onClick={() =>{
      localStorage.clear();
      setDefinitions([]);
    }}
    >
      Erase Definitions</Button>
    </CardContent>
  </Card>
  </div>
)};
