# JS Code Quiz

## Description

Build a timed coding quiz with multiple-choice questions. This app will run in the browser and will feature dynamically updated HTML and CSS powered by JavaScript code. It will have a clean, polished, and responsive user interface.

I started with pseudocode: [jsCodeGame-Pseudocode.txt](./assets/misc/jsCodeGame-Pseudocode.txt)

I had a hard time with getting the JSON that I used to store the questions in to work properly. I couldn't get it to import the file without adding extra overhead. But the object I stored wouldn't escape '\n' and '\"' charcters correctly so I substitued those characters with placeholders and then swapped them back out when I was displaying the lines in HTML.

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Usage](#usage)
- [Credits](#credits)

## User Story

AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers

## Acceptance Criteria

Here are the critical requirements necessary to develop a portfolio that satisfies a typical hiring manager’s needs:

```
GIVEN I am taking a code quiz

WHEN I click the start button
THEN a timer starts and I am presented with a question

WHEN I answer a question
THEN I am presented with another question

WHEN I answer a question incorrectly
THEN time is subtracted from the clock

WHEN all questions are answered or the timer reaches 0
THEN the game is over

WHEN the game is over
THEN I can save my initials and my score
```

## Usage

Completed site: [https://chip-l.github.io/jsCodeQuiz/]

[Working Page](/assets/images/passwordGeneratorCompleted.jpg)

![Working Page](./assets/images/screenshot.png)

## Credits

Study Group:

- Lauren Gabaldon
- Josh Lee
- Jared Sutch
- Lacey Pape
- Alex Jurgs
- Tarik Maggio

Questions: I'll be honest, I stole these questions directly from W3Schools (https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS)

Makan. (2020, May 9). Glowing Flames Text Animation. CodeMyUI. https://codemyui.com/glowing-flames-text-animation/.
