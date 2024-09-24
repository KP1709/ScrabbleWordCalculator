# Scrabble Word Calculator
[![Netlify Status](https://api.netlify.com/api/v1/badges/88b1162f-6ee5-437e-a3bc-a3ba498c33ae/deploy-status)](https://app.netlify.com/sites/kareenapatel-scrabblewordcalculator/deploys)

## ⌨️ Tech stack
React / Typescript / CSS / npm / Nodejs / HTML / APIs / Cypress (Testing)

## 🍼 Introduction
Owning and playing the original version of Scrabble, I know it would sometimes be difficult to calculate a word's score. Therefore, I created my own version of a Scrabble calculator. The user enters a word and is able to see the word's score. Additionally the tool checks to see if the word is in the dictionary using a free dictionary API. Therefore enabling the user to test to see if a particular word exists.

## 🛠️ Features
- Check to see if user input is valid
  - Checks to see if word contains alphabetic characters only
  - Checks to see if word is in the dictionary (using free API)
- Score for whole word is calculated
- Tried to maintain accessibility throughout application
- Unit tests for application in 'testing' branch
- Instructions available on the start screen as an open and closable modal
- Can indicate which tiles have a double score or triple score and update the total word score 
- Can indicate if the total word score doubles or triples
  -  Option to reset score without multiplier

## 📚 Resources
- Understanding how to push and retain objects in an array - https://stackoverflow.com/questions/70941970/pushing-objects-in-an-array-only-returns-last-object-pushed-in-react
- Using regex to test for alphabetic characters - https://stackoverflow.com/questions/6067592/regular-expression-to-match-only-alphabetic-characters
- Dictionary API used - https://dictionaryapi.dev/
- Learn React Portal in 12 minutes by building a modal - https://www.youtube.com/watch?v=LyLa7dU5tp8


## 🤖 AI Assistance
To implement the double/triple tile score and the double/triple total word score feature, I asked V0 by Vercel to create code which implemented the logic I was after. The code was specified to be written in React but the AI chose to use Typescript. I integrated the code into the original code I wrote. 

### Prompts asked in order:
- "Create a button in react which toggles between doubling and halving the number"
- "Do this but enable the button to cycle through the original value, doubling and tripling"
- "Do this for multiple buttons"
- "Do this but add together the total value from the buttons"
- "Do this but includes buttons which can multiply the total by 2 and by 3"

(Outcome and results will vary)

## ➕ Features to add 
- Check to see if the word has the correct number of letters (e.g. Can't allow words with two K's (e.g 'kick') )
