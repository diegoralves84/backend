import {soma, divisao } from './index.js';

if (soma(1, 1) === 2) console.log("Passou soma 1º!");
else console.error("Deu ruim 1º!");

if (soma(1, 0) === 1) console.log("Passou soma 2º!");
else console.error("Deu ruim 2º!");

if (soma(1, -1) === 0) console.log("Passou soma 3º!");
else console.error("Deu ruim 3º!");

if (divisao(1,1) === 1) console.log ("Passou divisão 4º!");
else console.error("Deu ruim 4º!");

if (divisao(6, 3) === 2) console.log ("Passou divisão 5º!");
else console.error("Deu ruim 5º!");

if (divisao(1, 0) === undefined) console.log ("Passou divisão 6º!");
else console.error("Deu ruim 6º!");


function soma(a, b) {
    return a + b;
}

function divisao(a,b) {
    if (b === 0) return undefined;
    return a / b;
}

