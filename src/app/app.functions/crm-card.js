const hubspot = require('@hubspot/api-client');
const axios = require('axios');
//Need to add code to render the card
exports.main = async (context = {}, sendResponse) => {
    console.log(context)
    const otherSections = [
      {
        "type": "divider",
        "distance": "small"
      },
      /*
        {
          "type": "crm::objectProperty",
          "objectTypeId":"contact",
          "objectId": 365, //Update the ID and Object to a relevant example
          "properties": [
           "firstname",
           "lastname",
           "hubspot_owner_id",
            "lifecyclestage",
          ]
         },
         //should add component to edit properties of 'primary' contact
      */
      {
        "type": "statistics",
        "items": [
          {
            "label": "# of Store Visits",
            "number": "8"
          },
          {
            "label": "Date of Last Store Visit",
            "number": "01/22/23",
          },
          {
            "label": "Primary Account Owner",
            "number": "Nekita Sidhho",
          },
          {
            "label": "Contract Renewal Date",
            "number": "07/01/23",
          }
        ]
      },       

      {
          "type": "divider",
          "distance": "small"
      },

      {
        "type": "statistics",
        "items": [
          {
            "label": "Migration to Fibre Enabled",
            "number": "Qualifies"
          },
          {
            "label": "Future Friendly Home",
            "number": "Qualifies",
          },
          {
            "label": "Has M&H Perk?",
            "number": "Yes",
          },
          {
            "label": "Smart Home Security",
            "number": "Qualifies",
          }
        ]
      },       

      {
        "type": "divider",
        "distance": "small"
      },
      {
        type: "heading",
        text: "Products & Services"
      },
      {
        "type": "crm::report",
        "reportId": 93098828
      },
      {
        "type": "divider",
        "distance": "small"
      },
//      {
//          type: 'text',
//          format: 'markdown',
//          text: `Available 'context' data for development debugging: \   
//            ${JSON.stringify(context)}`,
//      },
    ];

    try {
        const { data } = await axios.get("https://zenquotes.io/api/random");
    
        const nextBestActionSection =  [
            {
                type: "text",
                format: "markdown",
                text: `**${data[0].q}**`
            },
            {
              type: "buttonRow",
              "buttons": [
                {
                    type: 'button',
                    text: 'Get New Next Best Action',
                    onClick: {
                        type: 'SERVERLESS_ACTION_HOOK',
                        serverlessFunction: "crm-card"
                    },
                },
                {
                  type: 'button',
                  text: 'Authentication/PIN',
                  onClick: {
                    type: 'IFRAME',
                    // Width and height of the iframe (in pixels)
                    width: 1200,
                    height: 800,
                    uri: 'https://n.robertpainslie.com',
                  },
                },
                {
                  type: 'button',
                  text: 'Add Phone Line',
                  onClick: {
                    type: 'IFRAME',
                    // Width and height of the iframe (in pixels)
                    width: 800,
                    height: 500,
                    uri: 'https://share.hsforms.com/1xlbwm1rSR36N1CM0z3Qv0w4bd8x',
                  },
                },
                {
                  type: 'button',
                  text: 'Update Account Information',
                  onClick: {
                    type: "IFRAME",
                    width: 1200,
                    height: 800,
                    uri: 'https://www.google.com'
                  },
                }
            ]
          }
        ];
    
        sendResponse({sections: [...nextBestActionSection, ...otherSections]});
      } catch (error) {
        // "message" will create an error feedback banner when it catches an error
        sendResponse({
          message: {
            type: 'ERROR',
            body: `Error: ${error.message}`
          },
          sections: [...otherSections]
        });
      }
};