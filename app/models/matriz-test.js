function precise(x) {
    return Number.parseFloat(x).toPrecision(4);
}

class Matriz {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = [];

        for (var i = 0; i < rows; i++) {
            var arr = [];
            for (var j = 0; j < cols; j++) {
                arr.push(0);
            }
            this.data.push(arr);
        }
    }

    print() {
        console.table(this.data);
    }

    getEnterColumn() {
        var colBigNegative = -1;
        var bigNegative = 0;
        for (var i = 0; i < this.cols; i++) {
            if (bigNegative > this.data[this.rows - 2][i]) {
                bigNegative = this.data[this.rows - 2][i];
                colBigNegative = i;
            }
        }
        return colBigNegative;
    }

    getExitRow() {
        var arr = [];
        var rowSmallPositive = -1;
        var column = this.getEnterColumn();
        if (column == -1) {
            return -1;
        }
        for (var i = 0; i < this.rows - 2; i++) {
            arr.push(this.data[i][this.cols - 2] / this.data[i][column]);
        }
        if (arr.length <= 0) {
            return -1;
        }
        var smallPositive = arr[0];
        for (var i = 0; i < arr.length; i++) {
            if (smallPositive > arr[i]) {
                smallPositive = arr[i];
                rowSmallPositive = i;
            }
            if (i == arr.length - 1 && rowSmallPositive == -1 && arr[0] == smallPositive)
                rowSmallPositive = 0;
        }
        return rowSmallPositive;
    }

    getPivo() {
        return this.getExitRow() != -1 && this.getEnterColumn() != -1 ? this.data[this.getExitRow()][this.getEnterColumn()] : -1;
    }

    addInput(arr, column) {
        for (var i = 0; i < arr.length; i++)
            this.data[column][i] = arr[i];
    }

    addRow(arr, row) {
        for (var i = 0; i < arr.length; i++)
            this.data[row][i] = arr[i];
    }
    addLastRow(arr, column, option) {
        switch (option) {
            case "MIN":
                for (var i = 0; i < arr.length; i++)
                    this.data[column][i] = arr[i];
                break;
            case "MAX":
                for (var i = 0; i < arr.length; i++)
                    this.data[column][i] = -arr[i];
                break;
        }
    }

    checkRowZ() {   
        for (var i = 0; i < this.cols - 1; i++) {
            if (this.data[this.rows - 2][i] < 0) {
                return true;
            }
        }
        return false;
    }

    static generateSensitivityAnalysis(matriz, simplex) {
        var frame = new Matriz(matriz.rows + matriz.cols, 9);

//#region Tags
        // Adiciona tags para identificação da tabela 
        for (var i = 0; i < frame.rows - 1; i++) {
            if (i < matriz.cols - 1)
                frame.data[i][frame.cols - 1] = "X" + (i + 1);
            else if (i < simplex.cols - 2)
                frame.data[i][frame.cols - 1] = "F" + ((i + 2) - matriz.cols);
            else
                frame.data[i][frame.cols - 1] = "Z";
        }
        frame.data[frame.rows - 1][0] = "Valor Inicial";
        frame.data[frame.rows - 1][1] = "Valor Final";
        frame.data[frame.rows - 1][2] = "Uso";
        frame.data[frame.rows - 1][3] = "Sobra";
        frame.data[frame.rows - 1][4] = "Preço Sombra";
        frame.data[frame.rows - 1][5] = "Custo Reduzido";
        frame.data[frame.rows - 1][6] = "Máximo";
        frame.data[frame.rows - 1][7] = "Mínimo";
        frame.data[frame.rows - 1][frame.cols - 1] = "Variável";
//#endregion

        // Valor Inicial
        for (var i = matriz.cols - 1; i < frame.rows - 2; i++)
            frame.data[i][0] = matriz.data[i - (matriz.cols - 1)][matriz.cols - 1];

        // Valor Final
        for (var i = 0; i < frame.rows - 1; i++) {
            for (var j = 0; j < simplex.rows - 1; j++) {
                if (frame.data[i][frame.cols - 1] === simplex.data[j][simplex.cols - 1])
                    frame.data[i][1] = simplex.data[j][simplex.cols - 2];
            }
        }

        // Uso
        for (var i = matriz.cols - 1; i < frame.rows - 2; i++)
            frame.data[i][2] = frame.data[i][0] - frame.data[i][1];

        // Sobra
        for (var i = matriz.cols - 1; i < frame.rows - 2; i++) {
            if (frame.data[i][1] > 0)
                frame.data[i][3] = frame.data[i][1];
        }

        // Preço Sombra
        for (var i = matriz.cols - 1; i < frame.rows - 2; i++) {
            for (var j = matriz.cols - 1; j < simplex.cols - 2; j++) {
                if (frame.data[i][frame.cols - 1] === simplex.data[simplex.rows - 1][j])
                    frame.data[i][4] = simplex.data[simplex.rows - 2][j];
            }
        }

        // Custo Reduzido
        for (var i = 0; i < matriz.cols - 1; i++) {
            for (var j = 0; j < matriz.cols - 1; j++) {
                if (frame.data[i][frame.cols - 1] === simplex.data[simplex.rows - 1][j])
                    frame.data[i][5] = simplex.data[simplex.rows - 2][j];
            }
        }

        // Mínimo e Máximo
        for (var i = matriz.cols - 1; i < frame.rows - 2; i++) {
            var increase = -1;
            var decrease = -1;
            for (var j = 0; j < simplex.rows - 2; j++) {
                var result = 0;
                if (simplex.data[j][i] != 0)
                    result = (simplex.data[j][simplex.cols - 2] / simplex.data[j][i]) * -1;
                if (result > 0) {
                    if (increase == -1)
                        increase = result;
                    else if (increase > result)
                        increase = result;
                }
                else if (result < 0) {
                    if (decrease == -1)
                        decrease = result;
                    else if (decrease < result)
                        decrease = result;
                }                
                else if (j == simplex.rows - 3) {                                        
                    if (increase == -1)
                        increase = 0;
                    if (decrease == -1)
                        decrease = 0;
                }     
            }
            // Tratamento para Increase e Decrease
            if (decrease < 0)
                decrease = -decrease;
            if (frame.data[i][1] != 0)
                increase = -2;

            if (increase == -2)
                frame.data[i][6] = "INFINITO";
            else 
                frame.data[i][6] = frame.data[i][0] + increase;   
            frame.data[i][7] = frame.data[i][0] - decrease;
        }
        return frame;
    }

    static generateSimplexFrame(matriz) {
       var frame = new Matriz(matriz.rows + 1, matriz.rows + matriz.cols);
       // Adiciona os valores iniciais
       for (var i = 0; i < frame.rows - 1; i++) {
            for (var j = 0; j < matriz.cols - 1; j++) {
                frame.data[i][j] = matriz.data[i][j];
            }
       }
       // Adiciona as variáveis de folga
       for (var i = 0; i < frame.rows - 2; i++) {
           for (var j = matriz.cols - 1; j < frame.cols - 1; j++) {
               if (i == (j - (matriz.cols - 1))) {
                    frame.data[i][j] = 1;
               }
           }
       }
       // Adiciona as retrições
       for (var i = 0; i < matriz.rows - 1; i++)
            frame.data[i][frame.cols - 2] = matriz.data[i][matriz.cols - 1];
       // Adiciona tags para identificação da tabela
       for (var i = 0; i < frame.rows - 1; i++) {
            if (i < matriz.rows - 1)
                frame.data[i][frame.cols - 1] = "F" + (i + 1);
            else
                frame.data[i][frame.cols - 1] = "Z";
       }
       for (var i = 0; i < frame.cols - 1; i++) {
            if (i < matriz.cols - 1)
                frame.data[frame.rows - 1][i] = "X" + (i + 1);
            else if (i < frame.cols - 2)
                frame.data[frame.rows - 1][i] = "F" + ((i + 2) - matriz.cols);
            else
                frame.data[frame.rows - 1][i] = "B";
       }       
       frame.data[frame.rows - 1][frame.cols - 1] = "DLLN";
       return frame;
    }

    static generateNewSimplexFrame(simplex) {
        var frame = new Matriz(simplex.rows, simplex.cols);
        var pivoRow = simplex.getExitRow();
        if (pivoRow == -1)
            return frame;
        var pivoColumn = simplex.getEnterColumn();
        if (pivoColumn == -1)
            return frame;
        var pivoValue = simplex.getPivo();
        if (pivoValue == -1)
            return frame;
        var baseRow = [];
        for (var i = 0; i < simplex.cols; i++) {
            baseRow.push(simplex.data[pivoRow][i]);
        }
        for (var i = 0; i < baseRow.length - 1; i++) {
            baseRow[i] = baseRow[i] / pivoValue;
        }
        baseRow[baseRow.length - 1] = simplex.data[simplex.rows - 1][pivoColumn];
        frame.addRow(baseRow, pivoRow);
        for (var i = 0; i < simplex.rows - 1; i++) {
            if (i != pivoRow) {
                var newRow = [];
                for (var j = 0; j < simplex.cols - 1; j++) {
                    newRow.push(baseRow[j] * -simplex.data[i][pivoColumn] + simplex.data[i][j]);
                }
                newRow.push(simplex.data[i][simplex.cols - 1]);
                                
                frame.addRow(newRow, i);
            }
        }
        for (var i = 0; i < simplex.cols; i++)
            frame.data[frame.rows - 1][i] = simplex.data[simplex.rows - 1][i];
        return frame;
    }
}