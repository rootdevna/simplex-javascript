const Matriz = require('./app/models/matriz');

var numDecisionVar = 3; // Quantidade de variáveis de decisão
var numConstraintVar = 3; // Quantidade de variáveis de restrição

var matriz = new Matriz(numConstraintVar + 1, numDecisionVar + 1);

/*
var line1 = [7/10, 1, 630];
var line2 = [1/2, 5/6, 600];
var line3 = [1, 2/3, 700];
var line4 = [1/10, 1/4, 135];
var line5 = [-10, -9];

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
        case 4:
            matriz.addInput(line5, i);
            break;
    }
}*/

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

matriz.print();

var simplexFrame = Matriz.generateSimplexFrame(matriz);

simplexFrame.print();

var iteratorCount = 0;

while (true)
{
    if (simplexFrame.checkRowZ() == true) {
        iteratorCount++;
        simplexFrame = Matriz.generateNewSimplexFrame(simplexFrame);
        simplexFrame.print();
    }
    else
        break;
}

console.log("Total de Iterações: " + iteratorCount);