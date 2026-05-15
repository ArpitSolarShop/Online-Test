import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phone, name, url } = await req.json();

    if (!phone || !url) {
      return NextResponse.json({ error: "Missing phone or URL" }, { status: 400 });
    }

    // Format recipient to E.164 (handles 10-digit Indian numbers)
    let formattedPhone = phone.replace(/\D/g, "");
    if (formattedPhone.length === 10) {
      formattedPhone = "+91" + formattedPhone;
    } else if (!formattedPhone.startsWith("+") && formattedPhone.length > 10) {
      formattedPhone = "+" + formattedPhone;
    }

    const API_KEY = process.env.DOUBLETICK_API_KEY;
    const SENDER  = process.env.DOUBLETICK_SENDER;

    if (!API_KEY) {
      console.error("[WhatsApp] Missing DOUBLETICK_API_KEY");
      return NextResponse.json({ error: "Server configuration error: missing API key" }, { status: 500 });
    }

    if (!SENDER) {
      console.error("[WhatsApp] Missing DOUBLETICK_SENDER — set your registered WABA number in .env");
      return NextResponse.json({ error: "Server configuration error: missing sender number" }, { status: 500 });
    }

    // DoubleTick template message payload
    // "from" MUST be your registered WhatsApp Business sender number (WABA number) in E.164 format.
    // "to"   is the recipient's number in E.164 format.
    const payload = {
      messages: [
        {
          from: SENDER,           // ← your registered WABA sender number
          to: formattedPhone,     // ← candidate's number
          content: {
            templateName: "online_exam",
            language: "en",
            templateData: {
              body: {
                // Placeholder order MUST match the template variables:
                // {{1}} → Candidate Name
                // {{2}} → Test Link URL
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
      console.error("[WhatsApp] API error:", data);
      return NextResponse.json(
        { error: data?.message || "Failed to send WhatsApp message" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("[WhatsApp] Unexpected error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
