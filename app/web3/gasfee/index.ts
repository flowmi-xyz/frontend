import fetch from "node-fetch";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

async function getGasFee() {
  const mumbaiGasResponse = await fetch(
    `https://gasstation-mumbai.matic.today/v2`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      agent: httpsAgent,
    }
  );

  const gasFee = await mumbaiGasResponse.json();

  return gasFee;
}

export { getGasFee };
