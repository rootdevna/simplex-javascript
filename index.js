//Escrevendo o script com valores fixos para facilitar

//1º passo -> Escrever as variaveis da funcao objetiva invertidas

var z = [
	{var: 'x1', val: -10, col: 'z'},
	{var: 'x2', val: -20, col: 'z'},
	{var: 'x3', val: -30, col: 'z'},
	{var: 'f1', val: 0, col: 'z'},
	{var: 'f2', val: 0, col: 'z'},
	{var: 'f3', val: 0, col: 'z'},
	{var: 'f4', val: 0, col: 'z'},
	{var: 'base', val: 0, col: 'z'}
]

//2º passo -> Definir as restricoes e transformar desigualdades em igualdades acrescentando variáveis de folga.

var sa1 = [
	{var: 'x1', val: 2, col: 'f1'},
	{var: 'x2', val: 2, col: 'f1'},
	{var: 'x3', val: 4,  col: 'f1'},
	{var: 'f1', val: 1, col: 'f1'},
	{var: 'f2', val: 0, col: 'f1'},
	{var: 'f3', val: 0, col: 'f1'},
	{var: 'f4', val: 0,  col: 'f1'},
	{var: 'base', val: 300, col: 'f1'}
]

var sa2 = [
	{var: 'x1', val: 0, col: 'f2'},
	{var: 'x2', val: 4, col: 'f2'},
	{var: 'x3', val: 3, col: 'f2'},
	{var: 'f1', val: 0, col: 'f2'},
	{var: 'f2', val: 1, col: 'f2'},
	{var: 'f3', val: 0, col: 'f2'},
	{var: 'f4', val: 0, col: 'f2'},
	{var: 'base', val: 200, col: 'f2'}
]

var sa3 = [
	{var: 'x1', val: 1, col: 'f3'},
	{var: 'x2', val: 0, col: 'f3'},
	{var: 'x3', val: 0, col: 'f3'},
	{var: 'f1', val: 0, col: 'f3'},
	{var: 'f2', val: 0, col: 'f3'},
	{var: 'f3', val: 1, col: 'f3'},
	{var: 'f4', val: 0, col: 'f3'},
	{var: 'base', val: 20, col: 'f3'}
]

var sa4 = [
	{var: 'x1', val: 4, col: 'f4'},
	{var: 'x2', val: 3, col: 'f4'},
	{var: 'x3', val: 0, col: 'f4'},
	{var: 'f1', val: 0, col: 'f4'},
	{var: 'f2', val: 0, col: 'f4'},
	{var: 'f3', val: 0, col: 'f4'},
	{var: 'f4', val: 1, col: 'f4'},
	{var: 'base', val: 50, col: 'f4'}
]

//3º passo -> Preencher a tabela SIMPLEX com os dados das equacoes

var simplex = [
{name: 'z', data: z},
{name: 'f1', data: sa1},
{name: 'f2', data: sa2},
{name: 'f3', data: sa3},
{name: 'f4', data: sa4}
]

for(var i = 0; i < simplex.length; i++) {
	//console.log(simplex[i]);
}

//4º passo -> Escolher a coluna pivô: Olhar na linha Z qual eh o numero + negativo

var valuesZ = z.map((item) => {return item.val})

var minZ = Math.min(...valuesZ);

var minElement = z.filter((item) => {return item.val === minZ})

//posicao da coluna pivo (usarei mais tarde para pegar o numero pivo)
var posCP = valuesZ.indexOf(minZ)

//variavel que vai entrar na base
var varIn = minElement[0].var;


//5º passo -> Escolher a linha pivô: Menor resultado para base/coluna pivô (com excessao da linha z)

var results = [];

//comecando no 1 porque a linha Z nao conta
for(var i = 1; i < simplex.length; i++) {
	let dataCP = simplex[i].data.filter((item) => {return item.var === varIn})
	let dataBASE = simplex[i].data.filter((item) => {return item.var === 'base'})

	if(dataBASE[0].val != 0 && dataCP[0].val != 0){
		results.push({val:dataBASE[0].val / dataCP[0].val, col: simplex[i].name});
	}
	else{
		results.push({val: 0, col: simplex[i].name})
	}
}

//console.log(results)

var removeNegatives = results.filter((item) => {return item.val > 0})

var onlyNumbers = removeNegatives.map((item) => {return item.val})
var minRow = Math.min(...onlyNumbers)

var outElement = removeNegatives.filter((item) => {return item.val === minRow})

var varOut = outElement[0].col;

console.log(varIn)
console.log(varOut)

//Dividir linha pivo pelo numero pivo e o resultado vai para nova var que vai entrar

var varEntrada = [];

var linhaPivo = simplex.filter((item) => {return item.name === varOut});
linhaPivo = linhaPivo[0].data;

//pegando a interscecao da linha pivo com coluna pivo
var pivo = linhaPivo[posCP].val;

for(var i = 0; i < linhaPivo.length; i++) {
	let newValue = 0;
	if(linhaPivo[i].val != 0 && pivo != 0) {
		newValue = (linhaPivo[i].val / pivo).toFixed(2);
	}
	varEntrada.push({var: linhaPivo[i].var, val: parseFloat(newValue), col: varIn})
}

//console.log(varEntrada);

//Passo 7 -> Para cada nova linha preenchida, pegar linha antiga e subtrair o coeficiente da coluna pivo multiplicando pela nova linha pivo.
// -(coeficiente da linha) x coeficiente da coluna pivo - valor a ser substituido

var numbersEntrada = varEntrada.map((item) => {return item.val})

for(var i = 0; i < simplex.length; i++) {
	if(simplex[i].name != varOut) {
		var numbers = simplex[i].data.map((item) => {return item.val})

		//pegando coeficiente linha e invertendo o sinal
		var coeficienteLinha = 0;
		if(numbers[posCP] != 0) {
			coeficienteLinha = numbers[posCP] * -1;		
		}

		for(j = 0; j < numbersEntrada.length; j++) {

			if(coeficienteLinha != 0 && numbersEntrada[j] != 0){
				var valueLinha = Math.round((coeficienteLinha * numbersEntrada[j]));
			}
			else {
				var  valueLinha = 0;
			}

			if(numbers[j] < 0) {
				//valueLinha += numbers[j]	
			}
			else {
				//valueLinha -= numbers[j]
			}
			
			console.log(valueLinha)
		}

		console.log("------")
	}
}

