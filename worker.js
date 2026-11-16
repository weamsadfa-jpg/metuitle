export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("OK");
    }
    const { prompt } = await request.json();
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );
    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "ما كدرت أجاوب";
    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}
