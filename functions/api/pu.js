import data from "../polling_units";

export async function onRequest(context) {
  const pu = new URL(context.request.url).searchParams.get("pu");

  const result = await fetch(
    `https://eefcfptfqmkvqdckwmfk.supabase.co/rest/v1/results?delim=eq.${pu}&select=*`,
    {
      headers: {
        apikey: context.env.SUPABASE_API_KEY,
        Authorization: "Bearer " + context.env.SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return new Response(
    JSON.stringify({
      ...data.find(
        (item) =>
          item.delim.toLowerCase().replaceAll(" ", "") ==
          pu.toLowerCase().replaceAll(" ", "")
      ),
      data: await result.json(),
    })
  );
}
