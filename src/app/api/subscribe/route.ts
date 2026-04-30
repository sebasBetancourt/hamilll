import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, email, phone } = body;

    const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL;

    if (!ghlWebhookUrl) {
      console.error("GHL_WEBHOOK_URL is not defined in environment variables");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    // Proxy request to GoHighLevel
    const response = await fetch(ghlWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        name: firstName, // Mapped to 'name' as well for redundancy
        email,
        phone,
        source: "Personal Brand Website",
      }),
    });

    if (!response.ok) {
      throw new Error(`GHL responded with ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
