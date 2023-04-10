# PrestoKit - Frontend

Over the last 4 months, I have been participating in regular hackathons at the School of Code. Each Friday, I was paired with a fellow boot-camper and tasked with creating an MVP. This was an excellent way to learn agile methodologies and practice the skills we learned each week.

We often had fun using ChatGPT to help with our brainstorming, ideation, and wireframing process. One of the cool things is that you could even ask it to generate things like suitable color scheme options for the MVP, which were often a surprisingly good fit. It was tedious to test the color schemes, though, because I had to copy the hex codes into Figma each time to check them out.

That's what initially sparked the idea for PrestoKit: an AI-powered prototyping tool that allows users to instantly generate a unique UI kit for their project.

Since then, I have been working on the project in my spare time and using it as a way to learn more about the tools I'm using.

### Frontend Stack:

- [`typescript`](https://www.typescriptlang.org/)
- [`next.js`](https://nextjs.org)
- [`tailwind-css`](https://tailwindcss.com)

### Current features:

- The frontend provides a simple way to receive visual feedback as I develop the backend API.
- Users are prompted to input a brand name and description using a multi-step form.
- The data is then sent to the express API which handles sequential requests to OpenAI.
- The API extracts and validates a UI kit object from the AI completion to send back to the frontend.
- The front end includes previously fetched kits in further sequential requests, which the API uses to maintian 'chat' history.
- Once the kit count has been completed, the frontend renders the starter kits, which for now includes just color schemes and fonts.

### What I'm working on now:

- [x] Improved the reliability of the backend API and implemented fallback kit data if something goes wrong.
- [x] Refactored the API to use the `gpt-3.5-turbo` model rather than the `text-davinci-003` model, which has:
  - [x] Helped improve the quality, suitability and uniqueness of each starter kit
  - [x] Allowed previous kit data to be stored in messages 'chat' history.
  - [x] Decreased the cost of OpenAI API calls.
- [x] High-fidelity wireframes for v2 of the frontend. 
- [ ] Adding the latest features from the v2 design to the frontend, including user login and the ability to save, edit and download UI kits.
- [ ] Setting up a postgreSQL database to accomodate the v2 features

