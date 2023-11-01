export default async function fetchEvaluation(messages) {
  const res = await fetch("/api/completion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  });

  const data = await res.json();
  return data;
}
