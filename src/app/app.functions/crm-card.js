const hubspot = require('@hubspot/api-client');
const axios = require('axios');
let counter;
//Need to add code to render the card
exports.main = async (context = {}, sendResponse) => {
    console.log(context)
    const buttonRowSection = [
      {

        type: "buttonRow",
        "buttons": [
          {
            type: 'button',
            text: 'Authentication/PIN',
            onClick: {
              type: 'IFRAME',
              // Width and height of the iframe (in pixels)
              width: 400,
              height: 300,
              uri: 'https://nice.jacobconnors.me/telus-pin-lookup',
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
            }
          }
        ]
      },

      {
        "type": "divider",
        "distance": "small"
      },

    ];

    const otherSections = [
      {
        "type": "divider",
        "distance": "small"
      },
      {
        type: "heading",
        format: "markdown",
        text: "**Best Promotion Available**"
      },
      {
        type: "text",
        format: "markdown",
        text: "**Phone, Internet, and TV Bundle**"
      },
      {
        type: "button",
        text: "View All Available Promotions",
        onClick: {
          type: "IFRAME",
          width: 700,
          height: 400,
          uri: "https://nice.jacobconnors.me/telus-available-promotions-list",
        }
      },
      {
        "type": "divider",
        "distance": "small"
      },
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
    ];

    if(counter === undefined || counter >= 3) {
      counter = 0;
    } else {
      counter += 1;
    } 

    try {
        const { data } = await axios.get("https://mocki.io/v1/d969b866-e762-43be-abbb-beb7f292f66a");
    
        const nextBestActionSection =  [
          {
            type: "heading",
            format: "markdown",
            text: "**Next Best Action**"
          },
          {
              type: "text",
              format: "markdown",
              text: `**${data[counter]}**`
          },
          {
            type: 'button',
            text: 'Get New Next Best Action',
            onClick: {
                type: 'SERVERLESS_ACTION_HOOK',
                serverlessFunction: "crm-card"
            }
          },
        ];
    
        sendResponse({sections: [...buttonRowSection, ...nextBestActionSection, ...otherSections]});
      } catch (error) {
        // "message" will create an error feedback banner when it catches an error
        sendResponse({
          message: {
            type: 'ERROR',
            body: `Error: ${error.message}`
          },
          sections: [...buttonRowSection, ...otherSections]
        });
      }
};