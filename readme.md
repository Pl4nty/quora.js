# quora.js

## About
quora.js is a Node.js module providing access to an unofficial API for https://quora.com.

## Installation
*Node.js 8.0.0 or newer is required.

## Example usage
```const quora = require('discord.js');
const endpoint = "https://www.quora.com"

quora.user.stats(endpoint + 'profile/Adam-DAngelo').then(stats => {
   console.log(stats);
   /*
    Returns:
    { profilePicture: 'https://qph.ec.quoracdn.net/...yqigr.jpeg',
      name: 'Adam D'Angelo',
      defaultCredential: 'Quora CEO',
      biography: null,
      answers: '975',
      questions: '1033',
      posts: '62',
      blogs: '16',
      followers: '368,821',TODO remove commas from all stats
      following: '631',
      topics: '378',
      edits: '19,128',
      job: 'CEO at Quora',
      school: 'California Institute of Technology',
      home: 'Mountain View, CA',
      totalViews: '28m',
      monthlyViews: '258.9k',TODO convert views to int
      topWriter: [ "2013", "2014", "2015", "2016", "2017", "2018" ],
      sessionHost: [ "Dec 2015", "Feb 2017" ],
      published: [ "Forbes" ]
      knowledgePrize: { "Feb 21 2016": [URL as string](https://www.quora.com/Will-Uber-dominate-the-home-food-delivery-market-%E2%80%94-restaurants-groceries-etc-Is-there-space-left-for-independent-companies-What-is-the-success-rate-of-UberEats/answer/Adam-DAngelo)
     }}
    */
})
```

## Help
If you don't understand something in the documentation, are experiencing problems, or just need a bit of help, join our official [Quora.js Discord Server](discord.gg/quora.js).