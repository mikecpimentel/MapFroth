import { TextField } from "@mui/material";
import { useState } from "react";

export const NewTrip = () => {
   const [inputText, setInputText] = useState("");

   const handleInputChange = (e) => {
      setInputText(e.target.value);
   };

   const handleInputSubmit = (e) => {
      e.preventDefault();
   };

   return (
      <form onSubmit={handleInputSubmit}>
         <TextField
            id="outlined-basic"
            label="Trip Name"
            value={inputText}
            onChange={handleInputChange}
            variant="outlined"
         />
      </form>
   );
};
