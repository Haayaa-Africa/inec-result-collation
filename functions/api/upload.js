export async function onRequest(context) {
  const formData = await context.request.formData();

  const resp = await fetch(`https://api.tatum.io/v3/ipfs`, {
    method: "POST",
    headers: {
      "x-api-key": context.env.TATUM_API_KEY,
    },
    body: formData,
  });

  if (!resp.ok) {
    return new Response("Something went wrong. Please try again later.");
  }

  const data = await resp.json();

  const result = await fetch(
    `https://eefcfptfqmkvqdckwmfk.supabase.co/rest/v1/results`,
    {
      method: "POST",
      headers: {
        apikey: context.env.SUPABASE_API_KEY,
        Authorization: "Bearer " + context.env.SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        delim: formData.get("delim"),
        link: data?.ipfsHash,
      }),
    }
  );

  if (!result.ok) {
    return new Response("Something went wrong. Please try again later.");
  }

  return new Response("Success");
}
