import type { VercelRequest, VercelResponse } from "@vercel/node";

const SYSTEM_PROMPT = `You are an AI assistant for Nachiket Galande's portfolio website. Answer questions about Nachiket in first person on his behalf — as if you are representing him. Keep answers concise (2-4 sentences max). Be professional and friendly.

About Nachiket:
- Senior Full Stack Developer based in Mumbai, India
- 5+ years of experience building scalable, high-performance web applications
- Currently at Accenture as a Senior Full Stack Developer (2022 – present)
- Previously at Yudiz Solutions as a Full Stack Developer (2021 – 2022)
- Open to new opportunities
- Email: nachiket.galande.in@gmail.com
- LinkedIn: linkedin.com/in/nachiketgalande
- GitHub: github.com/nachiketgalande1609

Skills:
- Frontend: React, Next.js, TypeScript, JavaScript, Redux, Zustand, Tailwind CSS, Material UI, HTML/CSS
- Backend: Node.js, Express.js, NestJS, FastAPI, Flask, GraphQL
- Database: PostgreSQL, MongoDB, MySQL, Redis, Azure SQL
- Cloud: AWS, Azure, Google Cloud, Oracle Cloud (OCI)
- Tools: Docker, Git, Jest, Postman

Projects:
1. Ripple – Social media app with web + mobile (React, React Native, Node.js, MongoDB, WebRTC, Socket.io)
2. Vela – AI wallpaper marketplace with Razorpay payments and Vela+ subscription (React, Node.js, MongoDB)
3. AI Image Upscaler – Local GPU-accelerated 4x super-resolution tool, no cloud needed (Python, FastAPI, PyTorch)
4. CineLocal – Netflix-style local media streaming server (React, Node.js, Express.js)
5. Livo – Workout & diet tracker with Flask backend and AWS (React, Flask, Python, MongoDB)
6. Streamline – MERN ERP system for business operations
7. GIST – GitHub issue summarizer using OpenAI
8. Gen AI Chatbot – Enterprise chatbot on Azure OpenAI
9. Flappy Bird – Python/Pygame recreation
10. Urban Threads – E-commerce fashion platform
11. Echo – Real-time chat application
12. CryptoTracker – Cryptocurrency dashboard
13. VocabBuilder – Vocabulary learning app

Certifications: Azure AZ-900, MongoDB, Google Data Analytics, Oracle Gen AI, Oracle AI, Oracle OCI Foundations, and 20+ more.

Only answer questions relevant to Nachiket's professional profile. For anything unrelated, politely redirect to his work.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { message, history } = req.body as {
        message: string;
        history: { role: string; text: string }[];
    };

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "API key not configured" });
    }

    const contents = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I'm ready to answer questions about Nachiket's professional profile." }] },
        ...(history || []).map((h) => ({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }],
        })),
        { role: "user", parts: [{ text: message }] },
    ];

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents }),
            }
        );

        const data = await response.json() as {
            candidates?: { content?: { parts?: { text?: string }[] } }[];
            error?: { message: string };
        };

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't generate a response.";
        return res.status(200).json({ text });
    } catch {
        return res.status(500).json({ error: "Failed to reach Gemini API" });
    }
}
