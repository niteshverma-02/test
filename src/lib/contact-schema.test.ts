import { test } from "node:test";
import assert from "node:assert/strict";
import { contactSchema } from "./contact-schema.ts";

const base = { name: "Dr. Jane", email: "jane@clinic.com", topic: "web", message: "My clinic does not show up on Google Maps." };

// The API silently drops honeypot hits; that only works if the schema lets them through.
test("a filled honeypot still parses, so the API can drop it quietly", () => {
  assert.equal(contactSchema.safeParse({ ...base, company: "spam inc" }).success, true);
});

test("real messages are validated", () => {
  assert.equal(contactSchema.safeParse(base).success, true);
  assert.equal(contactSchema.safeParse({ ...base, email: "nope" }).success, false);
  assert.equal(contactSchema.safeParse({ ...base, message: "too short" }).success, false);
});
