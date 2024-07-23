export const handler = async () => {
    const BIGCHANGE_API = 'https://webservice.bigchangeapps.com/v01/services.ashx?action=ContactsByPhone';

    const response = await fetch(BIGCHANGE_API);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello World!',
      }),
    }
  }