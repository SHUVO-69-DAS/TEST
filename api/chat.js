export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed", friendly: true });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is missing in server environment variables.",
      friendly: false,
    });
  }

  try {
    const { messages, language } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Invalid request payload", friendly: true });
    }

    const safeMessages = messages.slice(-10).map((m) => ({
      role: m.role === "model" ? "model" : "user",
      parts: [{ text: String(m.text || "").slice(0, 1500) }],
    }));

    const systemInstruction = `You are Shuvo AI, the official portfolio assistant for SHUVO DAS. Answer concisely and professionally using only verified portfolio facts.${
      language ? ` Respond in language code: ${language}.` : ""
    }`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: safeMessages,
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "Upstream AI error",
        friendly: true,
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response right now.";

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error while contacting AI.",
      friendly: true,
    });
  }
}
