# Scrabble Word Calculator
[![Netlify Status](https://api.netlify.com/api/v1/badges/88b1162f-6ee5-437e-a3bc-a3ba498c33ae/deploy-status)](https://app.netlify.com/sites/kareenapatel-scrabblewordcalculator/deploys) ![Supabase Status](https://img.shields.io/badge/Supabase-paused-bfbfbf)

## ⌨️ Tech stack
React / Typescript / CSS / npm / Nodejs / HTML / APIs + Supabase / Netlify CLI + Serverless functions / Cypress (Testing)

## 🍼 Introduction
Owning and playing the original version of Scrabble, I know it would sometimes be difficult to calculate a word's score. Therefore, I created my own version of a Scrabble calculator. The user enters a word and sees the word's score. Additionally the tool checks to see if the word is in the dictionary using a free dictionary API. Therefore enabling the user to test to see if a particular word exists. The app is also connected to a database to search for words which are valid in Scrabble but are not in the dictionary API.

## ⚙️ Changes
The commit 81ea887 was code clean-up for the entire project.  
While the functionality is technically the same, the code is now more maintainable with improved readability.  

## 🛠️ Features
- Check to see if user input is valid
  - Checks to see if word contains alphabetic characters only
  - Checks to see if a word is less than 15 letters
  - Checks to see if word is in the dictionary (using free API)
  - Checks to see if word is in the Supabase database (if not in the API) 
  - Check to see if word can be created based on number of tiles available
- Score for whole word is calculated
- Tried to maintain accessibility throughout application
- Instructions available on the start screen as an open and closable modal
- Can indicate which tiles have a double score or triple score and update the total word score 
- Can indicate which tiles are blank, update the total word score and limit the number
- Can apply the 50 point bonus for words with seven letter tiles or longer
- Can indicate if the total word score doubles, triples or both
- Error handling if either the API or database is down
- Instructions accessible at any point 
- Configure if word goes through dictionary check and extended check
- Change the application's appearance

## ⚡Supabase
A Supabase database is connected by creating a Netlify serverless function. The word entered to search will pass by POST request to the Supabase client which will complete a GET request to check if the word exists in the database. The code has been set up so the database will only be searched if the word doesn't exist in the free dictionary API. The serverless function also contains error handling to provide a solid user experience. It's very unlikely for the database to be searched often.

## 🧪 Experiment
### Database
For Supabase, requests can be seen in action from the network response tab and developer console in the browser dev tools.  
Search for the word 'zarf' or 'bezique' - the first API will return a 404 but the word exists in the Supabase database so it will return a 200.

If database is paused or is throwing a non-404 error, then it will catch the error and suggest that the word should be search online instead.

### Testing valid words but with restrictions
The word 'knickknacks' exists in the dictionary but there are too many 'k' in the word so it cannot be used in the game. This will display the 'Max Tile Limit Exceeded' screen. 

The word 'counterbalancing' exists in the dictionary but the word is more that 15 letters. This will display 'Invalid Entry' with a message about exceeding.

## 🔬 Analytics
This web tool uses Simple Analytics. The tool doesn't use cookies so there is no privacy banner displayed.  
Find out more - https://docs.simpleanalytics.com/introduction-to-legal 

## 📚 Resources
- Understanding how to push and retain objects in an array - https://stackoverflow.com/questions/70941970/pushing-objects-in-an-array-only-returns-last-object-pushed-in-react
- Using regex to test for alphabetic characters - https://stackoverflow.com/questions/6067592/regular-expression-to-match-only-alphabetic-characters
- Dictionary API used - https://dictionaryapi.dev/
- Learn React Portal in 12 minutes by building a modal - https://www.youtube.com/watch?v=LyLa7dU5tp8
- Intro into Netlify Serverless functions - https://www.netlify.com/blog/intro-to-serverless-functions/
 - Serverless function integration in React - https://www.freecodecamp.org/news/how-to-access-secret-api-keys-using-netlify-functions-in-a-react-app/
 - Netlify and Supabase integration - https://www.netlify.com/integrations/supabase/
 - Hiding API keys using Netlify - https://www.youtube.com/watch?v=m2Dr4L_Ab14
 - Hiding API keys in Vite - https://devzibah.hashnode.dev/using-a-dotenv-file-to-store-and-use-api-keys-in-a-vite-built-react-app
 - Simple Analytics tool - https://www.simpleanalytics.com/

## 🤖 AI Assistance
To implement the double/triple tile score and the double/triple total word score feature, I asked V0 by Vercel to create code which implemented the logic I was after. The code was specified to be written in React but the AI chose to use Typescript. I integrated the code into the original code I wrote. 

### Prompts asked in order:
- "Create a button in react which toggles between doubling and halving the number"
- "Do this but enable the button to cycle through the original value, doubling and tripling"
- "Do this for multiple buttons"
- "Do this but add together the total value from the buttons"
- "Do this but includes buttons which can multiply the total by 2 and by 3"

(Outcome and results will vary)
