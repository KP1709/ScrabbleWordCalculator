# Scrabble Word Calculator
[![Netlify Status](https://api.netlify.com/api/v1/badges/88b1162f-6ee5-437e-a3bc-a3ba498c33ae/deploy-status)](https://app.netlify.com/sites/kareenapatel-scrabblewordcalculator/deploys)

## ⌨️ Tech stack
React / Typescript / CSS / pnpm / APIs / Cypress (Testing) / Husky (Git Hooks)

## 🍼 Introduction
Playing the original version of Scrabble, it can sometimes be difficult to calculate a word's score. Therefore, I created my own version of a Scrabble calculator. A word is checked to see if it's valid and displays its score. Bonuses and multipliers can be added to calculate the correct score. 

## 🛠️ Features
- Check to see if user input is valid
  - Checks to see if a word contains only alphabetic characters
  - Checks to see if a word is less than 15 letters
  - Checks to see if a word is in the dictionary (using Wiktionary)
  - Checks to see if a word can be created based on the number of tiles available
- Score for whole word is calculated
- Tried to maintain accessibility throughout the application
- Instructions available on the start screen as an openable and closable modal
- Can indicate which tiles have a double score or triple score and update the total word score 
- Can indicate which tiles are blank, update the total word score and limit the number
- Can apply the 50-point bonus for words with seven-letter tiles or longer
- Can indicate if the total word score doubles, triples or both
- Can reset multipliers and bonuses added to letters and/or whole word
- Error handling if either the API or database is down
- Instructions accessible at any point 
- Configure if word goes through dictionary check
- Change the application's appearance
- Store valid words in search history
  - Configure if search history is on or off and clear history if on
  - Only store if dictionary check is on

## ⚡ Supabase --> Wiktionary
Originally, a Supabase database was connected and was used with Netlify serverless functions. This stored words which weren't in the free dictionary api. The database has been removed and replaced with Wiktionary (web scraping) for easier management.

## 🧪 Experiment
### Testing valid words but with restrictions
- 'knickknacks' - there are too many 'k's in the word, so it cannot be used in the game. This will display the 'Max Tile Limit Exceeded' screen. 
- 'counterbalancing' - there are more than 15 letters. This will display 'Invalid Entry' with a message about exceeding the tile limit.

## 🕹️ Testing
Component tests and end-to-end tests have been created using Cypress. Before committing new code, the end-to-end tests will run. Husky is used so the pre-commit check is accessible to everyone.
Cypress tests also run as part of GitHub Actions. Dependabot pull requests will be checked.   
(This will save me from committing code and breaking functionality which I thought was working 😅) 

## 🔬 Analytics
This web tool uses Simple Analytics.
Find out more - https://docs.simpleanalytics.com/introduction-to-legal 

## 📚 Resources
- Understanding how to push and retain objects in an array - https://stackoverflow.com/questions/70941970/pushing-objects-in-an-array-only-returns-last-object-pushed-in-react
- Using regex to test for alphabetic characters - https://stackoverflow.com/questions/6067592/regular-expression-to-match-only-alphabetic-characters
- Learn React Portal in 12 minutes by building a modal - https://www.youtube.com/watch?v=LyLa7dU5tp8
- Simple Analytics tool - https://www.simpleanalytics.com/
- Adding multiple themes in React (Noor Ul Usba) - https://javascript.plainenglish.io/easy-way-to-add-multiple-themes-in-react-app-ff45eeca67cb?gi=c7ddcebd3327

## 🗄️ Archive
### 📚 Netlify Function Resources
- Intro to Netlify Serverless functions - https://www.netlify.com/blog/intro-to-serverless-functions/
- Serverless function integration in React - https://www.freecodecamp.org/news/how-to-access-secret-api-keys-using-netlify-functions-in-a-react-app/
- Netlify and Supabase integration - https://www.netlify.com/integrations/supabase/
- Hiding API keys using Netlify - https://www.youtube.com/watch?v=m2Dr4L_Ab14
- Hiding API keys in Vite - https://devzibah.hashnode.dev/using-a-dotenv-file-to-store-and-use-api-keys-in-a-vite-built-react-app

### 🔧 APIs
- Dictionary API used - https://dictionaryapi.dev/
