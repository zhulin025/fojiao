import assert from "node:assert/strict";
import { articles } from "../src/data.js";
import {
  childrenOf,
  findMapPath,
  mapSources,
  mapViews,
  mindmapNodes,
} from "../src/mindmapData.js";

const articleIds = new Set(articles.map((article) => article.id));
for (const node of Object.values(mindmapNodes)) {
  assert.equal(node.id in mindmapNodes, true);
  assert.ok(
    node.origin && node.practice && node.kind,
    `Missing explanation: ${node.id}`,
  );
  for (const id of node.children)
    assert.ok(mindmapNodes[id], `Missing child ${id}`);
  for (const [id] of node.links || [])
    assert.ok(mindmapNodes[id], `Missing cross-link ${id}`);
  assert.ok(node.sources.length, `Missing source: ${node.id}`);
  for (const id of node.sources) {
    assert.ok(mapSources[id], `Missing source ${id}`);
    assert.equal(new URL(mapSources[id][1]).protocol, "https:");
  }
  if (node.article)
    assert.ok(articleIds.has(node.article), `Missing article ${node.article}`);
  assert.ok(findMapPath(node.id), `Unreachable node: ${node.id}`);
}
for (const view of mapViews) {
  const visit = (id, ancestors = []) => {
    assert.ok(mindmapNodes[id], `Missing node in ${view.id}: ${id}`);
    assert.equal(ancestors.includes(id), false, `Cycle in ${view.id}: ${id}`);
    const children = childrenOf(id, view);
    assert.equal(
      new Set(children).size,
      children.length,
      `Duplicate siblings: ${id}`,
    );
    children.forEach((child) => visit(child, [...ancestors, id]));
  };
  visit(view.root);
  view.expanded.forEach((id) =>
    assert.ok(
      findMapPath(id, view.root, view),
      `Invisible initial branch ${id}`,
    ),
  );
}
assert.equal(mindmapNodes.china.children.length, 8);
assert.equal(mindmapNodes["cn-chan"].children.length, 5);
assert.equal(mindmapNodes["jp-nara"].children.length, 6);
assert.equal(mindmapNodes["jp-rinzai"].children.length, 14);
const zen = mapViews.find((view) => view.id === "zen");
assert.deepEqual(findMapPath("jp-rinzai", zen.root, zen), [
  "cn-chan",
  "cn-linji",
  "jp-rinzai",
]);
assert.deepEqual(findMapPath("jp-obaku", zen.root, zen), [
  "cn-chan",
  "cn-linji",
  "jp-obaku",
]);
assert.deepEqual(findMapPath("jp-soto", zen.root, zen), [
  "cn-chan",
  "cn-caodong",
  "jp-soto",
]);
const transmission = mapViews.find((view) => view.id === "transmission");
assert.deepEqual(findMapPath("jp-tendai", transmission.root, transmission), [
  "china",
  "cn-tiantai",
  "jp-tendai",
]);
assert.deepEqual(findMapPath("jp-shin", transmission.root, transmission), [
  "china",
  "cn-pure",
  "jp-jodo",
  "jp-shin",
]);
console.log(
  `Content checks passed: ${Object.keys(mindmapNodes).length} nodes, ${mapViews.length} views, valid sources and article links, no cycles.`,
);
