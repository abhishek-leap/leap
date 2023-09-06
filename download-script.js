const axios = require('axios');
const fs = require('fs');
const downloadJsonFilesFromCloudFront = async () => {
  const enabledLanguages = [
    'en',
    'ru',
    'fr',
    'es',
    'zh',
    'ar',
    'id',
    'de',
    'it',
    'pt',
    'ja',
    'tr',
    'ca',
    'el',
    'nl',
    'jv',
    'ko',
    'he',
    'hr',
    'uk',
  ];
  const urls = enabledLanguages.map(
    lang => `https://d1hus0nx0ytxoz.cloudfront.net/translations/${lang}.json`,
  );
  try {
    for (const url of urls) {
      try {
        const fileUrl = url;
        const response = await axios.get(fileUrl);
        const data = JSON.stringify(response?.data);
        const destinationPath =
          './translations/' + url.substring(51, url.length);
        fs.writeFile(destinationPath, data, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
      } catch (error) {
        console.error('Error downloading file:', error);
        process.exit(1); // Exit the script with an error code
      }
    }
  } catch (error) {}
};

downloadJsonFilesFromCloudFront();
