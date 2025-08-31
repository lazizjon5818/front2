// src/components/tests/TestsQuestionFilter.tsx
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
    // Reading uchun:
    passages?: string[];
    // Listening uchun:
    parts?: string[];
    // Ikkalasi uchun ham umumiy:
    qtypes?: string[];
  };
  
  type Props = {
    module: "Barchasi" | "Listening" | "Reading" | "Writing" | "Speaking";
    value: QFilterValue;
    onChange: (v: QFilterValue) => void;
  };
  
  // Ma'lumotlar (talab bo‘yicha)
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
  
    const onTogglePassage = (name: string) =>
      onChange({ ...value, passages: toggle(value.passages, name) });
  
    const onTogglePart = (name: string) =>
      onChange({ ...value, parts: toggle(value.parts, name) });
  
    const onToggleQtype = (name: string) =>
      onChange({ ...value, qtypes: toggle(value.qtypes, name) });
  
    // Modulga qarab tegishli ro'yxatlar
    const qtypes = isReading ? READING_QTYPES : isListening ? LISTENING_QTYPES : [];
  
    return (
      <Box
        sx={(theme) => ({
          minWidth: 260,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: 2,
        })}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
          Filters
        </Typography>
  
        {/* Passage / Part bo‘limi */}
        {(isReading || isListening) && (
          <Accordion defaultExpanded disableGutters sx={{ boxShadow: "none" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>
                {isReading ? "Passage" : "Part"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {(isReading ? READING_PASSAGES : LISTENING_PARTS).map((name) => (
                  <FormControlLabel
                    key={name}
                    control={
                      <Checkbox
                        checked={
                          isReading
                            ? value.passages?.includes(name) ?? false
                            : value.parts?.includes(name) ?? false
                        }
                        onChange={() =>
                          isReading ? onTogglePassage(name) : onTogglePart(name)
                        }
                      />
                    }
                    label={name}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        )}
  
        {/* Question type bo‘limi */}
        {(isReading || isListening) && (
          <Accordion defaultExpanded disableGutters sx={{ boxShadow: "none", mt: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>Question type</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {qtypes.map((name) => (
                  <FormControlLabel
                    key={name}
                    control={
                      <Checkbox
                        checked={value.qtypes?.includes(name) ?? false}
                        onChange={() => onToggleQtype(name)}
                      />
                    }
                    label={name}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        )}
  
        {/* Agar Reading/Listening bo‘lmasa, bo‘sh */}
        {!isReading && !isListening && (
          <Typography variant="body2" color="text.secondary">
            Bu filter faqat Reading yoki Listening moduli uchun mavjud.
          </Typography>
        )}
      </Box>
    );
  };
  
  export default TestsQuestionFilter;
  