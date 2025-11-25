import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 7070;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.options("*", cors());
app.use(express.json());

const songs = [
  {
    title: "Night City",
    subtitle:
      "R E L and Artemis Delta • Cyberpunk 2077: Radio, Vol. 3 (Original Soundtrack)",
  },
  {
    title: "Delicate Weapon",
    subtitle:
      "Grimes and Lizzy Wizzy • Cyberpunk 2077: Radio, Vol. 2 (Original Soundtrack)",
  },
  {
    title: "Let You Down",
    subtitle:
      "Dawid Podsiadło • Cyberpunk: Edgerunners (Original Series Soundtrack)",
  },
  {
    title: "Chippin' In",
    subtitle:
      "Damian Ukeje, P.T. Adamczyk and Kerry ... • Cyberpunk 2077: Radio, Vol. 3 (Original ...)",
  },
  {
    title: "Never Fade Away (feat. Refused)",
    subtitle: "SAMURAI • Never Fade Away",
  },
  {
    title: "V",
    subtitle: "Marcin Przybyłowicz • Cyberpunk 2077 - Original Score",
  },
  {
    title: "The Rebel Path",
    subtitle: "P.T. Adamczyk • Cyberpunk 2077 - Original Score",
  },
  {
    title: "Kill the Messenger",
    subtitle:
      "Rezodrone and The Cartesian Duelists • Cyberpunk 2077: More Music from Night City ...",
  },
  {
    title: "Makes Me Feel Better",
    subtitle:
      "OnenO and Slavoj McAllister • Cyberpunk 2077: More Music from Night City Radio (Ori...)",
  },
  {
    title: "Black Terminal (Upgrade)",
    subtitle:
      "Blue Stahli, Danny Cocke & Inversion • Cyberpunk 2077: More Music from Night City Ra...",
  },
];

app.get("/songs", (_req: Request, res: Response) => {
  res.json(songs);
});

app.get("/", (_req: Request, res: Response) => {
  res.send("Backend OK");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
