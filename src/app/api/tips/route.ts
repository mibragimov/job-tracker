import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { role, company } = await request.json();
    
    const prompt = `Give 3 brief tips for applying to ${role} position at ${company}. Keep each tip under 10 words. Format as bullet points.`;

    const response = await fetch("https://api.minimax.chat/v1/text/chatcompletion_pro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MINIMAX_API_KEY}`
      },
      body: JSON.stringify({
        model: "MiniMax-Text-01",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();
    const tips = data.choices?.[0]?.message?.content || "No tips available";

    return NextResponse.json({ tips });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate tips" }, { status: 500 });
  }
}
