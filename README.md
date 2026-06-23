# Scrabble Word Calculator
[![Netlify Status](https://api.netlify.com/api/v1/badges/88b1162f-6ee5-437e-a3bc-a3ba498c33ae/deploy-status)](https://app.netlify.com/sites/kareenapatel-scrabblewordcalculator/deploys) ![Supabase Status](https://img.shields.io/badge/Supabase-paused-bfbfbf)

## ⌨️ Tech stack
React / Typescript / CSS / pnpm / APIs + Supabase / Netlify CLI + Serverless functions / Cypress (Testing) / Husky (Git Hooks)

## 🍼 Introduction
Owning and playing the original version of Scrabble, I know it would sometimes be difficult to calculate a word's score. Therefore, I created my own version of a Scrabble calculator. When a word is entered, it checks to see if the word is valid and displays the word's score. Bonuses and multiplies can be added to calculate the correct score.

## ⚙️ Changes
The commit 81ea887 was code clean-up for the entire project.  
While the functionality is technically the same, the code is now more maintainable with improved readability.  

## 🛠️ Features
- Check to see if user input is valid
  - Checks to see if word contains alphabetic characters only
  - Checks to see if a word is less than 15 letters
  - Checks to see if word is in the dictionary (using free API)
  - Checks to see if word is in Wiktionary (if not in the API) 
  - Check to see if word can be created based on number of tiles available
- Score for whole word is calculated
- Tried to maintain accessibility throughout application
- Instructions available on the start screen as an open and closable modal
- Can indicate which tiles have a double score or triple score and update the total word score 
- Can indicate which tiles are blank, update the total word score and limit the number
- Can apply the 50 point bonus for words with seven letter tiles or longer
- Can indicate if the total word score doubles, triples or both
- Can reset multipliers and bonuses added to letters and/or whole word
- Error handling if either the API or database is down
- Instructions accessible at any point 
- Configure if word goes through dictionary check and extended check
- Change the application's appearance
- Store search history for valid words
  - Configure if search history is on or off and clear history if on

## ⚡ Supabase --> Wiktionary
Originally a Supabase database was connected and was used with Netlify serverless functions. This has been removed and has been replaced by using Wiktionary and web scrapping so it's easier to manage. However this will only be used if the word didn't exist in the free dictionary API.

## 🧪 Experiment
### Testing valid words but with restrictions
The word 'knickknacks' exists in the dictionary but there are too many 'k' in the word so it cannot be used in the game. This will display the 'Max Tile Limit Exceeded' screen. 

The word 'counterbalancing' exists in the dictionary but the word is more that 15 letters. This will display 'Invalid Entry' with a message about exceeding.

## 🕹️ Testing
Component tests and end-to-end tests have been created using Cypress. Before commiting new code, the end-to-end tests will run and as long as all the tests pass, the commit will be created. Husky has been used so this pre-commit check is accessible.  
This will run on every commit so if updating the README, for example, it can be bypassed by adding the flag '--no-verify' to the commit command.  
(This will save me from committing code and breaking functionality which I thought was working 😅) 

## 🔬 Analytics
This web tool uses Simple Analytics. The tool doesn't use cookies so there is no privacy banner displayed.  
Find out more - https://docs.simpleanalytics.com/introduction-to-legal 

## 📚 Resources
- Understanding how to push and retain objects in an array - https://stackoverflow.com/questions/70941970/pushing-objects-in-an-array-only-returns-last-object-pushed-in-react
- Using regex to test for alphabetic characters - https://stackoverflow.com/questions/6067592/regular-expression-to-match-only-alphabetic-characters
- Dictionary API used - https://dictionaryapi.dev/
- Learn React Portal in 12 minutes by building a modal - https://www.youtube.com/watch?v=LyLa7dU5tp8
- Simple Analytics tool - https://www.simpleanalytics.com/
- Adding multiple themes in React (Noor Ul Usba) - https://javascript.plainenglish.io/easy-way-to-add-multiple-themes-in-react-app-ff45eeca67cb?gi=c7ddcebd3327

## 🗄️ Archive
### 📚 Netlify Function Resources
- Intro into Netlify Serverless functions - https://www.netlify.com/blog/intro-to-serverless-functions/
- Serverless function integration in React - https://www.freecodecamp.org/news/how-to-access-secret-api-keys-using-netlify-functions-in-a-react-app/
- Netlify and Supabase integration - https://www.netlify.com/integrations/supabase/
- Hiding API keys using Netlify - https://www.youtube.com/watch?v=m2Dr4L_Ab14
- Hiding API keys in Vite - https://devzibah.hashnode.dev/using-a-dotenv-file-to-store-and-use-api-keys-in-a-vite-built-react-app