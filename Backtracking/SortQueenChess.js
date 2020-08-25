function listToString(list) {
  let res = '';

  for (let i = 1; i < list.length; i++) {
    res += `(${i}, ${list[i]})`;

    if (i < list.length - 1) {
      res += ' ';
    }
  }

  console.log(res);
}

function handler(
  i,
  n,
  EnWsFreeStatuses,
  EsWnFreeStatuses,
  columnFreeStatuses,
  columns
) {
  for (let j = 1; j <= n; j++) {
    if (columnFreeStatuses[j] && EnWsFreeStatuses[i + j] && EsWnFreeStatuses[i - j + n]) {
      columns[i] = j;
      if (i === n) {
        listToString(columns);
      } else {
        columnFreeStatuses[j] = false;
        EnWsFreeStatuses[i + j] = false;
        EsWnFreeStatuses[i - j + n] = false;
        handler(
          i + 1,
          n,
          EnWsFreeStatuses,
          EsWnFreeStatuses,
          columnFreeStatuses,
          columns,
        );
        columnFreeStatuses[j] = true;
        EnWsFreeStatuses[i + j] = true;
        EsWnFreeStatuses[i - j + n] = true;
      }
    }
  }
}

function sortQueenChess(n) {
  // EastNorth - WestSouth cross paths
  const EnWsFreeStatuses = new Array(2 * n + 1);

  // EastSouth - WestNorth cross paths
  const EsWnFreeStatuses = new Array(2 * n);

  const columnFreeStatuses = new Array(n + 1);

  const columns = new Array(n + 1);

  let i = 0;

  for (i = 0; i < EnWsFreeStatuses.length; i++) {
    EnWsFreeStatuses[i] = true;
  }

  for (i = 0; i < EsWnFreeStatuses.length; i++) {
    EsWnFreeStatuses[i] = true;
  }

  for (i = 0; i < columnFreeStatuses.length; i++) {
    columnFreeStatuses[i] = true;
  }

  handler(
    1,
    n,
    EnWsFreeStatuses,
    EsWnFreeStatuses,
    columnFreeStatuses,
    columns,
  );
}

sortQueenChess(5);
