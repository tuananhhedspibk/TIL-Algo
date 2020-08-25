// Graph (undirected multigraph) that be represented by adjacency matrix

class GraphByAdjacencyMatrix {
  constructor(v, directedGraph=false) {
    this.v = v; // number vertices
    this.directedGraph = directedGraph;
    this.adjMatrix = [];
    this.verticesFree = [];

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

  canGoBack(startPoint, endPoint) {
    this.resetVerticesFree();

    const queue = [];
    queue.push(endPoint);

    this.adjMatrix[startPoint][endPoint] -= 1;
    this.adjMatrix[endPoint][startPoint] -= 1;
    this.verticesFree[endPoint] = false;

    while(queue.length > 0) {
      const u = queue.pop();

      for (let i = 0; i < this.v; i++) {
        if (this.adjMatrix[u][i] > 0 && this.verticesFree[i]) {
          queue.push(i);
          this.verticesFree[i] = false;
        }
      }
    }

    this.adjMatrix[startPoint][endPoint] += 1;
    this.adjMatrix[endPoint][startPoint] += 1;

    return !this.verticesFree[startPoint];
  }

  findEulerCircuit() {
    let nextVertice = 0;
    let currentVertice = 0;

    process.stdout.write(`${currentVertice}`);

    while (nextVertice !== -1) {
      nextVertice = -1;
      
      for (let i = 0; i < this.v; i++) {
        if (i !== currentVertice && this.adjMatrix[currentVertice][i] > 0) {
          nextVertice = i;
          if (this.canGoBack(currentVertice, nextVertice)) {
            break;
          }
        }
      }

      if (nextVertice !== -1) {
        process.stdout.write(` -> ${nextVertice}`);

        this.adjMatrix[currentVertice][nextVertice] -= 1;
        this.adjMatrix[nextVertice][currentVertice] -= 1;
      
        currentVertice = nextVertice;
      }
    }

    console.log();
  }
}

// const graph = new GraphByAdjacencyMatrix(4);

// graph.addEdge(0, 1);
// graph.addEdge(0, 2);
// graph.addEdge(0, 3);

// graph.addEdge(1, 2);

// graph.addEdge(2, 0);
// graph.addEdge(2, 3);

// graph.findEulerCircuit();

const graph = new GraphByAdjacencyMatrix(8);

graph.addEdge(0, 1);
graph.addEdge(0, 2);

graph.addEdge(1, 3);

graph.addEdge(2, 3);

graph.addEdge(3, 4);
graph.addEdge(3, 5);

graph.addEdge(4, 6);

graph.addEdge(5, 7);

graph.addEdge(6, 7);

graph.findEulerCircuit();
