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

    getEnterLine()
    {
        
    }

    addInput(arr, column) {
        for (var i = 0; i < arr.length; i++)
            this.data[column][i] = arr[i];
    }

    static generateSimplexFrame(matriz) {
       var frame = new Matriz(matriz.rows, (matriz.rows + matriz.cols) - 1);

       // Adiciona os valores iniciais
       for (var i = 0; i < frame.rows; i++) {
            for (var j = 0; j < matriz.cols - 1; j++) {
                frame.data[i][j] = matriz.data[i][j];
            }
       }

       // Adiciona as variáveis de folga
       for (var i = 0; i < frame.rows - 1; i++) {
           for (var j = matriz.cols - 1; j < frame.cols - 1; j++) {
               if (i == (j - (matriz.cols - 1))) {
                    frame.data[i][j] = 1;
               }
           }
       }

       // Adiciona as retrições
       for (var i = 0; i < matriz.rows - 1; i++)
            frame.data[i][frame.cols - 1] = matriz.data[i][matriz.cols - 1];

       return frame;
    }
}

//module.exports = Matriz;