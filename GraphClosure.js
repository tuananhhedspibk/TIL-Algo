// Graph that be represented by adjacency matrix

class GraphByAdjacencyMatrix {
  constructor(v, directedGraph=false) {
    this.v = v; // number vertices
    this.directedGraph = directedGraph;
    this.adjMatrix = [];
    this.closure = [];

    this.verticesFree = new Array(v);

    for (let i = 0; i < v; i++) {
      let row = new Array(v);
      row = row.fill(0);

      this.adjMatrix.push(row);
      row[i] = 1;
      this.closure.push(row);

      this.verticesFree[i] = true;
    }
  }

  addEdge(startPoint, endPoint, weight=1) {
    this.adjMatrix[startPoint][endPoint] = weight;
    if (!this.directedGraph) {
      this.adjMatrix[endPoint][startPoint] = weight;
    }
  }

  traverse() {
    for (let i = 0; i < this.v; i++) {
      for (let j = 0; j < this.v; j++) {
        process.stdout.write(`${this.adjMatrix[i][j]} `);
      }
      console.log();
    }
  }

  buildClosure () {
    for (let k = 0; k < this.v; k++) {
      for (let i = 0; i < this.v; i++) {
        for (let j = 0; j < this.v; j++) {
          if (this.adjMatrix[i][k] > 0
            && this.adjMatrix[k][j] > 0
            && this.closure[i][j] === 0
          ) {
            if (this.directedGraph) {
              this.closure[i][j] = this.adjMatrix[i][k] + this.adjMatrix[k][j];
            } else {
              this.closure[i][j] = 1;
            }
          }
        }
      }
    }
  }

  connectedCheck() {
    this.buildClosure();

    let connectedIngredientIdx = 1;

    for (let i = 0; i < this.v; i++) {
      if (this.verticesFree[i]) {
        console.log(`==> Connected Ingredient ${connectedIngredientIdx}`);
        this.verticesFree[i] = false;

        process.stdout.write(`${i} `);

        for (let j = 0; j < this.v; j++) {
          if (j !== i && this.closure[i][j] > 0) {
            process.stdout.write(`${j} `);
            this.verticesFree[j] = false;
          }
        }

        connectedIngredientIdx++;
        console.log();
      }
    }
  }
}

const graph = new GraphByAdjacencyMatrix(12);

graph.addEdge(0, 2);
graph.addEdge(0, 3);
graph.addEdge(0, 4);

graph.addEdge(1, 3);

graph.addEdge(5, 6);
graph.addEdge(5, 7);

graph.addEdge(8, 9);
graph.addEdge(8, 10);

graph.addEdge(10, 11);

graph.connectedCheck();
