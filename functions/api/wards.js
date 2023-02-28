import data from "../polling_units";

export function onRequest(context) {
  const lga = new URL(context.request.url).searchParams.get("lga");
  return new Response(
    JSON.stringify({
      name: lga,
      data: [
        ...new Map(data.map((item) => [item["ward"], item])).values(),
      ].filter(
        (item) =>
          item.lga.toLowerCase().replaceAll(" ", "") ==
          lga.toLowerCase().replaceAll(" ", "")
      ),
    })
  );
}
