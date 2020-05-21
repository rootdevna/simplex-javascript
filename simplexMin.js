const matrizMin = require('./app/models/matriz minimizar/matrizMin');
const mathjs = require('mathjs');


var numDecisionVar = 2; // Quantidade de variáveis de decisão
var numConstraintVar = 2; // Quantidade de variáveis de restrição

var matriz = new matrizMin(numConstraintVar + 1, numDecisionVar + 1);

// MIN Z = 2 *x1 - 3*x2
//MAX Z = -2*x1 + 3*x2
var line1 = [1, 1, 1, 100];
var line2 = [10, 4, 5, 600];
var line3 = [2, 2, 6, 300];
var line4 = [-10, -6, -4];

for (var i = 0; i < numConstraintVar + 1; i++)
{
    switch (i)
    {
        case 0:
            matriz.addInput(line1, i);
            break;
        case 1:
            matriz.addInput(line2, i);
            break;
        case 2:
            matriz.addInput(line3, i);
            break;
        case 3:
            matriz.addInput(line4, i);
            break;
    }
}
// var line1 = [4,-1,6];
// var line2 = [1,1,4];
// var Z = [+2, -3];

// for (var i = 0; i < numConstraintVar +1; i++)
// {
//     switch (i)
//     {
//         case 0:
//             matriz.addInput(line1, i);
//             break;
//         case 1:
//             matriz.addInput(line2, i);
//             break;
//         case 2:
//             matriz.addInput(Z, i);                              
//             break;
//     }
// } 
matriz.print();

var simplexFrame = matrizMin.generateSimplexFrame(matriz);

simplexFrame.print();

var iteratorCount = 0;
//http://www.phpsimplex.com/pt/teoria_metodo_simplex.htm
while (true)
{        
    if (simplexFrame.checkRowZ() == true) {
        iteratorCount++;
        simplexFrame = matrizMin.generateNewSimplexFrame(simplexFrame);
        simplexFrame.print();
    }
    else    
        break;
}

console.log("Total de Iterações: " + iteratorCount);