import { interpret } from "xstate";
import { machine } from "../machines/machine";

describe("Game Machine", () => {
    let gameService;

    beforeEach(() => {
        gameService = interpret(machine).start();
    });

    afterEach(() => {
        gameService.stop();
    });

    it("Should start in the idle state", () => {
        gameService.subscribe((state) => {
            expect(state.value).toBe("idle");
        });
    });

    it("Should transition to playing state when START event is sent", () => {
        gameService.send("START");

        gameService.subscribe((state) => {
            if (state.value === "playing") {
                expect(state.value).toBe("playing");
            }
        });
    });

    it("Should switch players after a move", () => {
        gameService.send("START");
        gameService.send({ type: "MAKE_MOVE", index: 0 });

        gameService.subscribe((state) => {
            if (state.value === "playing") {
                expect(state.context.currentPlayer).toBe("O");
            }
        });
    });

    it("Should declare a winner when a winning move is made", () => {
        gameService.send("START");
        gameService.send({ type: "MAKE_MOVE", index: 0 }); // X
        gameService.send({ type: "MAKE_MOVE", index: 1 }); // O
        gameService.send({ type: "MAKE_MOVE", index: 3 }); // X
        gameService.send({ type: "MAKE_MOVE", index: 4 }); // O
        gameService.send({ type: "MAKE_MOVE", index: 6 }); // X wins

        gameService.subscribe((state) => {
            if (state.value === "won") {
                expect(state.value).toBe("won");
                expect(state.context.winner).toBe("X");
            }
        });
    });

    it("Should declare a draw when the board is full", () => {
        gameService.send("START");
        gameService.send({ type: "MAKE_MOVE", index: 0 }); // X
        gameService.send({ type: "MAKE_MOVE", index: 1 }); // O
        gameService.send({ type: "MAKE_MOVE", index: 2 }); // X
        gameService.send({ type: "MAKE_MOVE", index: 3 }); // O
        gameService.send({ type: "MAKE_MOVE", index: 5 }); // X
        gameService.send({ type: "MAKE_MOVE", index: 4 }); // O
        gameService.send({ type: "MAKE_MOVE", index: 6 }); // X
        gameService.send({ type: "MAKE_MOVE", index: 7 }); // O
        gameService.send({ type: "MAKE_MOVE", index: 8 }); // X - Draw

        gameService.subscribe((state) => {
            if (state.value === "draw") {
                expect(state.value).toBe("draw");
            }
        });
    });
});
