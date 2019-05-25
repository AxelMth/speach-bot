// [
//     {
//       listener: ["hello", "hi", /hey( there)?/i],
//       actions: [
//         {
//           type: "say text",
//           text: "Get fucked!"
//         },
//         {
//           type: "say text",
//           text: "How are you today?"
//         }
//       ]
//     },
//     {
//       listener: [/gif (.*)/],
//       actions: [
//         {
//           type: "say text",
//           text: "Result {1}"
//         },
//         {
//           type: "say text",
//           text: "Result {1}"
//         }
//       ]
//     },
//     {
//       listener: "buttons",
//       actions: [
//         {
//           type: "say object",
//           text: "What do you need help with?",
//           buttons: [
//             { type: "postback", title: "Settings", payload: "HELP_SETTINGS" },
//             { type: "postback", title: "FAQ", payload: "HELP_FAQ" },
//             { type: "postback", title: "Talk to a human", payload: "HELP_HUMAN" }
//           ]
//         }
//       ]
//     },
//     {
//       listener: "attachement",
//       actions: [
//         {
//           type: "say object",
//           attachment: "image",
//           url:
//             "https://www.tourisme.fr/images/otf_offices/1832/cathedrale-de-rouen1.jpg"
//         }
//       ]
//     },
//     {
//       listener: "colors",
//       actions: [
//         {
//           type: "say object",
//           text: "Favorite color?",
//           quickReplies: ["Red", "Blue", "Green"]
//         }
//       ]
//     },
//     {
//       listener: "list",
//       actions: [
//         {
//           type: "say object",
//           elements: [
//             {
//               title: "Artile 1",
//               image_url: "https://www.tourisme.fr/images/otf_offices/1832/cathedrale-de-rouen1.jpg",
//               default_action: {
//                   type: "action"
//               }
//             },
//             {
//               title: "Artile 2",
//               image_url: "https://www.tourisme.fr/images/otf_offices/1832/cathedrale-de-rouen1.jpg",
//               default_action: {}
//             }
//           ],
//           buttons: [
//             { type: "postback", title: "View More", payload: "VIEW_MORE" }
//           ]
//         }
//       ]
//     }
//   ]