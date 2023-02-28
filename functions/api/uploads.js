export async function onRequest(context) {
  const formData = await context.request.formData();

  const resp = await fetch(`https://api.tatum.io/v3/ipfs`, {
    method: "POST",
    headers: {
      "x-api-key": "",
    },
    body: formData,
  });

  return new Response(JSON.stringify(await resp.text()));
}
