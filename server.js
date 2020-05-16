const Matriz = require('./app/models/matriz');

var numDecisionVar = 2; // Quantidade de variáveis de decisão
var numConstraintVar = 4; // Quantidade de variáveis de restrição

var matriz = new Matriz(numConstraintVar + 1, numDecisionVar + 1);

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
}

var simplexFrame = Matriz.generateSimplexFrame(matriz);

simplexFrame.print();