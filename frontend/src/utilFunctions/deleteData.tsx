export async function deleteData(path: string) {
  const response = await fetch(path, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    // Success handling
    console.log("data deleted successfully!");
    //console.log(responseBody.id);
  } else {
    // Error handling
    console.error("Failed to delete data:", response.statusText);
  }
}
