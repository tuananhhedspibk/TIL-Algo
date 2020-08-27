class Edge {
  constructor(startPoint, endPoint, weight=1, belongToSpanningTree=false) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.weight = weight;
    this.belongToSpanningTree = belongToSpanningTree;
  }
}

class Graph {
  constructor(v, e) {
    this.v = v; // number vertices
    this.e = e; // number edges
    this.edges = [];
    this.root = new Array(v);
    this.connected = false;

    this.root = this.root.fill(-1);
  }

  addEdge(startPoint, endPoint, weight=1) {
    const newEdge = new Edge(startPoint, endPoint, weight);

    this.edges.push(newEdge);
  }

  printOutEdges() {
    console.log(this.edges);
  }

  printOutSpanningTree() {
    if (!this.connected) {
      console.log('Can not find any kruskal here');
    } else {
      for (let i = 0; i < this.e; i++) {
        if (this.edges[i].belongToSpanningTree) {
          console.log(`(${this.edges[i].startPoint} - ${this.edges[i].endPoint})`);
        }
      }
    }
  }

  assignDataToEdge(edgeIdx, data) {
    this.edges[edgeIdx].startPoint = data.startPoint;
    this.edges[edgeIdx].endPoint = data.endPoint;
    this.edges[edgeIdx].belongToSpanningTree = data.belongToSpanningTree;
    this.edges[edgeIdx].weight = data.weight;
  }

  swapEdgesData(firstEdgeIdx, secondEdgeIdx) {
    let temp = {};

    temp.startPoint = this.edges[firstEdgeIdx].startPoint;
    temp.endPoint = this.edges[firstEdgeIdx].endPoint;
    temp.weight = this.edges[firstEdgeIdx].weight;
    temp.belongToSpanningTree = this.edges[firstEdgeIdx].belongToSpanningTree;

    this.edges[firstEdgeIdx].startPoint = this.edges[secondEdgeIdx].startPoint;
    this.edges[firstEdgeIdx].endPoint = this.edges[secondEdgeIdx].endPoint;
    this.edges[firstEdgeIdx].weight = this.edges[secondEdgeIdx].weight;
    this.edges[firstEdgeIdx].belongToSpanningTree =
      this.edges[secondEdgeIdx].belongToSpanningTree;

    this.edges[secondEdgeIdx].startPoint = temp.startPoint;
    this.edges[secondEdgeIdx].endPoint = temp.endPoint;
    this.edges[secondEdgeIdx].weight = temp.weight;
    this.edges[secondEdgeIdx].belongToSpanningTree = temp.belongToSpanningTree;
  }

  adjustEdgesHeap(firstIdx, lastIdx) {
    const firstEdgeData = {
      startPoint: this.edges[firstIdx].startPoint,
      endPoint: this.edges[firstIdx].endPoint,
      weight: this.edges[firstIdx].weight,
      belongToSpanningTree: this.edges[firstIdx].belongToSpanningTree,
    };

    while (2 * firstIdx + 1 < lastIdx) {
      let child = 2 * firstIdx + 1;

      if (child < lastIdx &&
        this.edges[child].weight > this.edges[child + 1].weight
      ) {
        child++;
      }

      if (this.edges[child].weight >= firstEdgeData.weight) {
        break;
      }

      this.assignDataToEdge(firstIdx, this.edges[child]);
      firstIdx = child;
    }

    this.assignDataToEdge(firstIdx, firstEdgeData);
  }

  getVerticeRoot(vertice) {
    if (this.root[vertice] < 0) {
      return vertice;
    }
    return this.root[vertice];
  }

  subGraphUnion(r1, r2) {
    const x = this.root[r1] + this.root[r2];
  
    if (this.root[r1] < this.root[r2]) {
      this.root[r1] = r2;
      this.root[r2] = x;
    } else {
      this.root[r2] = r1;
      this.root[r1] = x;
    }
  }

  getMinKruskalSpanning() {
    const n = this.e - 1;

    let spanningTreeEdgesCount = 0;

    for (let i = Math.floor(n / 2); i >= 0; i--) {
      this.adjustEdgesHeap(i, n);
    }
    for (let i = n; i >= 1; i--) {
      this.swapEdgesData(0, i);
      this.adjustEdgesHeap(0, i - 1);

      const r1 = this.getVerticeRoot(this.edges[i].startPoint);
      const r2 = this.getVerticeRoot(this.edges[i].endPoint);

      if (r1 !== r2) {
        this.edges[i].belongToSpanningTree = true;

        spanningTreeEdgesCount++;

        if (spanningTreeEdgesCount === this.v - 1) {
          this.connected = true;
          break;
        }

        this.subGraphUnion(r1, r2);
      }
    }
    this.printOutSpanningTree();
  }
}

const graph = new Graph(6, 9);

graph.addEdge(0, 1, 1);
graph.addEdge(0, 2, 1);

graph.addEdge(1, 2, 2);
graph.addEdge(1, 3, 1);
graph.addEdge(1, 4, 1);

graph.addEdge(2, 4, 1);
graph.addEdge(2, 5, 1);

graph.addEdge(3, 4, 2);
graph.addEdge(4, 5, 2);

graph.getMinKruskalSpanning();
