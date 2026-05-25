export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!process.env.MISTRAL_API_KEY) {
      return Response.json(
        { error: "MISTRAL_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // Format messages for Mistral
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await fetch(
      "https://api.mistral.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistral-small-latest",
          messages: [
            {
              role: "system",
              content:
                "You are SlotsBot, a helpful assistant for SlotsLib sports facility booking platform. Help users find and book sports facilities. Be friendly and professional.",
            },
            ...formattedMessages,
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Mistral API Error:", error);
      throw new Error(error.message || "Failed to get response from Mistral");
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return Response.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error.message);
    return Response.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}