const player1 = {
  nome: "Mario",
  velocidade: 4,
  manobrabidade: 3,
  poder: 3,
  pontos: 0,
};
const player2 = {
  nome: "Luigi",
  velocidade: 4,
  manobrabidade: 3,
  poder: 5,
  pontos: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "Reta";
      break;
    case random < 0.66:
      result = "Curva";
      break;
    default:
      result = "Duelo";
  }

  return result;
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    //console.log(` 🏁 RODADA ${round}`);

    //sortear bloco
    let block = await getRandomBlock();
    console.log(`\n 🏁 RODADA ${round} - ${block}`);

    //  rolar dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    async function logRollResult(characterName, block, diceResult, attribute) {
      console.log(
        `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
          diceResult + attribute
        }`
      );
    }

    //  teste de habilidade
    let testeSkill1 = 0;
    let testeSkill2 = 0;

    //  habilidade na reta
    if (block === "Reta") {
      testeSkill1 = diceResult1 + character1.velocidade;
      testeSkill2 = diceResult2 + character2.velocidade;
      await logRollResult(
        character1.nome,
        "velocidade",
        diceResult1,
        character1.velocidade
      );

      await logRollResult(
        character2.nome,
        "velocidade",
        diceResult2,
        character2.velocidade
      );
    }

    //  habilidade na curva
    if (block === "Curva") {
 
      testeSkill1 = diceResult1 + character1.manobrabidade;
      testeSkill2 = diceResult2 + character2.manobrabidade;

      await logRollResult(
        character1.nome,
        "manobrabilidade",
        diceResult1,
        character1.manobrabidade
      );

      await logRollResult(
        character2.nome,
        "manobrabilidade",
        diceResult2,
        character2.manobrabidade
      );
    }

    //  verificando o vencedor
    if (testeSkill1 > testeSkill2) {
      console.log(`${character1.nome} marcou um ponto!🎆`);
      character1.pontos++;
    } else if (testeSkill2 > testeSkill1) {
      console.log(`${character2.nome} marcou um ponto!🎆`);
      character2.pontos++;
    }

    //  habilidade de poder
    if (block === "Duelo") {
      let powerResult1 = diceResult1 + character1.poder;
      let powerResult2 = diceResult2 + character2.poder;

      console.log(`${character1.nome} confrontou com ${character2.nome}!🥊`);

      await logRollResult(
        character1.nome,
        "poder",
        diceResult1,
        character1.poder
      );

      await logRollResult(
        character2.nome,
        "poder",
        diceResult2,
        character2.poder
      );

      /* if ternario
    character2.pontos -= powerResult1 > powerResult2 && character2.pontos > 0 ? 1 : 0


    character1.pontos -= powerResult2 > powerResult1 && character1.pontos > 0 ? 1 : 0

    EMPATE:
    console.log(powerResult2 === powerResult1 ? "confronto empatado, nenhum ponto foi perdido" : " ")

        */

      //condições
      if (powerResult1 > powerResult2) {
        if (character2.pontos > 0) {
          console.log(
            `${character1.nome} venceu o confronto! ${character2.nome} perdeu 1 ponto 💔`
          );
          character2.pontos--;
        }
      }

      if (powerResult2 > powerResult1) {
        if (character1.pontos > 0) {
          console.log(
            `${character2.nome} venceu o confronto! ${character1.nome} perdeu 1 ponto 💔`
          );
          character1.pontos--;
        }
      } else {
        console.log("confronto empatado, nenhum ponto foi perdido");
      }
    }

    console.log("\n----------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log("----------------")
  console.log(`${character1.nome}: ${character1.pontos} pontos|`);
  console.log(`${character2.nome}: ${character2.pontos} pontos|`);
  console.log("----------------")

  if (character1.pontos > character2.pontos) {
    console.log(`\n${character1.nome} venceu a corrida🏆\n`);
  }
  if (character2.pontos > character1.pontos) {
    console.log(`\n${character2.nome} venceu a corrida🏆\n`);
  }
  if (character1.pontos === character2.pontos) {
    console.log("\nA corrida terminou em empate🟰\n");
  }
}

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando... \n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
