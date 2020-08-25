// Graph that be represented by adjacency matrix

class GraphByAdjacencyMatrix {
  constructor(v, directedGraph=false) {
    this.v = v; // number vertices
    this.directedGraph = directedGraph;
    this.adjMatrix = [];
    this.verticesQueue = []; // queue for BFS

    this.verticesFree = new Array(v); // vertice free statuses
    this.trace = new Array(v); // tracing array for Graph Search

    for (let i = 0; i < v; i++) {
      const row = new Array(v);

      this.adjMatrix.push(row.fill(0));
      this.verticesFree[i] = true;
      this.trace[i] = -1;
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

  DFSHandler(startPoint) {
    for (let i = 0; i < this.v; i++) {
      if (this.adjMatrix[startPoint][i] !== 0 && this.verticesFree[i]) {
        this.verticesFree[i] = false;
        this.trace[i] = startPoint;

        this.DFSHandler(i);
      }
    }
  }

  printPathSearchResult(searchAlgo, startPoint, endPoint) {
    if (this.verticesFree[endPoint]) {
      console.log(`Not found any paths from ${startPoint} to ${endPoint}`);
    } else {
      let pivot = endPoint;

      console.log(`${searchAlgo} path:`);

      while(true) {
        process.stdout.write(`${pivot}`);
        if (pivot !== startPoint) {
          process.stdout.write(' <- ');
        } else {
          console.log();
          break;
        }
        pivot = this.trace[pivot];
      }
    }
  }

  printConnectedIngredient(startPoint) {
    console.log(`From ${startPoint} you can visit:`);

    for (let i = 0; i < this.v; i++) {
      if (this.trace[i] > -1) {
        process.stdout.write(`${i} `);
      }
    }
    
    console.log();
  }

  refreshVerticesFree() {
    for (let i = 0; i < this.v; i++) {
      this.verticesFree[i] = true;
    }
  }

  refreshTrace() {
    for (let i = 0; i < this.v; i++) {
      this.trace[i] = -1;
    }
  }

  DFS(startPoint, endPoint, needRefresh=true) {
    if (needRefresh) {
      this.refreshVerticesFree();
      this.refreshTrace();
    }

    this.trace[startPoint] = startPoint;
    this.verticesFree[startPoint] = false;

    this.DFSHandler(startPoint);

    if (endPoint > - 1) {
      this.printPathSearchResult('DFS', startPoint, endPoint);
    } else {
      this.printConnectedIngredient(startPoint);
    }
  }

  BFS(startPoint, endPoint, needRefresh=true) {
    if (needRefresh) {
      this.refreshVerticesFree();
      this.refreshTrace();
    }

    this.trace[startPoint] = startPoint;
    this.verticesFree[startPoint] = false;
    this.verticesQueue = [];

    this.verticesQueue.push(startPoint);

    while(this.verticesQueue.length > 0) {
      const u = this.verticesQueue.pop();

      for (let i = 0; i < this.v; i++) {
        if (this.verticesFree[i] && this.adjMatrix[u][i] > 0) {
          this.trace[i] = u;
          this.verticesFree[i] = false;
          this.verticesQueue.push(i);
        }
      }
    }

    if (endPoint > - 1) {
      this.printPathSearchResult('BFS', startPoint, endPoint);
    } else {
      this.printConnectedIngredient(startPoint);
    }
  }

  connectedCheck() {
    let connectedIngredientIdx = 1;

    this.refreshVerticesFree();

    for (let i = 0; i < this.v; i++) {
      if (this.verticesFree[i]) {
        this.refreshTrace();
        console.log(`==> Connected Ingredient ${connectedIngredientIdx}`);
        this.DFS(i, -1, false);
        connectedIngredientIdx += 1;
      }
    }
  }
}

const graph = new GraphByAdjacencyMatrix(8);

graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 5);
graph.addEdge(6, 7);

graph.connectedCheck();
