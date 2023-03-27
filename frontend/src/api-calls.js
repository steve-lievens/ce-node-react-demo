export async function getEnvironment() {
  try {
    console.log("INFO : api-calls.js getEnvironment : start");
    const response = await fetch("/getEnvironment");
    console.log("INFO : api-calls.js getEnvironment : end");
    return await response.json();
  } catch (error) {
    return {};
  }
}
