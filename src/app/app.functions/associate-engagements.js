//associate engagements on Opportunity to any associated Promotions/Deals
//
const hubspot = require('@hubspot/api-client');

exports.main = async (context = {}, sendResponse) => {
  // Instantiating HubSpot node API client
  //console.log(`access token: ${context.secrets.PRIVATE_APP_ACCESS_TOKEN}`)
  const hubspotClient = new hubspot.Client({
    accessToken: context.secrets.PRIVATE_APP_ACCESS_TOKEN,
  });
  const { hs_object_id } = context.propertiesToSend;

  try {
    //get Deals associated to the Opportunity
   await hubspotClient.crm.deals.associationsApi.getAll(hs_object_id,'contacts')
      .then(data => {
        let associatedDealIds = data.results.map(deal => deal.id);
        console.log(`The deals associated deal IDs are ${associatedDealIds.join(', ')}`);
        //get most recent notes associated to Opportunity
        hubspotClient.crm.deals.associationsApi.getAll(hs_object_id,'notes')
        .then(data => {
            let allAssociatedEngagements = data.results.map(engagement => engagement.id);
            let mostRecentEngagement = allAssociatedEngagements[allAssociatedEngagements.length-1];
            console.log(`Associated Deal Ids: ${associatedDealIds}; associated engagement: ${mostRecentEngagement}`)
            var batchInput = createBatchBody(mostRecentEngagement, associatedDealIds);
            console.log(JSON.stringify(batchInput))
            //create association between Deals and Note
            hubspotClient.crm.associations.batchApi
              .create('note','contact',batchInput)
              .then(result => {
                console.log(result);
                sendResponse({
                  message: {
                    type: 'SUCCESS',
                    body: `Successfully executed action! Associated Engagement: ${mostRecentEngagement} to deals ${associatedDealIds}`,
                  },
                })
            })
            .catch(error => {
              sendResponse({
                message: {
                  type: 'ERROR',
                  body: `There was an error: ${error} `,
                },
              });
            });
        })
        .catch(error => {
            sendResponse({
              message: {
                type: 'ERROR',
                body: `There was an error: ${error} `,
              },
            });
          });
      })
      .catch(error => {
        sendResponse({
          message: {
            type: 'ERROR',
            body: `There was an error: ${error} `,
          },
        });
      });
  } catch (error) {
    throw new Error(
      `There was an error executing the serverless function: ${error.message}`
    );
  }
};
function createBatchBody(engagementId, dealIds) {
    return {
      inputs: dealIds.map(dealId => {
        return {
          _from: {
            id: engagementId
          },
          to: {
            id: dealId
          },
          type: 'note_to_contact'
        };
      })
    };
}