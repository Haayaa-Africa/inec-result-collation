import data from "../polling_units";

export function onRequest(context) {
  const pu = new URL(context.request.url).searchParams.get("pu");
  return new Response(
    JSON.stringify(
      data.find(
        (item) =>
          item.delim.toLowerCase().replaceAll(" ", "") ==
          pu.toLowerCase().replaceAll(" ", "")
      )
    )
  );
}
