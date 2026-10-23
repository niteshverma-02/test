import { test } from "node:test";
import assert from "node:assert/strict";
import { igHandle } from "./instagram.ts";

test("igHandle reads the profile name and rejects everything else", () => {
  assert.equal(igHandle("https://www.instagram.com/drjag_preet?igsh=MW1j"), "drjag_preet");
  assert.equal(igHandle("https://www.instagram.com/_.spacestyling._?igsh=x%3D"), "_.spacestyling._");
  assert.equal(igHandle("https://www.instagram.com/dr.ameesha_homoeopathy/"), "dr.ameesha_homoeopathy");
  assert.equal(igHandle("https://www.linkedin.com/in/dr-tanvi-gugale"), null);
  assert.equal(igHandle("https://evilinstagram.com/x"), null);
  assert.equal(igHandle("https://www.instagram.com/"), null);
  assert.equal(igHandle("not a url"), null);
});
