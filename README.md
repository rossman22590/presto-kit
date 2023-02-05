# PrestoKit - Frontend

Over the last 4 months I've been taking part in regular hackathons at the School of Code. Each Friday I was paired up with a fellow boot-camper and tasked with creating an MVP. This was a great way to learn agile methodologies and practice the skills we learned each week.

We often had fun using Chat-GPT to help with our brainstorming, ideation and wireframing process. One of the cool things is that you could even ask it to generate things like suitable color scheme options for the MVP, which where often a suprisingly good fit. It was tedious to test the color schemes though, because I had to copy the hex codes into Figma each time to check them out.

That's what initially sparked the idea for PrestoKit: an AI-powered prototyping tool that allows users to instantly generate a unique UI kit for their project.

Since then I have been working on the project in my spare time and using it as a way to learn more about the tools I'm using.

### Frontend Stack:

- [`typescript`](https://www.typescriptlang.org/)
- [`next.js`](https://nextjs.org)
- [`tailwind-css`](https://tailwindcss.com)

### Current features:

- Users are promted to input a brand name and description using a multi-step form.
- The data is then sent to an express API I am building to handle requests to OpenAI.
- The API extracts an array of 3 starter kits from the AI completion to send to the frontend.
- The frontend app then renders the starter kits, which for now includes just color schemes and fonts.

### What I'm working on next:

- Impoving the reliability of the backend API and implimenting fall back options if something goes wrong.
- Adjusting the promts to improve the quality of AI completions.
- Working on new features, such as user log in and the ability to save, edit and download UI kits.
- High fidelity wireframes to give the app a more unique look and feel.

