import IndexClient from "@indexnetwork/sdk";

async function main() {
  try {
    const indexClient = new IndexClient({
      domain: "index.network",
      network: "ethereum",
      privateKey: process.env.PRIVATE_KEY, // or session
    });

    await indexClient.authenticate();

    // did = to your public key 
    const did = "did:pkh:eip155:1:0x0c558b655d388f7041bc4FbfbdF02AE1a605F19B";
    const indexId =
      "kjzl6kcym7w8ya6b1g43pzxgv0x9uv57k516r8uroem4s3zonkr95dac55n5gtr";

    await indexClient.starIndex(did, indexId);

    let fetchedIndex = await indexClient.getIndex(indexId);
    console.log("is starred", fetchedIndex.did.starred);

    await indexClient.unstarIndex(did, indexId);

    fetchedIndex = await indexClient.getIndex(indexId);
    console.log("is starred", fetchedIndex.did.starred);
  } catch (err) {
    console.error(err);
  }
}

main();
