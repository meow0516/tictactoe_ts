import "./main.css";
import "/node_modules/primeflex/primeflex.min.css";
import "/node_modules/primeflex/themes/arya-blue.css";

import TicTacToe from "./tictactoe";

window.onload = function () {
  let game1 = new TicTacToe(
    "game1",
    {
      name: "Peko",
      mark: "@",
      color: "blue",
    },
    {
      name: "Marine",
      mark: "#",
      color: "red",
    }
  );
  game1.gameInit();
};
