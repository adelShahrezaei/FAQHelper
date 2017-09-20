## Inspiration
We wanted to make a smarter and more convenient way to gather useful information from FAQ pages. We also wanted to learn more about “chat boxes” and voice response with Alexa.
## What it does
Provides users information from VCU FAQs website through Alexa UI.
## How I built it
We use Amazon Alexa as conversational UI. We used IBM Watson keywords extraction API to extract keywords from FAQ pages and user question. We also implemented a keyword matching algorithm and RESTfull API using Node.js. Our data and server code are deployed to Gooogle App engine. 

## Challenges I ran into
Alexa Skills, integrating Alexa with IBM Watson API, the right questions to ask Alexa and how to generalize them, getting AWS figured out, and using a valid Amazon account for AWS.

## Accomplishments that I'm proud of
We were capable of doing it in one night!
Our keyword matching algorithm that works uses Watson keywords extraction API.

## What I learned
Resource allocation in teamwork, Alexa Skills, IBM Watson, and how very much a conditional statement is helpful in designing bots.
## What's next for FAQHelper
Expanding outward to other FAQs, and perhaps tools for making FAQs easier to pull with chatbots like Alexa.
