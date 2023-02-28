import data from "../polling_units";

export function onRequest(context) {
  return new Response(
    JSON.stringify({
      data: [...new Map(data.map((item) => [item["state"], item])).values()],
    })
  );
}
