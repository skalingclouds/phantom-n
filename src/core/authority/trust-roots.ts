/**
 * Standing-grant trust roots — V3.10 Track B (unit B-U1). CODEOWNERS-protected.
 *
 * The ONLY keys whose signature can raise autonomous authority. Each is the
 * public half of a Secure Enclave P-256 key created by `ashlr-custody init`
 * on the repo owner's Mac: the private half cannot leave the Secure Enclave
 * and every signature needs Touch ID (or the login password).
 *
 * HOW A KEY GETS HERE: the owner runs `ashlr authority setup` (or
 * `ashlr-custody init`), which prints `{keyId, publicKeyPem}`, and commits it
 * to this file in their own pull request. That PR touches a Tier-1 protected
 * path, so the fleet can never author or merge it (gate G1 routes it to the
 * owner lane, CODEOWNERS requires the owner's review).
 *
 * NOTHING ELSE ADDS TRUST. No environment variable, config key, CLI flag or
 * file (not ~/.ashlr/activation/trust-roots.json, not ~/.ashlr/authority/*)
 * is ever read as a root — test/authority-no-file-trust-310b.test.ts pins
 * that statically and behaviourally.
 *
 * The August "mason-workstation" ed25519 key is BURNED: its private half sat
 * in a 0600 file every unconfined agent could read. It can never appear here:
 * roots are ES256 (P-256) only, the verifier rejects any other key type, and
 * its key id is on the refusal list below.
 */
import type { StandingGrantTrustRoot } from './types.js';

/**
 * This fork's trust root (Phase 0): chrisskaling's own custody key, created
 * on this Mac via `ashlr authority setup`. Replaces the upstream
 * ashlrai/phantom root (Mason Wyatt's key, se-p256-9c1330e3bd72cf3e), which
 * was inherited unmodified when this repo was forked and has no authority
 * over this fork's agents or repos.
 */
export const STANDING_GRANT_TRUST_ROOTS: readonly Readonly<StandingGrantTrustRoot>[] = Object.freeze([
  Object.freeze({
    keyId: 'se-p256-34ebbfc66126cfee',
    alg: 'ES256' as const,
    publicKeyPem: '-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEozkoMHf1KfxlwU5QgY/LuI7xaXOm\nQYMpViPa/Trh70I7g9R/fBOsqKb1dJa7IKxuCxfbe+NM2Og5jbMWLsD2Bg==\n-----END PUBLIC KEY-----\n',
  }),
]);

/**
 * Key ids that must never be trusted again, even if a root with the id were
 * pasted in. A root set containing one is invalid as a whole (fail closed),
 * so the mistake is loud instead of silently skipped.
 */
export const BURNED_KEY_IDS: readonly string[] = Object.freeze(['mason-workstation']);
