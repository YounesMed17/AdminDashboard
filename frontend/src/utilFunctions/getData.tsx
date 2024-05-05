export async function get(path: string) {
  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();
  console.log(responseBody);
  if (response.ok) {
    // Success handling
    console.log("data received successfully!");
    //console.log(responseBody.id);

    return responseBody;
  } else {
    // Error handling
    console.error("Failed to receive user:", response.statusText);
  }
}
