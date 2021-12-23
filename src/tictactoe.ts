const oxPageContainer = document.getElementById("ox_page_container");
const winnerArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

type Player = {
  name: string;
  chosenNumbers: Array<number>;
  mark: string;
  color: string;
};

type PlayerOption = {
  name?: string;
  mark?: string;
  color?: string;
};

class TicTacToe {
  isOddPlayerTurn: Boolean;
  usedNumber: Array<number>;
  players: { [x: string]: Player };
  id: string;

  constructor(
    id: string,
    oddPlayerOption?: PlayerOption,
    evenPlayerOption?: PlayerOption
  ) {
    this.isOddPlayerTurn = true;
    this.usedNumber = [];
    this.players = {
      odd: {
        name: oddPlayerOption?.name ?? "Odd",
        chosenNumbers: [],
        mark: oddPlayerOption?.mark ?? "O",
        color: oddPlayerOption?.color ?? "",
      },
      even: {
        name: evenPlayerOption?.name ?? "Even",
        chosenNumbers: [],
        mark: evenPlayerOption?.mark ?? "X",
        color: evenPlayerOption?.color ?? "",
      },
    };
    this.id = id;
  }

  gameInit() {
    let that = this;
    this.insertGameContainer(this.id);
    document
      .getElementById(this.id)
      ?.querySelector(".submit")
      ?.addEventListener("click", function () {
        that.submitValue(that.id);
      });
    document
      .getElementById(this.id)
      ?.querySelector(".restart")
      ?.addEventListener("click", function () {
        that.restartGame();
      });
  }

  insertGameContainer(id: string) {
    let gameContainer = document.createElement("div");
    gameContainer.id = id;
    gameContainer.textContent = id;
    oxPageContainer?.appendChild(gameContainer);
    this.insertInput(gameContainer);
    this.insertBoxes(gameContainer);
    this.insertResetBtn(gameContainer);
  }

  insertInput(upperContainer: HTMLElement) {
    let numberInputContainer = document.createElement("div");
    numberInputContainer.className = "number_input flex justify-content-center";
    upperContainer.appendChild(numberInputContainer);

    // input line
    let numberInput = document.createElement("input");
    numberInput.setAttribute("type", "number");
    numberInput.setAttribute("min", "1");
    numberInput.setAttribute("max", "9");
    numberInput.setAttribute("placeholder", "input 1-9");
    numberInput.id = "inputValue";
    numberInput.className = "w-8rem uppercase";

    // submit btn
    let submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", "submit");
    submitInput.className = "submit w-5rem uppercase";

    // append to div
    numberInputContainer.append(numberInput);
    numberInputContainer.append(submitInput);
  }

  insertBoxes(upperContainer: HTMLElement) {
    let oxBoxContainer = document.createElement("div");
    oxBoxContainer.className = "ox_box_container flex flex-wrap w-full";
    upperContainer.appendChild(oxBoxContainer);
    for (let i = 1; i < 10; i++) {
      let newOxBox = document.createElement("div");
      newOxBox.className = "ox_box col-4";

      let newInnerOxBox = document.createElement("div");
      newInnerOxBox.className =
        "inner_ox_box flex justify-content-center align-items-center h-6rem bg-blue-700 text-white text-4xl";
      newInnerOxBox.textContent = String(i);

      newOxBox.appendChild(newInnerOxBox);
      oxBoxContainer.appendChild(newOxBox);
    }
  }

  insertResetBtn(upperContainer: HTMLElement) {
    let resetContainer = document.createElement("div");
    resetContainer.className = "text-center";

    let resetBtn = document.createElement("button");
    resetBtn.className = "restart";
    resetBtn.textContent = "Restart";

    resetContainer.appendChild(resetBtn);
    upperContainer.appendChild(resetContainer);
  }

  submitValue(gameId: string) {
    const gameContainer = document.getElementById(gameId);

    if (gameContainer === null) {
      throw new Error("...");
    }
    let inputValueDom = gameContainer.querySelector("#inputValue");
    let inputValue = (inputValueDom as HTMLInputElement).valueAsNumber;

    let innerBoxes = gameContainer.querySelectorAll(".inner_ox_box");

    // check valid input
    let isValidInput = inputValue > 0 && inputValue < 10;
    if (!isValidInput) return alert("please input valid number");

    // check input is used
    let isUsedInput = this.usedNumber.includes(inputValue);
    if (isUsedInput) return alert("This number already used! Try another one.");

    // mark box
    this.markBox(
      innerBoxes.item(inputValue - 1),
      inputValue,
      this.currentPlayer
    );

    // check winner
    this.checkWinner(gameId, this.currentPlayer);

    // players take turns
    this.isOddPlayerTurn = !this.isOddPlayerTurn;
  }

  get currentPlayer() {
    return this.isOddPlayerTurn ? this.players.odd : this.players.even;
  }

  markBox(box: Element, inputValue: number, player: Player) {
    box.textContent = player.mark;
    if (player.color) {
      box.classList.remove("bg-blue-700");
      (box as HTMLElement).style.backgroundColor = player.color;
    }
    this.usedNumber.push(inputValue);
    player.chosenNumbers.push(inputValue);
  }

  checkWinner(gameId: string, playerInfo: Player) {
    for (const arr of winnerArray) {
      if (arr.every((value) => playerInfo.chosenNumbers.includes(value))) {
        alert(gameId + ": Player " + playerInfo.name + " win!");
      }
    }
  }
  restartGame() {
    let restartGame = confirm("Restart the game?");
    if (restartGame) {
      window.location.reload();
    }
  }
}

export default TicTacToe;
