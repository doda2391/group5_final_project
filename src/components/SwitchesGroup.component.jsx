import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { PropaneSharp } from "@mui/icons-material";

export default function SwitchesGroup(props) {
  const [state, setState] = React.useState(false);

  const handleChange = (event) => {
    setState(!state);
    props.OrderHandler(state);
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.LTH}
              onChange={handleChange}
              name="LTH"
            />
          }
          label="High-To-Low"
        />
      </FormGroup>
    </FormControl>
  );
}
