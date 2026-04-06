export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const email = formData.get("email");

  if (!email) {
    return new Response("Missing email", { status: 400 });
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Valuna <onboarding@valuna.app>",
      to: "hello@valuna.app",
      subject: "🔥 New Valuna Waitlist Signup",
      html: `<p>New signup: ${email}</p>`,
    }),
  });

  return Response.redirect("https://valuna.app?joined=true", 302);
}
