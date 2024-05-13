import IndexClient from "@indexnetwork/sdk";
import readline from "readline";
import { v4 as uuidv4 } from "uuid";

const indexId =
  "kjzl6kcym7w8ya6b1g43pzxgv0x9uv57k516r8uroem4s3zonkr95dac55n5gtr";

async function main() {
  try {
    // const session = "";
    const indexClient = new IndexClient({
      domain: "index.network",
      network: "ethereum",
      privateKey: process.env.PRIVATE_KEY, // or session
    });

    await indexClient.authenticate();

    const question = "What is $STYLE Protocol?";

    console.clear();
    let response = "";
    for await (const messageChunk of indexClient.chat({
      id: uuidv4(), // provide a unique chat id for the query
      messages: [
        {
          content: question,
          role: "user",
        },
      ],
      // indexes: [indexId],
      did: "did:pkh:eip155:1:0x0c558b655d388f7041bc4FbfbdF02AE1a605F19B",
    })) {
      readline.cursorTo(process.stdout, 0, 1);
      readline.clearLine(process.stdout, 0);
      response += messageChunk;
      process.stdout.write(
        `Question: ${question}\n\nQueried response: ` + response,
      );
    }
  } catch (err) {
    console.error(err);
  }
}

main();
