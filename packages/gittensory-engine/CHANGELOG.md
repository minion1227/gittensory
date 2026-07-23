# Changelog

## [1.0.0](https://github.com/minion1227/gittensory/compare/engine-v0.2.0...engine-v1.0.0) (2026-07-23)


### ⚠ BREAKING CHANGES

* **engine:** bound miner-goal-spec list scanning, remove the orphaned duplicate parser ([#4318](https://github.com/minion1227/gittensory/issues/4318))

### Features

* **commands:** add the maintainer-only [@gittensory](https://github.com/gittensory) generate-tests command ([#4211](https://github.com/minion1227/gittensory/issues/4211)) ([e3b83c8](https://github.com/minion1227/gittensory/commit/e3b83c8e9cd4e6b5912b279f5119229605eaf484))
* **config:** add review.shared_config operator overlay ([#2046](https://github.com/minion1227/gittensory/issues/2046)) ([#3995](https://github.com/minion1227/gittensory/issues/3995)) ([b13b478](https://github.com/minion1227/gittensory/commit/b13b4783d13c596c67427bd3cde73add04fd0df4))
* **engine:** extract buildIssueRagQuery to gittensory-engine ([#4342](https://github.com/minion1227/gittensory/issues/4342)) ([c823f9c](https://github.com/minion1227/gittensory/commit/c823f9c5cf59fb8d596f3c93f1749127622b25a8)), closes [#4254](https://github.com/minion1227/gittensory/issues/4254)
* **engine:** extract computeLocalScorerTokens to gittensory-engine ([#4371](https://github.com/minion1227/gittensory/issues/4371)) ([d276cde](https://github.com/minion1227/gittensory/commit/d276cde5ea21214b45b67a3567a2ab4289a1298a)), closes [#4253](https://github.com/minion1227/gittensory/issues/4253)
* **engine:** extract isFailingCheckSummary to gittensory-engine ([#4256](https://github.com/minion1227/gittensory/issues/4256)) ([#4377](https://github.com/minion1227/gittensory/issues/4377)) ([1eeef60](https://github.com/minion1227/gittensory/commit/1eeef606207657773734a5291ad9cbc23e7206ed))
* **engine:** extract path-matchers.ts's pure classifier family to gittensory-engine ([#4252](https://github.com/minion1227/gittensory/issues/4252)) ([#4444](https://github.com/minion1227/gittensory/issues/4444)) ([6a4f54c](https://github.com/minion1227/gittensory/commit/6a4f54cc5b950b7b5293599340374fb882814725))
* **governor:** add budget/turn/termination cap calculator ([#4374](https://github.com/minion1227/gittensory/issues/4374)) ([c8f8316](https://github.com/minion1227/gittensory/commit/c8f83165f59458c83d1d7f72c853c0420d268ab5)), closes [#4288](https://github.com/minion1227/gittensory/issues/4288)
* **miner-concurrency:** add git-worktree-per-attempt pool allocator ([#4297](https://github.com/minion1227/gittensory/issues/4297)) ([#4598](https://github.com/minion1227/gittensory/issues/4598)) ([14c3a25](https://github.com/minion1227/gittensory/commit/14c3a2590afa54351863458f3fbd45e56cf70b4a))
* **miner-config:** parse a feasibilityGate policy block from .gittensory-miner.yml ([a6c33b6](https://github.com/minion1227/gittensory/commit/a6c33b69a8bdec80251dd676d7531c68a4319aa4))
* **miner-config:** parse a feasibilityGate policy block from .gittensory-miner.yml ([#4275](https://github.com/minion1227/gittensory/issues/4275)) ([f044dc5](https://github.com/minion1227/gittensory/commit/f044dc5144ecd44915d4597e5df9a8cbeae67a52))
* **miner-discovery-plane:** add anonymized telemetry event schema for the hosted plane ([#4301](https://github.com/minion1227/gittensory/issues/4301)) ([#4438](https://github.com/minion1227/gittensory/issues/4438)) ([4daceaa](https://github.com/minion1227/gittensory/commit/4daceaaa16da484d4eb55972bba0dff037fdd918))
* **miner-discovery-plane:** add the client-side soft-claim coordination request builder ([#4443](https://github.com/minion1227/gittensory/issues/4443)) ([58e08e9](https://github.com/minion1227/gittensory/commit/58e08e9a352bc7ad3082218fb22fc0b30db644e5)), closes [#4302](https://github.com/minion1227/gittensory/issues/4302)
* **miner-discovery-plane:** define the public-data-only discovery-index API contract ([#4436](https://github.com/minion1227/gittensory/issues/4436)) ([e021f2a](https://github.com/minion1227/gittensory/commit/e021f2a06deca542ecd0ff6e448a6310d86d7694)), closes [#4300](https://github.com/minion1227/gittensory/issues/4300)
* **miner-foundation:** extract reward-risk scoring into gittensory-engine ([#2281](https://github.com/minion1227/gittensory/issues/2281)) ([#3985](https://github.com/minion1227/gittensory/issues/3985)) ([bf4e4fa](https://github.com/minion1227/gittensory/commit/bf4e4fa146bc3365296093859c16b825bdc3fde9))
* **miner-hands:** add coding-agent dry-run mode and driver seam ([#4313](https://github.com/minion1227/gittensory/issues/4313)) ([#4347](https://github.com/minion1227/gittensory/issues/4347)) ([feb2ba8](https://github.com/minion1227/gittensory/commit/feb2ba8a2d60c03da84160364761f8eda6fbfb9f))
* **miner-hands:** add driver attempt log persistence and JSONL export ([#4294](https://github.com/minion1227/gittensory/issues/4294)) ([#4576](https://github.com/minion1227/gittensory/issues/4576)) ([97e91d4](https://github.com/minion1227/gittensory/commit/97e91d44b4a30302acf8d82292c4ec7c6e028fa8))
* **miner-hands:** add pure per-attempt cost/turn metering to gittensory-engine ([564a27c](https://github.com/minion1227/gittensory/commit/564a27c8cf7694bbd49aa140870f187b42e6d877))
* **miner-hands:** add pure per-attempt cost/turn metering to gittensory-engine ([d928849](https://github.com/minion1227/gittensory/commit/d9288498b795c0a611ccfaf815b3000d781bf4f5)), closes [#4311](https://github.com/minion1227/gittensory/issues/4311)
* **miner-hands:** add shared subprocess redaction/env-allowlist helper to gittensory-engine ([#4284](https://github.com/minion1227/gittensory/issues/4284)) ([9796e9c](https://github.com/minion1227/gittensory/commit/9796e9c282b8bfa6fde5d19a7be71c1147505ce3))
* **miner-hands:** add shared subprocess redaction/env-allowlist helper to gittensory-engine ([#4284](https://github.com/minion1227/gittensory/issues/4284)) ([eaea6c9](https://github.com/minion1227/gittensory/commit/eaea6c9edbb6141cc7452c7666f72764e30a05ec))
* **miner-hands:** Agent-SDK CodingAgentDriver (query() loop) ([#4548](https://github.com/minion1227/gittensory/issues/4548)) ([8f492f2](https://github.com/minion1227/gittensory/commit/8f492f226207aec9ec6cb3069c5fe553caa53b1e))
* **miner-hands:** CLI-subprocess CodingAgentDriver ([#4531](https://github.com/minion1227/gittensory/issues/4531)) ([b7a4477](https://github.com/minion1227/gittensory/commit/b7a4477f7e4caa2d8cd9963355b31237e391e942)), closes [#4266](https://github.com/minion1227/gittensory/issues/4266)
* **miner-hands:** CodingAgentDriver factory + provider-style config resolution ([#4289](https://github.com/minion1227/gittensory/issues/4289)) ([#4633](https://github.com/minion1227/gittensory/issues/4633)) ([30b62ae](https://github.com/minion1227/gittensory/commit/30b62ae47707f049851dfdaa7c917e6ea2e48465))
* **miner-hands:** compose an immutable per-attempt acceptance-criteria document ([#4449](https://github.com/minion1227/gittensory/issues/4449)) ([861e8b7](https://github.com/minion1227/gittensory/commit/861e8b710fc0d25990dc5be39f98a840bee11db5)), closes [#4271](https://github.com/minion1227/gittensory/issues/4271)
* **miner-hands:** git-worktree-per-attempt isolation primitive ([#4547](https://github.com/minion1227/gittensory/issues/4547)) ([69bd6c2](https://github.com/minion1227/gittensory/commit/69bd6c2626c268378883878a6defef57f453ebac)), closes [#4269](https://github.com/minion1227/gittensory/issues/4269)
* **miner-hands:** lint-guarded edit wrapper for coding-agent drivers ([#4276](https://github.com/minion1227/gittensory/issues/4276)) ([#4486](https://github.com/minion1227/gittensory/issues/4486)) ([ed96eca](https://github.com/minion1227/gittensory/commit/ed96eca6435a6787d99f7633795992bcbb97f01b))
* **miner-hands:** tree-sitter-based repo map builder ([#4542](https://github.com/minion1227/gittensory/issues/4542)) ([604d971](https://github.com/minion1227/gittensory/commit/604d9714b2df551bc75aeb6d8617be3b91ec57a4)), closes [#4280](https://github.com/minion1227/gittensory/issues/4280)
* **miner-plan:** issue-to-plan decomposition heuristic ([#4292](https://github.com/minion1227/gittensory/issues/4292)) ([#4339](https://github.com/minion1227/gittensory/issues/4339)) ([e580525](https://github.com/minion1227/gittensory/commit/e58052599b290df32aa4e85cbc7f4118e49476c9))
* **miner-portfolio:** add pure non-convergence detector to gittensory-engine ([4ce12f8](https://github.com/minion1227/gittensory/commit/4ce12f86856c5d44c9a938ed360a545716a69148))
* **miner-portfolio:** add pure non-convergence detector to gittensory-engine ([883c333](https://github.com/minion1227/gittensory/commit/883c3337b499145aba3171c5717b76ce65242479)), closes [#4286](https://github.com/minion1227/gittensory/issues/4286)
* **miner-scale:** add fleet run-manifest for multi-repo worktree scheduling ([4cf2adb](https://github.com/minion1227/gittensory/commit/4cf2adb4151265f54c01350b71f33e40b420e7be))
* **miner-scale:** add fleet run-manifest for multi-repo worktree scheduling ([e6ef86c](https://github.com/minion1227/gittensory/commit/e6ef86cf055c06c65a7d4162debc04c841667a96)), closes [#4299](https://github.com/minion1227/gittensory/issues/4299)
* **miner-selfimprove:** calibration accuracy-trend view over a snapshot series ([#4639](https://github.com/minion1227/gittensory/issues/4639)) ([2e9bbb6](https://github.com/minion1227/gittensory/commit/2e9bbb60910e2c6110a07356a58aeca6d73889e5)), closes [#4268](https://github.com/minion1227/gittensory/issues/4268)
* **miner-selfimprove:** engine-parity drift detector ([#4260](https://github.com/minion1227/gittensory/issues/4260)) ([06ce0a1](https://github.com/minion1227/gittensory/commit/06ce0a162ea54d61552408e721f39dc0a6e56250))
* **miner-selfimprove:** engine-parity drift detector ([#4260](https://github.com/minion1227/gittensory/issues/4260)) ([df22953](https://github.com/minion1227/gittensory/commit/df229537c83c3ad3c178aba9b218078a3c245a63))
* **miner-selfimprove:** read-only calibration dashboard view ([#4504](https://github.com/minion1227/gittensory/issues/4504)) ([363305c](https://github.com/minion1227/gittensory/commit/363305c297971ba2df99d710046b3584994b0cea)), closes [#4261](https://github.com/minion1227/gittensory/issues/4261)
* **miner-selfimprove:** render prediction-calibration Prometheus metrics ([#4461](https://github.com/minion1227/gittensory/issues/4461)) ([da9952f](https://github.com/minion1227/gittensory/commit/da9952f13d6b65bce22e18d7b562684736affcdd)), closes [#4264](https://github.com/minion1227/gittensory/issues/4264)
* **notifications:** config-as-code overrides for the maintainer recap cadence ([d38239a](https://github.com/minion1227/gittensory/commit/d38239a9e2d7687cbe83bb6bb898b0b62c82cc6f))
* **notifications:** config-as-code overrides for the maintainer recap cadence ([6773ff8](https://github.com/minion1227/gittensory/commit/6773ff8cbb3c32ee98c7e16cf68107137f59969b))
* **review:** add gate.copycat.mode config scaffold for copycat detection ([#4140](https://github.com/minion1227/gittensory/issues/4140)) ([f46aa4a](https://github.com/minion1227/gittensory/commit/f46aa4aa94fcbda57a4da816de450b61a9e3ad65))
* **review:** add per-repo review.selftune force-off for the auto-tune cron ([#4118](https://github.com/minion1227/gittensory/issues/4118)) ([02ea67d](https://github.com/minion1227/gittensory/commit/02ea67d7baac46ab705c2e875e2b2fa55ec0705e))
* **review:** add REES complexity and Go/Python error-defect analyzers ([#4155](https://github.com/minion1227/gittensory/issues/4155)) ([f5c5c52](https://github.com/minion1227/gittensory/commit/f5c5c5237da04910688369dbf0cf2a1d9371593e))
* **review:** add review.visual.enabled config-as-code toggle ([#4093](https://github.com/minion1227/gittensory/issues/4093)) ([92dfae1](https://github.com/minion1227/gittensory/commit/92dfae1bdf18e4d5b38352a701f09dbadccd23fe))
* **review:** GitHub-Actions build-and-serve visual-capture fallback ([#4131](https://github.com/minion1227/gittensory/issues/4131)) ([ec74858](https://github.com/minion1227/gittensory/commit/ec7485892023a7de660c6bd98295d6c34d5a2c9f))
* **review:** let a bot-captured before/after satisfy the screenshot-table gate ([#4128](https://github.com/minion1227/gittensory/issues/4128)) ([c2c6eb3](https://github.com/minion1227/gittensory/commit/c2c6eb3a378b6d17d02e8b59518ef72649cdbbac))
* **review:** migrate grounding onto the per-repo feature-activation resolver ([#4117](https://github.com/minion1227/gittensory/issues/4117)) ([3cfe2a9](https://github.com/minion1227/gittensory/commit/3cfe2a93ef29d97d8cfc66ed16173351026e27f2))
* **review:** one-shot AI review cadence, configurable globally + per repo ([#4657](https://github.com/minion1227/gittensory/issues/4657)) ([aa1ffb8](https://github.com/minion1227/gittensory/commit/aa1ffb8ff46c80e71bba1046cb4156a4e43ed68a))
* **review:** per-repo opt-in to let a confident AI-judgment blocker gate the merge ([#4171](https://github.com/minion1227/gittensory/issues/4171)) ([4664ad2](https://github.com/minion1227/gittensory/commit/4664ad25f4c729ded6a37c3d5d6d5a56857d73e7))
* **review:** push generated E2E tests as a real PR-branch commit ([#4197](https://github.com/minion1227/gittensory/issues/4197), [#4201](https://github.com/minion1227/gittensory/issues/4201)) ([#4245](https://github.com/minion1227/gittensory/issues/4245)) ([7b35640](https://github.com/minion1227/gittensory/commit/7b35640a4dabf934fbb51e693cdec4f7fbd1ded1))
* **review:** register e2eTests as the sixth converged-feature key ([#4206](https://github.com/minion1227/gittensory/issues/4206)) ([0cb6854](https://github.com/minion1227/gittensory/commit/0cb6854aef4d54a98f3e2e978dcfc451d273e7b9))
* **review:** reuse review.instructions/pathInstructions for E2E test generation ([#4208](https://github.com/minion1227/gittensory/issues/4208)) ([24d058a](https://github.com/minion1227/gittensory/commit/24d058a5b9986730abf8abe42bbdc188c011ac07))
* **review:** viewport x theme completeness matrix for the screenshot-table gate ([#4545](https://github.com/minion1227/gittensory/issues/4545)) ([afd731e](https://github.com/minion1227/gittensory/commit/afd731ec57833a3ab6b88c56f4d7cfca8bcdbf94))
* **review:** vision-verify screenshot-table PRs with the local VLM ([#4691](https://github.com/minion1227/gittensory/issues/4691)) ([269dbd7](https://github.com/minion1227/gittensory/commit/269dbd772f17074f6d9999a7895594d75236fe1a))
* **review:** wire linked-issue satisfaction into the deterministic gate ([#4069](https://github.com/minion1227/gittensory/issues/4069)) ([3356fc6](https://github.com/minion1227/gittensory/commit/3356fc60533c771df0363e766354bfbfbe1150c7))
* **selfhost:** local-inference binding for advisory-tier AI capabilities (AI_ADVISORY) ([#4388](https://github.com/minion1227/gittensory/issues/4388)) ([dc37aea](https://github.com/minion1227/gittensory/commit/dc37aea37d204dea7071422ba7311a1e252abf44))
* **selfhost:** support per-repo model overrides for ollama/openai/anthropic providers ([#3965](https://github.com/minion1227/gittensory/issues/3965)) ([583e7b2](https://github.com/minion1227/gittensory/commit/583e7b252349313815259738c2bafc4125937e50)), closes [#3902](https://github.com/minion1227/gittensory/issues/3902)
* **settings:** per-repo override of the global agent-freeze kill-switch ([#4375](https://github.com/minion1227/gittensory/issues/4375)) ([1b6fa8c](https://github.com/minion1227/gittensory/commit/1b6fa8c3ecf78261daf6c3dcbad927ad60a2a5df))


### Fixes

* **#4260:** rebase on main and address review blockers ([f256671](https://github.com/minion1227/gittensory/commit/f25667101f1a2c1091565ce373b50b308dfb0f02))
* **engine:** bound miner-goal-spec list scanning, remove the orphaned duplicate parser ([#4318](https://github.com/minion1227/gittensory/issues/4318)) ([d329591](https://github.com/minion1227/gittensory/commit/d329591ce287e11a91eb25d877e41f68dd1c99a8))
* **engine:** consolidate duplicate-winner.ts byte-identical copies ([#4251](https://github.com/minion1227/gittensory/issues/4251)) ([#4373](https://github.com/minion1227/gittensory/issues/4373)) ([e44918d](https://github.com/minion1227/gittensory/commit/e44918d2fe6134961f261bceafa8763ffc4719b7))
* **engine:** correct Cartfile.resolved regex and cover it with parity checks ([#4638](https://github.com/minion1227/gittensory/issues/4638)) ([a23acba](https://github.com/minion1227/gittensory/commit/a23acba75a1f3d1a2e648e07710241a7cf52812f))
* **engine:** defer repo-map's createRequire past module scope to unbreak the api Worker deploy ([#4590](https://github.com/minion1227/gittensory/issues/4590)) ([8f9f2cb](https://github.com/minion1227/gittensory/commit/8f9f2cb6272fa80a3ef266d4fc47f17ef64e1c27))
* **engine:** fix stale test fixtures, wire the suite into test:ci ([#4150](https://github.com/minion1227/gittensory/issues/4150)) ([5a4de69](https://github.com/minion1227/gittensory/commit/5a4de69a67ae0d1704284d6237cd70d34ee2461a))
* **engine:** resync linked-issue-label-propagation comment drift ([e53472e](https://github.com/minion1227/gittensory/commit/e53472ef35423020668e9075072a2b161fa41211))
* **engine:** validate metadata candidate paths ([#3950](https://github.com/minion1227/gittensory/issues/3950)) ([8d507ae](https://github.com/minion1227/gittensory/commit/8d507ae291dc87e2c3d6d23ad052caa7ecb74516))
* **manifest:** keep freeze override operator-only ([#4391](https://github.com/minion1227/gittensory/issues/4391)) ([c52fdb9](https://github.com/minion1227/gittensory/commit/c52fdb98f2a75bdbf14c5a37e6f7b7b1158c5c3c))
* **manifest:** restore agentGlobalFreezeOverride for the operator-private config source ([#4410](https://github.com/minion1227/gittensory/issues/4410)) ([9ab4146](https://github.com/minion1227/gittensory/commit/9ab41467af673575bdb768baf02969dda95495c5))
* **miner-hands:** reject malformed attempt metering numbers ([#4488](https://github.com/minion1227/gittensory/issues/4488)) ([906d183](https://github.com/minion1227/gittensory/commit/906d183a5dabb2e677bde2abd28503f7656c9210))
* **miner:** reject unsafe telemetry metric names ([#4487](https://github.com/minion1227/gittensory/issues/4487)) ([c074efd](https://github.com/minion1227/gittensory/commit/c074efd8638470d32dc77e3209c40a4e5a4f05ae))
* **release:** sync package-lock.json via script, not release-please extra-files ([#4179](https://github.com/minion1227/gittensory/issues/4179)) ([b614317](https://github.com/minion1227/gittensory/commit/b614317e506fab3b30bf7fc366d67e268952ba02))
* **review:** add localStorage theme-forcing fallback for visual capture ([#4109](https://github.com/minion1227/gittensory/issues/4109)) ([#4127](https://github.com/minion1227/gittensory/issues/4127)) ([1d2cb3f](https://github.com/minion1227/gittensory/commit/1d2cb3ff32e5642b18b888a8070c59dfea6e67d9))
* **review:** append the contributor skill-file link without losing the specific rejection reason ([#4556](https://github.com/minion1227/gittensory/issues/4556)) ([39f5213](https://github.com/minion1227/gittensory/commit/39f52130b551fcfb7d03cc7cf5ae7324089021b8))
* **review:** let a reward mapping opt into maintainer-authored-issue trust ([f13706f](https://github.com/minion1227/gittensory/commit/f13706f54147e7729ca5b2dee89b570b5dd2d3e3))
* **review:** let a reward mapping opt into maintainer-authored-issue trust ([304e88c](https://github.com/minion1227/gittensory/commit/304e88c7c209fcba7ce9fc35d8804d3dd339d7c7))
* **review:** let bug/feature labels propagate from maintainer-authored linked issues ([#3938](https://github.com/minion1227/gittensory/issues/3938)) ([9707578](https://github.com/minion1227/gittensory/commit/9707578496ad1ff123ffaf446b15b6d40472cf3c))
* **review:** per-repo review.visual.production_url override for bot-capture ([#4564](https://github.com/minion1227/gittensory/issues/4564)) ([e063f55](https://github.com/minion1227/gittensory/commit/e063f55ff1ebf8402da565a5034b1f5b201106bd))
* **review:** persist merge train settings paths ([#4130](https://github.com/minion1227/gittensory/issues/4130)) ([06689bc](https://github.com/minion1227/gittensory/commit/06689bc1d54c167daac85791539265f9ab084733))
* **review:** preserve invariant guardrails ([#3943](https://github.com/minion1227/gittensory/issues/3943)) ([95cc974](https://github.com/minion1227/gittensory/commit/95cc974ead9f70379d76e69effda74ab0ec323ce))
* **review:** prevent backdated duplicate-winner claims ([#3956](https://github.com/minion1227/gittensory/issues/3956)) ([ddd7e51](https://github.com/minion1227/gittensory/commit/ddd7e51e99017ea984064bcf25af0033125f661a))
* **review:** resolve dead aiReviewCloseConfidence floor with a configurable disposition ([#4656](https://github.com/minion1227/gittensory/issues/4656)) ([3a3cd7f](https://github.com/minion1227/gittensory/commit/3a3cd7f816b259e21923dd9e0040194da36040e3))
* **settings:** bound contributor open caps ([#3977](https://github.com/minion1227/gittensory/issues/3977)) ([9195349](https://github.com/minion1227/gittensory/commit/9195349654f73cc5c7450d2d1c510c761f1d52ef))

## [0.2.0](https://github.com/JSONbored/gittensory/compare/engine-v0.1.0...engine-v0.2.0) (2026-07-08)


### Features

* **review:** add REES complexity and Go/Python error-defect analyzers ([#4155](https://github.com/JSONbored/gittensory/issues/4155)) ([f5c5c52](https://github.com/JSONbored/gittensory/commit/f5c5c5237da04910688369dbf0cf2a1d9371593e))
* **review:** per-repo opt-in to let a confident AI-judgment blocker gate the merge ([#4171](https://github.com/JSONbored/gittensory/issues/4171)) ([4664ad2](https://github.com/JSONbored/gittensory/commit/4664ad25f4c729ded6a37c3d5d6d5a56857d73e7))


### Fixes

* **engine:** fix stale test fixtures, wire the suite into test:ci ([#4150](https://github.com/JSONbored/gittensory/issues/4150)) ([5a4de69](https://github.com/JSONbored/gittensory/commit/5a4de69a67ae0d1704284d6237cd70d34ee2461a))

## Changelog

## engine-v0.1.0 - 2026-07-01

### Features
- Scaffold the shared deterministic engine package skeleton (#2275)
