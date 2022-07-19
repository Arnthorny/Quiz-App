"use strict";
const questions = [
  {
    question: "Which of the following gases is the most abundant on the Sun?",
    incorrect_answers: ["Oxygen", "Helium", "Nitrogen"],
    correct_answer: "Hydrogen",
    difficulty: "medium",
  },
  {
    question: "How long do the rays from the Sun take to reach Earth?",
    incorrect_answers: ["About 7 minutes", "Abut 6 minutes", "About 9 minutes"],
    correct_answer: "About 8 minutes",
    difficulty: "easy",
  },
  {
    question: "What does the english word &quot;TROPIC&quot; mean? ",
    incorrect_answers: ["Hot place", "Inclination", "Axis"],
    correct_answer: "Turning place",
    difficulty: "medium",
  },
  {
    question: "What is the second hottest planet in our solar system?",
    incorrect_answers: ["Venus", "Earth", "Jupiter"],
    correct_answer: "Mercury",
    difficulty: "easy",
  },
  {
    question: "The largest ocean on Earth is the?",
    incorrect_answers: ["Atlantic", "Arctic", "Indian"],
    correct_answer: "Pacific",
    difficulty: "medium",
  },
  {
    question:
      "Which of these is not considered as one of the seven natural wonders of the world?",
    incorrect_answers: [
      "Mount Everest",
      "The Northern Lights",
      "The Grand Canyon",
    ],
    correct_answer: "The Hanging Gardens ",
    difficulty: "medium",
  },
  {
    question: "Australia is often reffered to as the land of?",
    incorrect_answers: ["Deers", "Monkeys", "Eagles"],
    correct_answer: "Kangaroos",
    difficulty: "medium",
  },
  {
    question: "The Panama Canal connects which two oceans?",
    incorrect_answers: [
      "Pacific and Arctic ocean",
      "Indian and Atlantic ocean",
      "Arctic and Indian ocean",
    ],
    correct_answer: "Pacific and Atlantic ocean",
    difficulty: "hard",
  },
  {
    question:
      "Which of these countries was formerly known as &quot;CEYLON&quot; ",
    incorrect_answers: ["Myanmmar", "Algeria", "Maldives"],
    correct_answer: "Sri Lanka",
    difficulty: "hard",
  },
  {
    question:
      "A blind-folded woman holding a balanced scale is universally used to represent what?",
    incorrect_answers: ["Peace", "Equity", "Unity"],
    correct_answer: "Justice",
    difficulty: "easy",
  },
  {
    question: "What is the fastest animal known to mankind?",
    incorrect_answers: ["Cheetah", "Sailfish", "Pronghorn"],
    correct_answer: "Peregrine falcon",
    difficulty: "medium",
  },
  {
    question: "Who wrote the Mah&amacr;bh&amacr;rata",
    incorrect_answers: ["Pandu", "Homer", "Parikshit"],
    correct_answer: "Vy&amacr;sa",
    difficulty: "hard",
  },
  {
    question: "What is the capital of Finland",
    incorrect_answers: ["Bogota", "Oslo", "Denver"],
    correct_answer: "Helsinki",
    difficulty: "medium",
  },
  {
    question: "The Bhils are a primitive race found in which of these country?",
    incorrect_answers: ["Congo", "China", "Pakistan"],
    correct_answer: "India",
    difficulty: "Hard",
  },
  {
    question: "What is a Gypsum?",
    incorrect_answers: ["A Mystic", "A Romanian", "An Element"],
    correct_answer: "A Mineral",
    difficulty: "medium",
  },
  {
    question:
      "Which Nigerian city is known as the &quot;Coal City State&quot;?",
    incorrect_answers: ["Ondo", "Imo", "Ebonyi"],
    correct_answer: "Enugu",
    difficulty: "medium",
  },
  {
    question: "Robert Oppenheimer is regarded as the father of?",
    incorrect_answers: ["Astrology", "Nuclear bomb", "Hydrogen Bomb"],
    correct_answer: "Atomic Bomb",
    difficulty: "medium",
  },
  {
    question:
      "What is the codename of the atomic bomb detonated over Nagasaki?",
    incorrect_answers: ["Little Boy", "Mother of all Bombs", "Fat Boy"],
    correct_answer: "Fat Man",
    difficulty: "hard",
  },
  {
    question:
      "In what year did the 9/11 attacks on the World Trade Centers occur?",
    incorrect_answers: ["2009", "2011", "1999"],
    correct_answer: "2001",
    difficulty: "medium",
  },
  {
    question:
      "What color is formed by mixing red, green and blue in equal proportions?",
    incorrect_answers: ["Purple", "Yellow", "Chartreuse"],
    correct_answer: "White",
    difficulty: "easy",
  },
  {
    question: "Beriberi is a disease caused by what vitamin deficiency?",
    incorrect_answers: ["Cobalamin", "Vitamin B5", "Calciferol"],
    correct_answer: "Thiamine",
    difficulty: "medium",
  },
  {
    question: "Xerophthalmia affects what part of the body?",
    incorrect_answers: ["Spleen", "Ear", "Liver"],
    correct_answer: "Eye",
    difficulty: "hard",
  },
  {
    question: "Malaria is caused by what type of micro-organism?",
    incorrect_answers: ["Virus", "Bacteria", "Fungi"],
    correct_answer: "Protozoa",
    difficulty: "medium",
  },
  {
    question: "What is the brightest star known to man?",
    incorrect_answers: ["Alpha Centauri", "Rigel", "The Sun"],
    correct_answer: "Sirius",
    difficulty: "medium",
  },
  {
    question: "Who was the first African to climb Mount Everest",
    incorrect_answers: ["Joshua Awesome", "Edmond Hillary", "Saray Khumalo"],
    correct_answer: "James Kagambi",
    difficulty: "hard",
  },
  {
    question:
      "The book, &quot;The Da Vinci Code&quot; was written by which of these authors?",
    incorrect_answers: ["Sidney Sheldon", "Mario Puzo", "James Hadley Chase"],
    correct_answer: "Dan Brown",
    difficulty: "medium",
  },
  {
    question: "The corbillion cup is associated with which sport?",
    incorrect_answers: ["Tennis", "Hockey", "Cricket"],
    correct_answer: "Table Tennis",
    difficulty: "hard",
  },
  {
    question: "Alexander Fleming is best known for the discovery of?",
    incorrect_answers: ["Proton", "Bacteria", "Cosmic rays"],
    correct_answer: "Penicillin",
    difficulty: "medium",
  },
  {
    question:
      "Benjamin Franklin, one of the founding fathers of the United States of America was also the inventor of?",
    incorrect_answers: ["Battery", "Diesel Engine", "Telephone"],
    correct_answer: "Lightning rod",
    difficulty: "medium",
  },
  {
    question:
      "The great navigator, Christopher Columbus was from what country?",
    incorrect_answers: ["America", "Brazil", "Spain"],
    correct_answer: "Italy",
    difficulty: "hard",
  },
  {
    question: "Which of these men is known as &quot;The father of India&quot;?",
    incorrect_answers: [
      "Rajendra Prasad",
      "Siddhartha Gautama",
      "Potti Sreeramulu",
    ],
    correct_answer: "Mahatma Gandhi",
    difficulty: "hard",
  },
  {
    question: "Which of these is not a secondary color?",
    incorrect_answers: ["Brown", "Turquoise", "Purple"],
    correct_answer: "Red",
    difficulty: "easy",
  },
  {
    question: "One of these is not a flowering plant?",
    incorrect_answers: ["Lily", "Hibiscus", "Crysanthemum"],
    correct_answer: "Cassava",
    difficulty: "easy",
  },
  {
    question:
      "When a solid changes state to a gas without passing the liquid phase, it is said to have?",
    incorrect_answers: ["Condensed", "Frozen", "Vaporised"],
    correct_answer: "Sublimated",
    difficulty: "easy",
  },
  {
    question:
      "What political party did Nigerian politician, Moshood Abiola belong to?",
    incorrect_answers: [
      "People's Democratic Party",
      "Action Congress of Nigeria",
      "All Progressive Grand Alliance",
    ],
    correct_answer: "Social Democratic Party",
    difficulty: "medium",
  },
  {
    question: "Who was the first man to land on the moon?",
    incorrect_answers: [
      "Neil Feetstrong",
      "Neil Headstrong",
      "Neil Handstrong",
    ],
    correct_answer: "Neil Armstrong",
    difficulty: "easy",
  },
  {
    question: "Which of these refers to a loss of memory?",
    incorrect_answers: ["Anorexia", "Alopecia", "Anemia"],
    correct_answer: "Amnesia",
    difficulty: "medium",
  },
  {
    question: "Stockholm is a city in which of these countries?",
    incorrect_answers: ["China", "Singapore", "Switzerland"],
    correct_answer: "Sweden",
    difficulty: "medium",
  },
  {
    question: "Which of these colors cannot be found on a rainbow?",
    incorrect_answers: ["Red", "Yellow", "Indigo"],
    correct_answer: "Purple",
    difficulty: "easy",
  },
  {
    question: "An eclipse of the moon is called a?",
    incorrect_answers: ["Moonar Eclipse", "Moonlar Eclipse", "Solar Eclipse"],
    correct_answer: "Lunar Eclipse",
    difficulty: "easy",
  },
  {
    question: "A group of pandas is called?",
    incorrect_answers: ["An army", "A flock", "A herd"],
    correct_answer: "An embarrasment",
    difficulty: "medium",
  },
  {
    question: "Who wrote the hit country track, 'The Gambler' ",
    incorrect_answers: ["Kenny Rogers", "Loretta Lynn", "Ray Charles"],
    correct_answer: "Don Schlitz",
    difficulty: "hard",
  },
  {
    question: "How many local governments do we have in Nigeria",
    incorrect_answers: ["771", "772", "775"],
    correct_answer: "774",
    difficulty: "medium",
  },
  {
    question:
      "'Only one straight line can be drawn between two points' is an example of a?",
    incorrect_answers: [
      "Mathematical Theorem",
      "Mathematical Postulate",
      "Mathematical Law",
    ],
    correct_answer: "Mathematical Axiom",
    difficulty: "medium",
  },
  {
    question: "Nicolai Kardashev was?",
    incorrect_answers: ["A Philosopher", "A Poet", "A Psychologist"],
    correct_answer: "An Astrophysicist",
    difficulty: "hard",
  },
  {
    question: "The Arabic word 'haram' means? ",
    incorrect_answers: ["Peace", "Justice", "Unity"],
    correct_answer: "Sin",
    difficulty: "medium",
  },
  {
    question:
      "Madgascar is an island and a country located in what part of Africa",
    incorrect_answers: ["North", "East", "West"],
    correct_answer: "South",
    difficulty: "medium",
  },
  {
    question: "Zakat, one of the five pillars of Islam is also known as? ",
    incorrect_answers: [
      "Fasting during Ramadan",
      "Daily Prayers",
      "Pilgrimage to Mecca",
    ],
    correct_answer: "Almsgiving",
    difficulty: "medium",
  },
  {
    question:
      "According to the book of Matthew, which of these were used to feed the 5000?",
    incorrect_answers: ["Bread and Beans", "Yam and Eggs", "Rice and Stew"],
    correct_answer: "Bread and Fish",
    difficulty: "easy",
  },
  {
    question: "Groundhog day is a celebration held annually on what date?",
    incorrect_answers: ["May 20th", "August 21st", "November 13th"],
    correct_answer: "February 2nd",
    difficulty: "hard",
  },
  {
    question: "What is the scientific name of the Grey Wolf?",
    incorrect_answers: ["Canis familiaris", "Canis latrans", "Canis aureus"],
    correct_answer: "Canis lupus",
    difficulty: "hard",
  },
];
