const Matriz = require('./app/models/matriz');

<<<<<<< Updated upstream
var numDecisionVar = 3; // Quantidade de variáveis de decisão
var numConstraintVar = 3; // Quantidade de variáveis de restrição

var matriz = new Matriz(numConstraintVar + 1, numDecisionVar + 1);

/*
var line1 = [7/10, 1, 630];
var line2 = [1/2, 5/6, 600];
var line3 = [1, 2/3, 700];
var line4 = [1/10, 1/4, 135];
var line5 = [-10, -9];
=======
var numDecisionVar = 2; // Quantidade de variáveis de decisão
var numConstraintVar = 4; // Quantidade de variáveis de restrição

var matriz = new Matriz(numConstraintVar + 1, numDecisionVar + 1);
/*
var line1 = [1, 0, 6000];
var line2 = [0, 1, 4000];
var line3 = [0.005, 0.0071, 40]
var line4 = [25, 30];

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
            matriz.addLastRow(line4, i, option);
            break;
    }
}
*/
/*
var line1 = [1,0,4];
var line2 = [0,1,6];
var line3 = [3,2,18];
var line4 = [-3,-5];

var option = "MIN";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
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
=======
            matriz.addLastRow(line4, i, option);
            break;
    }
}*/
var option = "MAX";

var line1 = [7/10, 1, 630];
var line2 = [1/2, 5/6, 600];
var line3 = [1, 2/3, 700];
var line4 = [1/10, 1/4, 135];
var line5 = [10, 9];
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
            break;
    }
}
=======
            break;
        case 4:
            matriz.addLastRow(line5, i, option);
            break;
    }
}


>>>>>>> Stashed changes

matriz.print();

var simplexFrame = Matriz.generateSimplexFrame(matriz);
simplexFrame.print();

<<<<<<< Updated upstream
var iteratorCount = 0;
=======
simplexFrame = Matriz.generateNewSimplexFrame(simplexFrame);
simplexFrame.print();

simplexFrame = Matriz.generateNewSimplexFrame(simplexFrame);
simplexFrame.print();





var senseAnalyse = Matriz.generateSensitivityAnalysis(matriz, simplexFrame);
senseAnalyse.print();
/*
function precise(x) {
    return Number.parseFloat(x).toPrecision(4);
  }

console.log(10 / Number.parseFloat(0.901));*/

/*
simplexFrame = Matriz.generateNewSimplexFrame(simplexFrame, option);
simplexFrame.print();

console.log(simplexFrame.getEnterColumn());
console.log(simplexFrame.getExitRow(option));

simplexFrame = Matriz.generateNewSimplexFrame(simplexFrame, option);
simplexFrame.print();*/
/*var iteratorCount = 0;
>>>>>>> Stashed changes

while (true)
{
    console.log(simplexFrame.checkRowZ());
    
    if (simplexFrame.checkRowZ() == true) {
        iteratorCount++;
        simplexFrame = Matriz.generateNewSimplexFrame(simplexFrame);
        simplexFrame.print();
    }
    else
        break;
}

console.log("Total de Iterações: " + iteratorCount);