import { AccordionSummary, AccordionDetails, Accordion } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const CountryAccordion = ({ data, handleDeleteButton }) => {
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
            <p>Nothing yet to see here!</p>
            <p>
               Note: Delete button deletes item from database, but country
               outline will remain until you refresh the page (or until I fix
               it, whichever comes first).
            </p>

            <button onClick={() => handleDeleteButton(data.country_id)}>
               Delete
            </button>
         </AccordionDetails>
      </Accordion>
   );
};
