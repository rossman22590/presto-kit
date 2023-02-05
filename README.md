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

- Users are prompted to input a brand name and description using a multi-step form.
- The data is then sent to an express API I am building to handle requests to OpenAI.
- The API extracts an array of 3 starter kits from the AI completion to send to the frontend.
- The frontend app then renders the starter kits, which for now includes just color schemes and fonts.

### What I'm working on next:

- Improving the reliability of the backend API and implementing fallback options if something goes wrong.
- Adjusting the prompts to improve the quality of AI completions.
- Working on new features, such as user login and the ability to save, edit, and download UI kits.
- High-fidelity wireframes to give the app a more unique look and feel.

