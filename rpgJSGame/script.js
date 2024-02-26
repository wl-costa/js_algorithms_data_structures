// initial values
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// the Query Selector is indicating the button with the id #button1
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
        "button functions": [goTown, goTown, goTown],
        text: "The monster screams Arg! as it dies. You gain experience points and find gold."
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
// here the use of const means that those value should never change

// functions are special tools that allow you to run sections of code at specific times.
// initialize buttons
// when the button is clicked, myFunction will be called.
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// functions can take parameters, which are values that are given to the function each time it runs.
function update(location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goTown() {
    update(locations[0]);
    monsterStats.style.display = "none";
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
        goldText.innerText = gold; // it updates the gold on screen
        healthText.innerText = health; // it updates the health on screen
        text.innerText = "You have been cured.";
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon() {
    if (gold >= 30 && currentWeapon < weapons.length - 1) {
        gold -= 30; //gold = gold - 30;
        currentWeapon++; // currentWeapon += 1; / currentWeapon = currentWeapon + 1;
        goldText.innerText = gold; // it updates the gold on screen
        let newWeaponName = weapons[currentWeapon].name; // it updates the weapons index and gets its name property
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
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; // Math.random() generates a random number from 0 (inclusive) to 1 (exclusive). Math.floor() rounds a given number down to the nearest integer.
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        defeatMonster();
    }
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function lose() {

}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.8);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}