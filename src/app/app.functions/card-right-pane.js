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
                text: "**Account Health**"
              },
              {
                type: "alert",
                title: "In Good Standing",
                body: {
                  type: "text",
                  text: "No outstanding balance"
                },
                variant: "success"
              }
            ]
          },
          {
            type: "tile",
            content: [
              {
                type: "text",
                format: "markdown",
                text: "**Contact Information**"
              },
              {
                type: "text",
                format: "markdown",
                text: "Credit Class: "
              },
              {
                type: "text",
                format: "markdown",
                text: "Account Type: "
              },
              {
                type: "text",
                format: "markdown",
                text: "Current Balance: "
              },
              {
                type: "text",
                format: "markdown",
                text: "Account Role: "
              },
              {
                type: "text",
                format: "markdown",
                text: "Multi Line Discount: "
              },
            ]
          },
          {
            "type": "tile",
            "content": [
              {
                type: "text",
                format: "markdown",
                text: "**Data**"
              },
              {
                type: "text",
                format: "markdown",
                text: "Data Usage:"
              },
              {
                type: "text",
                format: "markdown",
                text: "US Roaming Usage:"
              },
              {
                type: "text",
                format: "markdown",
                text: "Account Overages:"
              },
              {
                type: "text",
                format: "markdown",
                text: "Avg. $ Spent on Overage:"
              },
              {
                type: "text",
                format: "markdown",
                text: "Pay Per Use Charge:"
              },
            ]
          },
        ]
    });
  };