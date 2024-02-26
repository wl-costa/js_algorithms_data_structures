// initial values.
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// the Query Selector is indicating the button with the id #button1.
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You died. &#x2620 "
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15,
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60,
    },
    {
        name: "dragon",
        level: 20,
        health: 300,
    }
];
// here the use of const means that those value should never change.

// functions are special tools that allow you to run sections of code at specific times.
// initialize buttons
// when the button is clicked, myFunction will be called.
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// functions can take parameters, which are values that are given to the function each time it runs.
function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerHTML = location.text; // the innerHTML property allows you to access or modify the content inside an HTML element using JavaScript.
}

function goTown() {
    update(locations[0]);
}


function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10; // gold = gold - 10;
        health += 10; // health = health + 10;
        goldText.innerText = gold; // it updates the gold on screen.
        healthText.innerText = health; // it updates the health on screen.
        text.innerText = "You have been cured.";
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon() {
    if (gold >= 30 && currentWeapon < weapons.length - 1) {
        gold -= 30; //gold = gold - 30;
        currentWeapon++; // currentWeapon += 1; / currentWeapon = currentWeapon + 1;
        goldText.innerText = gold; // it updates the gold on screen.
        let newWeaponName = weapons[currentWeapon].name; // it updates the weapons index and gets its name property.
        text.innerText = "You now have a " + newWeaponName + ".";
        inventory.push(newWeaponName);
    } else if (currentWeapon === weapons.length - 1) {
        text.innerText = "You already have the most powerful weapon.";
        button2.innerText = "Sell weapon for 15 gold"
        button2.onclick = sellWeapon
    } else {
        text.innerText = "You do not have enough gold to buy a weapon.";
    }
}

// the shift() method on an array removes the first element in the array and returns it.*/
function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift(); // since this new currentWeapon variable will be inside an if statement, it will be scoped only to that block of code.
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!"
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health; // accessed health property of monsters[fighting] with dot notation.
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; // Math.random() generates a random number from 0 (inclusive) to 1 (exclusive). Math.floor() rounds a given number down to the nearest integer.
    } else {
        text.innerText = " You miss.";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        if (fighting === 2) {
            winGame();
        } else {
            defeatMonster();
        }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks." // used inventory.pop(), which will remove the last item in the array AND return it so it appears in the string.
        currentWeapon--;
    }
}

function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp)) // this will set the monster's attack to five times their level minus a random number between 0 and the player's xp.
    return hit > 0 ? hit : 0; // it returns hit value as the function result
    // the ternary operator is a conditional operator and can be used as a one-line if-else statement. the syntax is: condition ? expressionIfTrue : expressionIfFalse.
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20; // the player should hit if either Math.random() > .2 or if the player's health is less than 20.
    // it returns a boolean true if conditions are met or false if they're not.
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.8);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

// all features have been completed.
// improvements done.
// a little easter egg! :D

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) { // a while loop accepts a condition, and will run the code in the block until the condition is no longer true.
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n" // using \n will cause the next part I add to text.innerText to appear on a new line.
    for (let i = 0; i < 10; i++) { // for loops are declared with three expressions separated by semicolons. for (a; b; c), where a is the initialization expression, b is the condition, and c is the final expression.
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.includes(guess)) { // the .includes() method determines if an array contains an element and will return either true or false.
        text.innerText = "Right! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health;
        if(health <= 0) {
            lose();
        }
    }
}