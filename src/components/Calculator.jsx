'use client';

import React, {useCallback, useState} from "react";
import {ExpressionInput} from "./ExpressionInput";
import {Results} from "./Results";
import Calculation from "@/logic/calculation";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const Calculator = () => {
  const [result, setResult] = useState("");
  const [expr, setExpr] = useState("")

  const calculateResult = useCallback(
  (input) => {
      setResult(new Calculation(input).calculate() ?? "Wrong input!");
      setExpr(input)
    },
    [setResult]
  );

  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <Typography variant="h3">React Calculator</Typography>
      </Grid>
      <Grid item xs={12}>
        <ExpressionInput handleSubmit={calculateResult}/>
      </Grid>
      <Grid item xs={12}>
        <Results content={result} expression={expr}/>
      </Grid>
    </Grid>
  );
};
