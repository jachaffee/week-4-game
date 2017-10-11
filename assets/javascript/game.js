
var myHTML = [];
var hpArray = [1200, 1500, 1000, 1500];
var attackArray = [200, 225, 150, 250];
var defenseArray = [30, 30, 15, 5];
var attackIncArray = [30, 20, 25, 50];
var evadeArray = [2, 2, 5, 1];
var clicks = 0;
var userChar;
var compChar;
var enemySelected = 0;
var victories = 0;
var userAttack;
var compAttack;
var dodgeAttack;

var characterArray = [
	{
	name: "Karsa",
	img: "assets/images/Karsa.jpg",
	hp: 1200,
	attack: 200,
	defense: 30,
	attackInc: 30,
	evade: 2,
	},
	{
	name: "Rake",
	img: "assets/images/Anomander.jpg",
	hp: 1500,
	attack: 225,
	defense: 30,
	attackInc: 20,
	evade: 2,
	},
	{
	name: "Cotillion",
	img: "assets/images/Cotillion.jpg",
	hp: 1000,
	attack: 150,
	defense: 15,
	attackInc: 25,
	evade: 5,
	},
	{
	name: "Icarium",
	img: "assets/images/Icarium.jpg",
	hp: 1500,
	attack: 250,
	defense: 5,
	attackInc: 50,
	evade: 1,
	},
]

function playerDefeated() {
	if (characterArray[userChar].hp < 1) {
		$(".battle-stats").html("You have been slain.");
		return;
	}
}

function enemyDefeated() {
	if (characterArray[compChar].hp < 1) {
		$(".battle-stats-enemy").html(characterArray[compChar].name + " has been vanquished. Choose your next opponent.");
		$(".enemyCombatant").remove();
		enemySelected--;
		victories++;

		if (victories === 3) {
			$(".battle-stats").html("Congratulations, you have conquered all challengers!");
		}
	}
}

for (var i = 0; i < characterArray.length; i++) {
          myHTML += "<div class='character-choice text-center' id=" + i + "><p>" + characterArray[i].name + "</p><div class='character-image'><img class='character-images' src=" + characterArray[i].img + "></div><p class='health'</p>" + "health: " + characterArray[i].hp + "</div>";
     }

characterArray[0].hp = 1200;
$(".hero").html(myHTML);

$("body").on("click", ".character-choice", function(event) {
	if (clicks === 0) {
		userChar = $(this).attr("id");
		$(this).addClass("hero");
		$(this).siblings().addClass("enemies");
		var opponents = $(this).siblings().detach();
		var player = $(this).detach();
		$(".hero").append(player);
		$(".enemies").append(opponents);
		clicks++;
	}
});

$("body").on("click", ".enemies", function() {
	if (enemySelected === 0) {
		compChar = $(this).attr("id");
		$(this).addClass("enemyCombatant");
		var currentEnemy = $(this).detach();
		$(".combatant").append(currentEnemy);
		enemySelected++;
	}
});

$("body").on("click", "#attack-button", function() {
	if (enemySelected === 1) {
		
		dodgeAttack = Math.floor(Math.random() * 11);

		if (characterArray[userChar].evade > dodgeAttack) {
			compAttack === 0;
		}

		else {
			compAttack = Math.floor(Math.random() * characterArray[compChar].attack) - Math.floor(Math.random() * characterArray[userChar].defense);
			characterArray[userChar].hp = characterArray[userChar].hp - compAttack;
		}


		if (characterArray[userChar].evade > dodgeAttack) {
			compAttack === 0;
		}

		else {
			userAttack = Math.floor(Math.random() * characterArray[userChar].attack) - Math.floor(Math.random() * characterArray[compChar].defense);
			characterArray[compChar].hp = characterArray[compChar].hp - userAttack;
		}
			
			
		
			if (characterArray[userChar].hp > -1) {
				$("div.hero > p.health").html(characterArray[userChar].name + "HP: " + characterArray[userChar].hp);
			}
			else {
				characterArray[userChar].hp = 0;
				$("div.hero > p.health").html(characterArray[userChar].name + "HP: " + characterArray[userChar].hp);
			}
			if (characterArray[compChar].hp > -1) {
				$("div.enemyCombatant > p.health").html(characterArray[compChar].name + "HP: " + characterArray[compChar].hp);
			}
			else {
				characterArray[compChar].hp = 0;
				$("div.enemyCombatant > p.health").html(characterArray[compChar].name + "HP: " + characterArray[compChar].hp);
			}
			$(".battle-stats").html(characterArray[userChar].name + " attacked " + characterArray[compChar].name + " for " + userAttack + " damage!");
			$(".battle-stats-enemy").html(characterArray[compChar].name + " counter attacked " + characterArray[userChar].name + " for " + compAttack + " damage!");
	
			playerDefeated()
			enemyDefeated()

			characterArray[userChar].attack = characterArray[userChar].attack + characterArray[userChar].attackInc;
	}
});
