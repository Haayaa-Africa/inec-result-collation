import data from "../polling_units";

export function onRequest(context) {
  const ward = new URL(context.request.url).searchParams.get("ward");
  return new Response(
    JSON.stringify({
      name: ward,
      data: [
        ...new Map(data.map((item) => [item["pu"], item])).values(),
      ].filter(
        (item) =>
          item.ward.toLowerCase().replaceAll(" ", "") ==
          ward.toLowerCase().replaceAll(" ", "")
      ),
    })
  );
}
