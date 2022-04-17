import { AccordionSummary, AccordionDetails, Accordion } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const CountryAccordion = ({ data }) => {
   return (
      <Accordion className="country-accordion">
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="summary"
         >
            <Typography className="typography">{data.countryName}</Typography>
         </AccordionSummary>
         <AccordionDetails>
           
         </AccordionDetails>
      </Accordion>
   );
};
