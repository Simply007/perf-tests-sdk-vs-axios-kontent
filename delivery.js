const _ = require('lodash');
const { DeliveryClient } = require('@kentico/kontent-delivery');
require('dotenv').config();


(async () => {

  const client = new DeliveryClient({
    projectId: process.env.PROJECT_ID
  });

  console.time("Delivery SDK test");
  console.log("Starting test")
  let total = 0;
  for (const lang of process.env.LANGUAGES.split(";")) {
    console.time(`Loading ${lang}`);
    console.log(`Loading all items test for ${lang}`);
    const contentItemsResponse = await client
      .itemsFeedAll()
      .languageParameter(lang)
      .toPromise();

    console.timeEnd(`Loading ${lang}`);
    console.log(`All items loaded for ${lang}`);

    console.time(`Unioning ${lang}`);
    console.log(`Unioning items for ${lang}`);
    const linkedItems = Object.values(contentItemsResponse.linkedItems).map(item => item._raw);
    console.log(`For language ${lang} it is ${contentItemsResponse.items.length} item + ${linkedItems.length} linked items`);
    const allItems = _.unionBy(
      contentItemsResponse.items.map(item => item._raw),
      linkedItems,
      'system.codename'
    );
    console.log(`All items unioned for ${lang}`);
    console.timeEnd(`Unioning ${lang}`);

    console.log(`In total after union ${allItems.length}`);
    total += allItems.length;
  };

  console.log(`Total items: ${total}`);
  console.timeEnd("Delivery SDK test");
})();