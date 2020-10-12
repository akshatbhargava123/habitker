# Habit Tracker

Building new Habits: The way it always should have been.

Remember the app was built keeping mobile-first in mind and not yet ready for desktop sizes so please open with mobile mode ON (Mac: Cmd + Shift + M)

> This app was build as an interview task for [animall.in] but I plan to develop it further when I've some more bandwidth in the future.

Live URL: 🙏 Open with mobile mode if on desktop 🙏 [https://habitker.web.app/]

## Brainstorming arena:

Thoughts:
It's a habit tracker app so we probably need a way to add habits, track them out easily, edit them if required and also motivate the user to follow.

### Adding / Editing a habit:

There are multiple parameters that can be taken into account while adding a habit as follows:

- Title / Label for the habit

- Is it to be followed Daily / Weekly?

- Is it time bounded or NOT:
	- If yes, take in a time range (Ex: 10:00 AM - 10:15 AM)
	- If no, then how many repititions of it per day/week?
		

### Track them out:

- We need to show daily data of what's left for today so a quick view of all habits with options to step them (move on to next rep until not complete) with single click.

- Personal integrity check chart can be made for user of how much are they following what they planned by having weekly / monthly bar charts and also line charts for growth rate.

### Motivation for the user:

- Create a default habit to open the app everyday and mark this habit as completed (also increases user engagement).

- Give rewards to users for doing timely completed checks on their habits. What reward can we give? Probably not money but social status via friend's leaderboard and shareable karma-charts.

- Giving notification reminders (ask users for the same while adding a habit) 10 min / 30 min before a habit start with motivating quotes.


## Current Progress:

- Easy login via Google account
- Onboarding homepage with CTA to start a new habit
- Homepage with all-in-one view for habits and quick step-next button on each of them which resets everyday

## Technology:

I followed a mobile-first approach to build this which also came to me as a bit challenging yet learning experience.
Architected the whole application from scratch and at every point I tried to keep the codebase quality consistent and understandable but also took care of no-premature optimisations.

- NextJS (Framework on top of ReactJS)
- TailwindCSS (Atomic CSS)
- Cloud Firestore and Firebase Auth


## Running the application

- Create a Firebase instance of the application on your console and enable Google auth and Cloud Firestore

- Clone the repo and install the dependencies `npm install` or `yarn`

- Add `.env.local` file with `NEXT_PUBLIC_FIREBASE_CONFIG` variable being set to stringified version of your firebase web config.

- Run the dev server: `npm run dev` or `yarn run dev`

- Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
