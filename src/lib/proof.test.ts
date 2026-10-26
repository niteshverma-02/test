import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { proof, proofEngine } from "../content/proof.ts";
import { projects } from "../content/projects.ts";

// The evidence section is the site's credibility: every exhibit must point at a real screenshot.
test("every proof screenshot exists in public/", () => {
  const srcs = [...proof.map((p) => p.src), ...projects.flatMap((p) => p.evidence?.map((e) => e.src) ?? [])];
  for (const src of srcs) assert.ok(existsSync(`public${src}`), `missing ${src}`);
});

test("every proof item maps to an engine and has a unique id", () => {
  const ids = new Set(proof.map((p) => p.id));
  assert.equal(ids.size, proof.length);
  for (const p of proof) assert.ok(proofEngine[p.category], `no engine for ${p.category}`);
});
