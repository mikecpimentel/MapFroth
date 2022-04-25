import "./leg.css";
import FlightIcon from "@mui/icons-material/Flight";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export const Leg = ({ data }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <Paper className="leg">
         <FlightIcon fontSize="large" className="leg-icon" />
         <span className="leg-start leg-name">{data.leg_start}</span> to
         <span className="leg-end leg-name">{data.leg_end}</span>
         <IconButton id="long-button" onClick={handleClick}>
            <MoreVertIcon />
         </IconButton>
         <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
         >
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
         </Menu>
         No function yet
      </Paper>
   );
};
