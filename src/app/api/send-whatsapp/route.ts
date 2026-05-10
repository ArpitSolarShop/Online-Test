import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phone, name, url } = await req.json();

    if (!phone || !url) {
      return NextResponse.json({ error: "Missing phone or URL" }, { status: 400 });
    }

    // Format phone number to E.164 if it's a 10-digit Indian number
    let formattedPhone = phone.replace(/\D/g, "");
    if (formattedPhone.length === 10) {
      formattedPhone = "+91" + formattedPhone;
    } else if (!formattedPhone.startsWith("+") && formattedPhone.length > 10) {
      formattedPhone = "+" + formattedPhone;
    }

    const API_KEY = process.env.DOUBLETICK_API_KEY;

    if (!API_KEY) {
      console.error("Missing DOUBLETICK_API_KEY");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // DoubleTick API payload based on user's curl
    const payload = {
      messages: [
        {
          to: formattedPhone,
          from: "",
          content: {
            templateName: "online_exam",
            language: "en",
            templateData: {
              body: {
                // The order of placeholders MUST match the order they appear in the template text.
                // 1st variable: {{CandidateName}} -> name
                // 2nd variable: {{TestLink}} -> url
                placeholders: [name, url],
              },
            },
          },
        },
      ],
    };

    const response = await fetch("https://public.doubletick.io/whatsapp/message/template", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[WhatsApp Error]", data);
      return NextResponse.json({ error: "Failed to send WhatsApp message" }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("[WhatsApp Error]", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
