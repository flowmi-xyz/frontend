async function getGasFee() {
  const mumbaiGasResponse = await fetch(
    `https://gasstation-mumbai.matic.today/v2`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const gasFee = await mumbaiGasResponse.json();

  return gasFee;
}

export { getGasFee };
