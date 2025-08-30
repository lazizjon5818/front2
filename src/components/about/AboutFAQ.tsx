// src/components/about/AboutFAQ.tsx
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SectionCard from "../common/SectionCard";

const faqs = [
  { q: "Testlar bepulmi?", a: "Bepul sinov testlari mavjud. To‘liq modul va AI izohlar obuna orqali." },
  { q: "Obunani qanday sotib olaman?", a: "Subscription sahifasiga o‘ting, reja tanlab, to‘lovni amalga oshiring." },
  { q: "Natijalarim qayerda saqlanadi?", a: "Kabinet (dashboard) orqali barcha tarix va progressni ko‘rasiz." },
];

const AboutFAQ = () => {
  return (
    <Box component="section" sx={{ py: { xs: 4, md: 1 }, px: { xs: 2, md: 0 } }}>
      <Container maxWidth="lg">
        <SectionCard>
          <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "center", mb: 3 }}>
            FAQ
          </Typography>
          {faqs.map((f) => (
            <Accordion key={f.q} elevation={0} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>{f.q}</AccordionSummary>
              <AccordionDetails>{f.a}</AccordionDetails>
            </Accordion>
          ))}
        </SectionCard>
      </Container>
    </Box>
  );
};

export default AboutFAQ;
