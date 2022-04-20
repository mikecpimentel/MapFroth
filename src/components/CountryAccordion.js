import { AccordionSummary, AccordionDetails, Accordion } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const CountryAccordion = ({ data }) => {
   return (
      <Accordion className="country-accordion">
         <AccordionSummary expandIcon={<ExpandMoreIcon />} className="summary">
            {data.loading ? (
               "loading"
            ) : (
               <Typography className="typography">{data.name}</Typography>
            )}
         </AccordionSummary>
         <AccordionDetails>
            Nothing yet to see here! But soon you should be able to do more with
            this box.
         </AccordionDetails>
      </Accordion>
   );
};
