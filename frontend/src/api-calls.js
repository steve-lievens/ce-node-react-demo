export async function getEnvironment() {
  try {
    console.log("getEnvironment : start");
    const response = await fetch("/getEnvironment");
    console.log("getEnvironment : end");
    return await response.json();
  } catch (error) {
    return [];
  }
}
