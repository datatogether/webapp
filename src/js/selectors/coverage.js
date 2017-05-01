

export function selectNode(state,id) {
  const { tree } = state.coverage;
  let node;
  walk(tree, (n) => {
    if (n && n.id == id) {
      node = n;
    }
  });
  return node;
}

// walk a provide tree, calling fn on each node
// if fn returns a falsy value walk will halt
// and return the current node
export function walk(tree, fn) {
  if (!tree) { return }
  fn(tree)
  if (tree.children) {
    tree.children.forEach((c) => {
      walk(c,fn)
    })
  }
}

export function flattenTree(tree) {
  let links = [], nodes = [];

  if (tree == undefined) {
    return {
      links,
      nodes
    };
  }

  // console.log(tree);

  walk(tree,(n) => {
    nodes.push({
      id : n.id,
      name: n.name,
      radius: 5,
      numDescendants: n.numDescendants,
      numDescendantsArchived: n.numDescendantsArchived,
      numChildren: n.numChildren,
      coverage: n.coverage,
      collapsed: n.collapsed,
    });

    if (n.children) {
      n.children.forEach((c) => {
        links.push({
          source: n.id,
          target: c.id,
        });
      })
    }

    return true;
  });

  // console.log(nodes);
  // console.log(links);

  return {
    // links: [{ source : "root", target: "200095a1-a38b-41ee-abd9-1b929eec9808"}],
    links,
    nodes,
  }  
}