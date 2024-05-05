export async function send(formData: any, apiPath: string) {
  console.log(formData);

  try {
    const response = await fetch(apiPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to register user: ${response.statusText}`);
    }

    const responseBody = await response.json();

    console.log("data registered successfully!");
    console.log(responseBody.id);

    return responseBody.id;
  } catch (error) {
    console.error("Failed to register data:", error.message);
    // Handle the error gracefully here (e.g., show an error message to the user)
    throw error; // Propagate the error for further handling if needed
  }
}
