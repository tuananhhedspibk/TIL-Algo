// Graph (undirected multigraph) that be represented by adjacency matrix

class GraphByAdjacencyMatrix {
  constructor(v, directedGraph=false) {
    this.v = v; // number vertices
    this.directedGraph = directedGraph;
    this.adjMatrix = [];
    this.verticesFree = [];

    this.verticesHamilton = new Array(v + 1); // used for finding hamilton circuit

    this.verticesHamilton = this.verticesHamilton.fill(-1);

    for (let i = 0; i < v; i++) {
      let row = new Array(v);

      this.adjMatrix.push(row.fill(0));
      this.verticesFree.push(true);
    }
  }

  addEdge(startPoint, endPoint, weight=1) {
    this.adjMatrix[startPoint][endPoint] += weight;
    if (!this.directedGraph) {
      this.adjMatrix[endPoint][startPoint] += weight;
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

  resetVerticesFree() {
    for (let i = 0; i < this.v; i++) {
      this.verticesFree[i] = true;
    }
  }

  printHamilTonCircuit() {
    for (let i = 0; i < this.v + 1; i++) {
      process.stdout.write(`${this.verticesHamilton[i]}`);

      if (i < this.v) {
        process.stdout.write(' -> ');
      } else {
        console.log();
      }
    }
  }

  findHamiltonHandler(i) {
    for (let j = 0; j < this.v; j++) {
      if (i !== j
        && this.verticesFree[j]
        && this.adjMatrix[this.verticesHamilton[i - 1]][j] > 0
      ) {
        this.verticesHamilton[i] = j;

        if (i < this.v - 1) {
          this.verticesFree[j] = false;
          this.findHamiltonHandler(i + 1);
          this.verticesFree[j] = true;
        } else if (i === this.v - 1) {
          if (this.adjMatrix[j][this.verticesHamilton[0]] > 0) {
            this.verticesHamilton[this.v] = this.verticesHamilton[0];
            this.printHamilTonCircuit();
          }
        }
      }
    }
  }

  findHamiltonCircuit() {
    this.verticesHamilton[0] = 0;
    this.verticesFree[0] = false;

    this.findHamiltonHandler(1);

    for (let i = 0; i < this.verticesFree; i++) {
      if (this.verticesFree[i]) {
        console.log('Can not find Hamilton circuit');
        break;
      }
    }
  }
}

const graph = new GraphByAdjacencyMatrix(5);

graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(0, 3);
graph.addEdge(0, 4);

graph.addEdge(1, 3);
graph.addEdge(1, 4);

graph.addEdge(2, 4);

graph.findHamiltonCircuit();
