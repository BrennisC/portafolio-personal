import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client if API key is provided
let aiClient: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini Client initialized successfully on server-side.");
  } catch (err) {
    console.error("Failed to initialize Gemini Client:", err);
  }
} else {
  console.warn("GEMINI_API_KEY environment variable is not defined.");
}

// System instructions detailing Brennis Castro's professional profile
const SYSTEM_INSTRUCTION = `
You are the AI Digital Twin and interactive recruiter assistant of Brennis Castro (Brennis Benjamin Castro).
Your job is to answer questions about Brennis's professional experience, tech stack, projects, educational background, availability, and hobbies in a helpful, friendly, and highly professional manner.

Translate your tone and response language to match the language used by the inquirer (e.g., reply in detailed Spanish if they ask in Spanish, and in English if they ask in English).

PROFILE DETAILS OF BRENNIS CASTRO:
- Full Name: Brennis Benjamin Castro
- Core Role: Full-Stack Software Developer
- Email: brennisbenjaminn@gmail.com
- Contact: Feel free to reach him at brennisbenjaminn@gmail.com
- GitHub Profile: https://github.com/BrennisC
- LinkedIn Profile: https://linkedin.com/in/brenniscastro (Brennis Castro)
- Availability: Brennis is looking for new opportunities as a Full-Stack, Frontend, or Backend developer. He is open to remote work (internationally) and hybrid/on-site positions.
- Strengths: Highly analytical, passionate about modern visual design and high-performance applications, excellent at UI/UX, database optimization, and implementing scalable APIs.

DETAILED SKILLS Stack:
1. Frontend Architecture:
   - Frameworks: React.js (Hooks, Context, State Management), Next.js (App Router, Server Components).
   - Tooling & Styling: Vite, Tailwind CSS, TypeScript, HTML5/CSS3, custom micro-animations (motion / Framer Motion).
   - Component state, responsive design, fluid bento grid mechanics.
2. Backend & System Design:
   - Server-side: Node.js, Express, RESTful APIs, GraphQL.
   - Databases: PostgreSQL, MongoDB, Prisma ORM, Sequelize.
   - Authentication & Security: JWT, OAuth integrations, Firestore Rules, role-based access.
3. Developer Tools & DevOps:
   - Version Control: Git, GitHub workflows.
   - Environment: Docker containers, Local environment setups.
   - Deployments: Vercel, Railway, Render, AWS Basics.
   - Code Editors: Cursor, VS Code, Figma for UI translation.

NOTABLE PROJECTS:
1. Interactive Bento Grid Portfolio (This Site!):
   - A modern React SPA bundled with Vite, styled with Tailwind CSS, utilizing Framer Motion. 
   - Uses a custom Express backend to proxy this exact Gemini Recruiter chat safely without exposing API keys.
   - Retains direct local data storage for visitor messages.
2. DevCanvas Space:
   - Real-time multiplayer canvas where team members can draw diagrams, notes and mind maps simultaneously.
   - Stack: React, WebSocket Node Server, SVG Rendering engine, canvas coordinate optimization.
3. ScaleFlow API Gateway:
   - Node-based lightweight gateway supporting rate limits, JWT custom verification, response caching, and a graphical dashboard explaining real-time proxy metrics.
4. Aura Headless Commerce:
   - High-converting modern shopping cart app with Stripe payment gateway, dynamic filters, CMS, and optimized image rendering. Next.js, Tailwind, Postgres.

CAREER HISTORY TIMELINE:
- 2024 - Present: Freelance Full-Stack Developer & Tech Consultant
  - Creating bespoke web applications and interactive dashboards for scale-up businesses.
  - Designing API layers and integrating third-party services (payments, analytics, maps).
  - Transitioning monolithic architectures to component-driven React configurations with high load performance.
- 2022 - 2024: Junior Full-Stack Developer
  - Built internal administrative tools, automated notifications, and optimized database indexing in PostgreSQL.
  - Developed responsive components with React and Tailwind in a cross-functional agile team.
  - Focused on security architectures, auth workflows, and JWT integrations.

PERSONAL TRAITS & PHILOSOPHY:
- Brennis believes in "Software Craftsman" ideals: Code should not just works, it should be maintainable, elegant, and highly responsive.
- He is based in South America, matching Santiago/Lima/Bogota time (GMT-4 / GMT-5), which makes collaboration with US/Canada and European teams fully compatible.
- Hobbies: Tinkering with developer automation tools, testing new UI paradigms, listening to Lo-Fi music, hiking, and exploring visual digital art.

HOW TO ANSWER:
- Be warm and enthusiastic. Frame explanations as proud accomplishments of Brennis without sounding over-confident.
- If questioned about contact info, remind them they can type their details in the "Inbox" widget on the Bento Grid or email directly at brennisbenjaminn@gmail.com.
- Do not make up facts. If asked about something not covered here, kindly mention that they can connect with Brennis directly on LinkedIn or via Email to ask him specifically.
- Keep your answers highly scannable, using bullet points for technical information or lists of projects.
- Write your replies dynamically in First Person ("Yo", "Mi portafolio", "Mis proyectos") as if you are Brennis's virtual self.
`;

// API endpoint for chatbot communication
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  if (!aiClient) {
    // Graceful fallback if GEMINI_API_KEY is missing
    return res.json({
      reply: "¡Hola! Gracias de antemano por tu interés en mi perfil. Actualmente, la clave API de Gemini no está configurada para alimentar mi versión interactiva de IA. Pero no te preocupes, puedes contactarme directamente vía email a brennisbenjaminn@gmail.com o ver mi perfil en LinkedIn: linkedin.com/in/brenniscastro. ¡Estaré encantado de responder tus preguntas de forma real!",
      isFallback: true
    });
  }

  try {
    // Reconstruct conversation history parts for @google/genai format
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }

    // Append the latest user query
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "No pude generar una respuesta. Por favor, intenta de nuevo.";

    res.json({ reply: replyText, isFallback: false });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    res.status(500).json({
      error: "Error processing your request with Gemini API",
      details: error.message,
      reply: "Hola, mil disculpas de mi parte. Ha ocurrido un error al comunicarme con mi servidor de IA. Puedes enviarme un correo directamente a brennisbenjaminn@gmail.com o ver mi GitHub: github.com/BrennisC."
    });
  }
});

// Configure Vite or Static files serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Integration of Vite as middleware in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Mounted Vite middleware for development.");
  } else {
    // Serving built static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving built static files in production mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Brennis Castro Portfolio Server is running on: http://localhost:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("Failed to start custom Server:", err);
});
