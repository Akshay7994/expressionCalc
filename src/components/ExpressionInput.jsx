import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useRef } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

export const ExpressionInput = ({ handleSubmit }) => {
  const inputRef = useRef();
  return (
    <Card>
      <CardContent>
        <TextField fullWidth={true} inputRef={inputRef} label="Expression" variant="outlined"/>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          name="button"
          variant="contained"
          onClick={() => handleSubmit(
            inputRef.current.value
          )}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};
