// Graph (undirected multigraph) that be represented by adjacency matrix

class GraphByAdjacencyMatrix {
  constructor(v, directedGraph=false) {
    this.v = v; // number vertices
    this.directedGraph = directedGraph;
    this.adjMatrix = [];

    this.verticesFree = new Array(v);
    this.distances = new Array(v);
    this.trace = new Array(v);

    this.distances = this.distances.fill(9999);
    this.verticesFree = this.verticesFree.fill(true);
    this.trace = this.trace.fill(-1);

    for (let i = 0; i < v; i++) {
      let row = new Array(v);

      this.adjMatrix.push(row.fill(0));
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

  printShortestPath(startPoint, endPoint) {
    let u = endPoint;

    process.stdout.write(`${endPoint} <- `);

    while(true) {
      if (this.trace[u] === startPoint) {
        process.stdout.write(`${this.trace[u]}`);
      } else {
        process.stdout.write(`${this.trace[u]} <- `);
      }

      u = this.trace[u];

      if (u === startPoint) {
        break;
      }
    }
  }

  findShortestPathBetween(startPoint, endPoint) {
    let u = -1;
    let minDistance = 9999;

    this.distances[startPoint] = 0;

    while(true) {
      u = -1;
      minDistance = 9999;

      for (let i = 0; i < this.v; i++) {
        if (this.distances[i] < minDistance && this.verticesFree[i]) {
          minDistance = this.distances[i];
          u = i;
        }
      }

      if (u === -1 || u === endPoint) {
        break;
      }

      this.verticesFree[u] = false;

      for (let i = 0; i < this.v; i++) {
        if ((this.adjMatrix[u][i] + this.distances[u] < this.distances[i])
          && this.verticesFree[i]
          && this.adjMatrix[u][i] > 0
        ) {
          this.distances[i] = this.adjMatrix[u][i] + this.distances[u];
          this.trace[i] = u;
        }
      }
    }

    if (u === -1) {
      console.log(`Not found any path from ${startPoint} to ${endPoint}`);
    } else if (u === endPoint) {
      this.printShortestPath(startPoint, endPoint);
    }
  }
}

const graph = new GraphByAdjacencyMatrix(6);

graph.addEdge(0, 1, 4);
graph.addEdge(0, 2, 2);

graph.addEdge(1, 2, 1);
graph.addEdge(1, 3, 5);

graph.addEdge(2, 3, 8);
graph.addEdge(2, 4, 10);

graph.addEdge(3, 4, 2);
graph.addEdge(3, 5, 6);

graph.addEdge(4, 5, 5);

graph.findShortestPathBetween(0, 5);
