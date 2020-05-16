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
}

module.exports = Matriz;