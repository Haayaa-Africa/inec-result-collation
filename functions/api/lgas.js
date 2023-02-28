import data from "../polling_units";

export function onRequest(context) {
  const state = new URL(context.request.url).searchParams.get("state");
  return new Response(
    JSON.stringify({
      name: state,
      data: [
        ...new Map(data.map((item) => [item["lga"], item])).values(),
      ].filter(
        (item) =>
          item.state.toLowerCase().replaceAll(" ", "") ==
          state.toLowerCase().replaceAll(" ", "")
      ),
    })
  );
}
