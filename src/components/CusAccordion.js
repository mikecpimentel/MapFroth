import { AccordionSummary, AccordionDetails, Accordion } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const CusAccordion = ({ data }) => {
   return (
      <Accordion className="info-accordion">
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="summary"
         >
            <Typography className="typography">{data.summary}</Typography>
         </AccordionSummary>
         <AccordionDetails>
            <Typography variant="body2">{data.details}</Typography>
         </AccordionDetails>
      </Accordion>
   );
};
