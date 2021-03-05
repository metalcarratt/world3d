const registeredParties = {};

const TILDE = "~", P = "P", NUM0 = "0", NUM1 = "1", NUM2 = "2", NUM3 = "3",
W = "W", S = "S", A = "A", D = "D", Q = "Q", E = "E", SPACE="SPACE", PLUS = "+", MINUS = "-";

const callCallback = function(key) {
    for (let reg of registeredParties[key]) {
        if (reg.condition()) {
            reg.callback();
            return;
        }
    }
}

const keymap = {
    32: SPACE,
    43: PLUS,
    45: MINUS,
    48: NUM0,
    49: NUM1,
    50: NUM2,
    51: NUM3,
    83: S,
    87: W,
    96: TILDE,
    97: A,
    100: D,
    101: E,
    112: P,
    113: Q,
    115: S,
    119: W
}

const create = function(condition, callback) {
    return {
        condition: condition !== undefined ? condition : () => true,
        callback
    }
}

export default {
    TILDE, P, NUM0, NUM1, NUM2, NUM3, W, S, A, D, Q, E, SPACE, PLUS, MINUS,
    registerInterest({key, condition, callback}) {
        // window.console.log("register");
        if (!registeredParties[key]) {
            registeredParties[key] = [];
        }
        registeredParties[key].push(create(condition, callback));
    },
    registerAll({condition, registrations}) {
        // window.console.log("register all");
        for (let reg of registrations) {
            if (!registeredParties[reg.key]) {
                registeredParties[reg.key] = [];
            }
            registeredParties[reg.key].push(create(condition, reg.callback));
        }
    },
    handleKeyPress(e) {
        window.console.log(`handle key press ${e.keyCode}`)
        for (let keyCode of Object.keys(keymap)) {
            if (e.keyCode === parseInt(keyCode)) {
                callCallback(keymap[keyCode]);
                break;
            }
        }
    }
}