## 💡Inspiration
Growing up as a passionate gamer and now working as a developer, I’ve always been drawn to the intersection of gaming and tech. This project, *CodeClash*, combines my love for both by creating an interactive multiplayer trivia game designed to help players learn technical concepts through trivia and test their skills in a fun, competitive setting. Inspired by the classic *You Don’t Know Jack* series—a perfect mix of humor and trivia that was as informative as it was entertaining—*CodeClash* uses the educational power of gaming to make learning engaging and enjoyable.

With *CodeClash*,  We aim to showcase how technologies like Redpanda and AI can be harnessed to deliver personalized and engaging content. The game generates trivia questions dynamically based on each player’s chosen technical interests, creating a unique experience for each user while demonstrating the potential for AI-driven content in educational game design.

To ensure question accuracy, I’ve utilized the Groq API, which provides up-to-date technical information. Leveraging Retrieval-Augmented Generation (RAG), *CodeClash* enriches AI-generated content with real-time metadata, addressing the common challenge of misinformation in AI-generated trivia.

From a business perspective, *CodeClash* also scales seamlessly across regions, bypassing costly translation requirements and opening access to a broader, international audience. Personally, I’ve enjoyed experimenting with the game’s customizable quiz master modules—switching from the default host to a dad-joke-loving persona, reminiscent of the humor in *You Don’t Know Jack*. This flexibility not only adds to the user experience but also underscores the adaptability and reach of this project.

## ⚙️ What it does
![Screenshot from 2024-10-29 00-45-42](https://github.com/user-attachments/assets/117e52d2-b49f-485d-9e3c-ce6c9bb71822)
- CodeClash is a programming trivia game where developers test and showcase their programming skills in real time. CodeClash is a dynamic multiplayer match fighting format where programmers compete against each other, with knowledge, speed, and accuracy being key factors in winning.
- CodeClash uses generative AI powered by the groq api to generate challenging and original programming questions, keeping the competition interesting and original. The game has a variety of questions for players, and it says that success is achieved through real coding skills, not just memorizing code. Its intelligent question generation system caters to varying levels of difficulty making it a valuable resource for both novice programmers and experienced developers.
- CodeClash also provide the flawless experience thanks to *Redpanda Connect's robust infrastructure*. Coding challenges in real time allows players to watch their opponents play and build their skills, adding an extra element of excitement to each game. Leaderboard is live and players can stay on top of the latest results as answers are submitted, making it a thrilling and interactive experience.
- CodeClash is dedicated to programming specific content, covering a wide range of software development topics. CodeClash is a test of programming concepts, which includes solving algorithmic and data structure problems. Its special focus makes it very valuable not only in competition but also for the acquisition of skills and knowledge.

" CodeClash not just a quiz app, its a dynamic space where programmers can showcase their abilities and  gain valuable insights from others "

## 🛠️ How we built it
![Screenshot from 2024-10-28 21-41-58](https://github.com/user-attachments/assets/e96ebc57-98df-4514-a617-bef4a71b3fce)

Backend Codebase : https://github.com/rohitranjan-2702/codeclash-game-backend

- CodeClash is built on a modern, scalable architecture that combines the power of NodeJS and Next.js to deliver a seamless, real-time competitive programming experience.
- At the frontend, we leveraged Next.js 14's advanced features to create a lightning-fast, responsive interface. The app utilizes Next.js's App Router for efficient client-side navigation and Server Components for optimal performance. This ensures that players experience minimal latency during competitive matches, while the progressive enhancement keeps the app responsive even under varying network conditions.
- The backend infrastructure is powered by Node.js, where we implemented native WebSockets for real-time bidirectional communication. This lightweight approach enables us to maintain persistent connections between the server and clients, facilitating instant updates for match states, player actions, and score changes. The WebSocket implementation provides the low-latency communication essential for a competitive programming environment while being more resource-efficient than traditional HTTP polling.
- For database management, we chose Prisma as our ORM, taking advantage of its type-safe database client and intuitive data modeling capabilities. Prisma's schema-first approach allowed us to define our data models clearly and generate type-safe queries, significantly reducing the possibility of runtime errors. The integration with TypeScript provides excellent developer experience and robust type checking throughout the application.
- Real-time functionality is a crucial aspect of CodeClash, which we achieved through Redpanda Connect. This powerful message streaming platform enables us to handle thousands of concurrent game sessions while maintaining consistent low latency. It manages the real-time leaderboard updates, player status changes, and match synchronization with remarkable efficiency.
- For the AI-powered question generation system, we integrated the Groq API, implementing an intelligent caching layer to optimize API usage while ensuring question freshness. The system analyzes difficulty levels, previous questions, and player performance to generate appropriate challenges that maintain competitive balance.
- The application's state management is handled through a combination of React's Context API and Server Components, ensuring efficient data flow and minimal client-side JavaScript. We implemented optimistic updates to provide instant feedback while maintaining data consistency across all connected clients.
- To handle the competitive aspects, we developed a sophisticated scoring system that runs on the Node.js backend. This system processes answers in real-time, calculates scores based on accuracy and speed, and updates player rankings instantaneously. The Prisma ORM ensures these updates are performed efficiently and consistently across the database.
Our WebSocket server handles match coordination, broadcasting game events to relevant clients, and managing the lifecycle of each competitive session. We implemented heartbeat mechanisms and automatic reconnection strategies to ensure a smooth experience even when network conditions are less than ideal.


## 🧑‍💻 Installation Guide 

Step 1 : Checkout and switch to project root:
```bash
git clone https://github.com/ConnectBhawna/CodeClash-ui
cd CodeClash-ui
```

Step 2 : After than install the dependencies
```bash
npm install
```


Step 3 : Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

Note : For connection make sure to make .env.local file to add env variables.


## 🧑‍💻 Flow of the Project
As our project have two seperate repo's so you might face issues while installing . So we added the flow here as well.

1. First we login using Google Account than it will show the below Landing Page
   ![Landing_page](https://github.com/user-attachments/assets/2a58babd-232c-4c92-8ef8-615b9f71dced)

2. This will onboard to our About page that contains the instruction and other important details about the project
   ![about](https://github.com/user-attachments/assets/e6bf2065-ebd2-4713-a9f6-4c62bbedd66b)

3. After the about page we need to select either we want to join the game or create the game
   ![Create_or_join](https://github.com/user-attachments/assets/f2dc6e39-fa32-4b48-b567-74e7f8eb2a6e)

4. If we are looking to create the game based on our choose we can do that , on the basis on our choice Quiz will be created by the AI
   ![If_creating_game](https://github.com/user-attachments/assets/bad5ba79-0f94-43b1-9152-54790a332123)

5. If we are looking to JOIN the game, You will see the below screen
   ![if_joining_game](https://github.com/user-attachments/assets/653d8ad4-8215-47c7-85dd-0e35130e6955)

6. Either you joined and created the game, you will wait for others to play with you. At that time the below screen you will be able to see.
   ![waiting_screen](https://github.com/user-attachments/assets/a2276c63-913f-4d89-ab94-119e593fea50)

7. Once some folks join the game will start and based on how fast you answer the system will give you marks. Also here all the things are realtime including chat and leaderboard . So marks will be updated in realtime and how cool is that you can chat with your friends in realtime.
   ![quiz_with_dashboard](https://github.com/user-attachments/assets/85b13a99-3a3f-4e36-a54c-ad2b62105d45)

8. Once the game is over you will onboard to the Leaderboard screen where you can see the Winners based on the Score. Below is the screen shown
   ![final_dashboard](https://github.com/user-attachments/assets/a8d4e3b3-b5e3-45d0-ba71-556dcb0abd95)






