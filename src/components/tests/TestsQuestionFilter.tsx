import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormGroup,
    FormControlLabel,
    Checkbox,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  
  export type QFilterValue = {
    passages?: string[];
    parts?: string[];
    qtypes?: string[];
  };
  
  type Props = {
    module: "Barchasi" | "Listening" | "Reading" | "Writing" | "Speaking";
    value: QFilterValue;
    onChange: (v: QFilterValue) => void;
  };
  
  const READING_PASSAGES = ["Passage 1", "Passage 2", "Passage 3"];
  const LISTENING_PARTS = ["Part 1", "Part 2", "Part 3", "Part 4"];
  const READING_QTYPES = [
    "Gap Filling",
    "Matching Features",
    "Matching Headings",
    "Matching Information",
    "Multiple Choice (Many Answers)",
    "Multiple Choice (One Answer)",
    "Other Types",
  ];
  const LISTENING_QTYPES = [
    "Diagram Label",
    "Gap Filling",
    "Map",
    "Matching Features",
    "Matching Information",
    "Multiple Choice (Many Answers)",
    "Multiple Choice (One Answer)",
    "Other Types",
  ];
  
  function toggle(arr: string[] = [], item: string) {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
  }
  
  const TestsQuestionFilter = ({ module, value, onChange }: Props) => {
    const isReading = module === "Reading";
    const isListening = module === "Listening";
    const qtypes = isReading ? READING_QTYPES : isListening ? LISTENING_QTYPES : [];
  
    const onTogglePassage = (name: string) =>
      onChange({ ...value, passages: toggle(value.passages, name) });
    const onTogglePart = (name: string) =>
      onChange({ ...value, parts: toggle(value.parts, name) });
    const onToggleQtype = (name: string) =>
      onChange({ ...value, qtypes: toggle(value.qtypes, name) });
  
    return (
      <Box
        sx={(theme) => ({
          minWidth: { xs: 200, sm: 260 },
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: { xs: 1.5, sm: 2 },
          background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
          boxShadow: 1,
          animation: "fadeIn 0.8s ease-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(10px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        })}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 800,
            mb: 1,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            background: theme =>
              theme.palette.mode === "dark"
                ? "linear-gradient(45deg, #ffffff, #a0a0ff)"
                : "linear-gradient(45deg, #3333ff, #0066cc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Filters
        </Typography>
        {(isReading || isListening) && (
          <Accordion
            defaultExpanded={false}
            disableGutters
            sx={{
              boxShadow: "none",
              background: "transparent",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
              sx={{ px: 1, py: 0.5 }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
                {isReading ? "Passage" : "Part"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 1 }}>
              <FormGroup>
                {(isReading ? READING_PASSAGES : LISTENING_PARTS).map((name) => (
                  <FormControlLabel
                    key={name}
                    control={
                      <Checkbox
                        checked={isReading ? value.passages?.includes(name) ?? false : value.parts?.includes(name) ?? false}
                        onChange={() => (isReading ? onTogglePassage(name) : onTogglePart(name))}
                        sx={{ py: 0.5 }}
                      />
                    }
                    label={<Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem" } }}>{name}</Typography>}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        )}
        {(isReading || isListening) && (
          <Accordion
            defaultExpanded={false}
            disableGutters
            sx={{
              boxShadow: "none",
              background: "transparent",
              "&:before": { display: "none" },
              mt: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
              sx={{ px: 1, py: 0.5 }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
                Question type
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 1 }}>
              <FormGroup>
                {qtypes.map((name) => (
                  <FormControlLabel
                    key={name}
                    control={
                      <Checkbox
                        checked={value.qtypes?.includes(name) ?? false}
                        onChange={() => onToggleQtype(name)}
                        sx={{ py: 0.5 }}
                      />
                    }
                    label={<Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem" } }}>{name}</Typography>}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        )}
        {!isReading && !isListening && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
          >
            Bu filter faqat Reading yoki Listening moduli uchun mavjud.
          </Typography>
        )}
      </Box>
    );
  };
  
  export default TestsQuestionFilter;