const rax = require('retry-axios');
const axios = require('axios');
const _ = require('lodash');
require('dotenv').config();


(async () => {
  const KontentDeliveryProductionDomain = "https://deliver.kontent.ai";
  const continuationHeaderName = 'x-continuation';


  console.time("Axios test");
  console.log("Starting test");
  let total = 0;
  for (const lang of process.env.LANGUAGES.split(";")) {
    console.time(`Loading ${lang}`);
    console.log(`Loading all items test for ${lang}`);
    let continuationToken = "";
    const items = [];
    do {
      const headers = {
        [continuationHeaderName]: continuationToken
      };
      try {
        const interceptorId = rax.attach();
        const response = await axios.get(`${KontentDeliveryProductionDomain}/${process.env.PROJECT_ID}/items-feed?language=${lang}`, {
          headers,
          raxConfig: {
            onRetryAttempt: err => {
              const cfg = rax.getConfig(err);
              console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
            }
          }
        });

        const union = _.unionBy(
          response.data.items,
          Object.values(response.data.modular_content),
          'system.codename');
        items.push(...union);
        continuationToken = response.headers[continuationHeaderName];
      } catch (error) {
        console.error(`Items load for project ${process.env.PROJECT_ID} on language ${lang} failed with error: ${JSON.stringify(error)}`);
      }
    } while (continuationToken);
    console.timeEnd(`Loading ${lang}`);
    console.log(`All items loaded for ${lang}`);
    console.log(`In total after union ${items.length}`);
    total += items.length;
  }

  console.log(`Total items: ${total}`);
  console.timeEnd("Axios test");
})();