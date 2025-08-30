import { useState } from "react";
import {
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
  Button,
  Chip,
  Switch,
} from "@mui/material";

type Billing = "monthly" | "yearly";

const price = (base: number, billing: Billing) =>
  billing === "monthly" ? base : Math.round(base * 10); // yiliga ~2 oy chegirma (misol)

const Subscription = () => {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      {/* Header */}
      <Stack alignItems="center" spacing={2} sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: 0.2 }}>
          Subscription Plans
        </Typography>
        <Typography color="text.secondary" align="center" maxWidth={560}>
          Choose a plan that fits your learning pace. Upgrade anytime.
        </Typography>

        {/* Billing toggle (minimallikni buzmaydi) */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">Monthly</Typography>
          <Switch
            checked={billing === "yearly"}
            onChange={() => setBilling((p) => (p === "monthly" ? "yearly" : "monthly"))}
          />
        <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2" color="text.secondary">Yearly</Typography>
        <Chip label="Save ~17%" size="small" />
        </Stack>
        </Stack>
      </Stack>

      {/* Cards — grid YO‘Q, faqat Stack/Flex */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ alignItems: { xs: "stretch", md: "stretch" }, justifyContent: "center" }}
      >
        {/* Free */}
        <Card
          variant="outlined"
          sx={{
            flex: 1,
            borderRadius: 3,
            boxShadow: "none",
            ":hover": { boxShadow: 2 },
            transition: "box-shadow .2s ease",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Free
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              ${price(0, billing)}
              <Typography component="span" variant="body2" color="text.secondary"> / {billing}</Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try basics at no cost.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={1.2} sx={{ mb: 3 }}>
              <Typography>• 2 mock tests / month</Typography>
              <Typography>• Basic analytics</Typography>
              <Typography>• Community access</Typography>
            </Stack>
            <Button fullWidth variant="outlined">Get Started</Button>
          </CardContent>
        </Card>

        {/* Standard */}
        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: 2,
            position: "relative",
          }}
        >
          <Chip
            label="Recommended"
            color="primary"
            size="small"
            sx={{ position: "absolute", top: 12, right: 12 }}
          />
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Standard
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              ${price(12, billing)}
              <Typography component="span" variant="body2" color="text.secondary"> / {billing}</Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Everything to prepare confidently.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={1.2} sx={{ mb: 3 }}>
              <Typography>• Unlimited mock tests</Typography>
              <Typography>• Detailed explanations</Typography>
              <Typography>• Progress tracking</Typography>
              <Typography>• Email support</Typography>
            </Stack>
            <Button fullWidth variant="contained">Choose Standard</Button>
          </CardContent>
        </Card>

        {/* Pro */}
        <Card
          variant="outlined"
          sx={{
            flex: 1,
            borderRadius: 3,
            boxShadow: "none",
            ":hover": { boxShadow: 2 },
            transition: "box-shadow .2s ease",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Pro
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              ${price(24, billing)}
              <Typography component="span" variant="body2" color="text.secondary"> / {billing}</Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Advanced tools & priority support.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={1.2} sx={{ mb: 3 }}>
              <Typography>• AI feedback on writing</Typography>
              <Typography>• Speaking evaluator</Typography>
              <Typography>• Custom study plan</Typography>
              <Typography>• Priority support</Typography>
            </Stack>
            <Button fullWidth variant="outlined">Go Pro</Button>
          </CardContent>
        </Card>
      </Stack>

      {/* Footnote */}
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        align="center"
        sx={{ mt: 4 }}
      >
        You can cancel or change your plan anytime.
      </Typography>
    </Container>
  );
};

export default Subscription;
