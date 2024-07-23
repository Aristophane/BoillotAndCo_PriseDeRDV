const BIGCHANGE_BASE_API =
  "https://webservice.bigchangeapps.com/v01/services.ashx?key=55a4a569-e7f5";

export const handler = async (event, context) => {
  const params = event.queryStringParameters;
  const phoneNumber = params.phone; // Remplacer 'param1' par le nom de votre paramètre
  const postCode = params.postCode;
  const formattedPhoneNumber = replacePlusWithEncodedPlus(phoneNumber);
  const clientId = await getContactIdFromPhoneAndPostCode(
    formattedPhoneNumber,
    postCode
  );

  const responseForJobs = await getJobListFromContactId(clientId);

  return {
    statusCode: 200,
    body: JSON.stringify({ responseForJobs }),
  };
};

function replacePlusWithEncodedPlus(inputString) {
  return inputString.replace(/\+/g, "%2B");
}

const getContactIdFromPhoneAndPostCode = async (phone, postCode) => {
  const CONTACTS_BY_PHONE_METHOD = "&action=ContactsByPhone";

  const apiUrlForContactsByPhone = `${BIGCHANGE_BASE_API}${CONTACTS_BY_PHONE_METHOD}&phonenumber=${phone}`;

  console.log("phone " + phone);
  const responseForContact = await fetch(apiUrlForContactsByPhone, {
    method: "GET",
    headers: {
      Authorization:
        "Basic cGllcnJlbG91aXNib2lsbG90QGJuZGMuY29tOlRlc3QxMjMwOTgqIQ==",
    },
  }).then((response) => response.json());

  console.log(responseForContact);

  const data = responseForContact?.Result.filter(
    (contact) => contact.ContactPostCode === postCode
  );

  //TODO ajouter la gestion du fait qu'avoir plusieurs résultats doit stopper le processus

  return data[0].ContactId;
};

const getJobListFromContactId = async (clientId) => {
  const JOBLIST_METHOD =
    "&action=JobsListByContactPaged&V2=1&page=0&pageSize=500";
  const apiUrlForJobList = `${BIGCHANGE_BASE_API}${JOBLIST_METHOD}&contactId=${clientId}`;
  const responseForJobs = await fetch(apiUrlForJobList, {
    method: "GET",
    headers: {
      Authorization:
        "Basic cGllcnJlbG91aXNib2lsbG90QGJuZGMuY29tOlRlc3QxMjMwOTgqIQ==",
    },
  }).then((responseForJobs) => responseForJobs.json());

  return responseForJobs;
};
