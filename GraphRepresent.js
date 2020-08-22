// Graph that be represented by adjacency matrix

class GraphByAdjacencyMatrix {
  constructor(v, directedGraph=false) {
    this.v = v; // number vertices
    this.directedGraph = directedGraph;
    this.adjMatrix = [];

    for (let i = 0; i < v; i++) {
      const row = new Array(v);

      this.adjMatrix.push(row.fill(0));
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
}

const graph = new GraphByAdjacencyMatrix(5);

graph.addEdge(0, 1);
graph.addEdge(0, 4);
graph.addEdge(1, 4);
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(3, 2);
graph.addEdge(3, 4);

graph.traverse();
