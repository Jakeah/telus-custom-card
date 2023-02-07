const hubspot = require('@hubspot/api-client');
//Need to add code to render the card
exports.main = async (context = {}, sendResponse) => {
    console.log(context)
    sendResponse({
      sections:
        [
          {
            type: "tile",
            content: [
              {
                type: "text",
                format: "markdown",
                text: "[Action Leads Dashboard](https://app.hubspot.com/reports-dashboard/7248849/view/9866383)"
              },
              {
                type: "text",
                format: "markdown",
                text: "[Performance Dashboard](https://app.hubspot.com/reports-dashboard/7248849/view/9645933)"
              },
            ]
          },
        ]
    });
  };