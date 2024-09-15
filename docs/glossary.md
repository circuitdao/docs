---
id: glossary
title: Glossary
sidebar_position: 850
---

# Glossary

The glossary assumes familiarity with basic concepts of [Chia blockchain](https://docs.chia.net/docs-home) and [Chialisp](https://chialisp.com/).

**Arg.** Short for argument. A value that is passed into a mod or function. A value passed into a mod that is considered part of the mod itself, is referred to as a curried arg.

**Argument.** See arg.

**CAT.** A [Chia Asset Token](https://chialisp.com/cats).

**CAT singleton.** A CAT coin whose inner puzzle ensures that the coin is also a singleton.

**Coin.** A [coin](https://chialisp.com/chialisp-first-smart-coin/#coins) on Chia blockchain.

**Condition.** One of the outputs of a coin spent on the Chia blockchain. For additional info see [here](https://docs.chia.net/conditions).

**Currying.** Setting an arg of a mod to a fixed value so that it is considered part of the mod itself. For additional info see [here](https://chialisp.com/chialisp-currying).

**Curried arg.** A value curried into a mod.

**Custom singleton.** A singleton that is not a standard singleton.

**Data provider.** An individual or entity that publishes XCH/USD prices in an [Announcer](https://docs.circuitdao.com/technical-manual/announcers).

**Deployment.** The act of creating eve protocol coins on-chain. This can either refer to protocol deployment, the deployment of Announcers by data providers, or the deployment of collateral or savings vaults by users.

**Enforced state.** A coin state that is fully or partially enforced by the coin's puzzle mod. Typically used in the context of eve coins.

**Eve coin.** The very first coin in the lineage of a singleton.

**Eve spend.** Spend of an eve coin.

**Eve state.** The state of an eve coin.

**Fixed arg.** An curried arg that cannot be changed by protocol operations and whose value is known prior to protocol deployment. These are typically mods or mod hashes.

**Fixed state.** The fixed args of a coin's state. In case of the protocol, the fixed state always includes the treehash of the coin's mod after the other fixed args are curried, but before any immutable or mutable args are curried. In the protocol's source code, this arg is always named MOD_HASH.

**Immutable arg.** A curried arg that cannot be changed by protocol operations and whose exact value is not known prior to deployment. Immutable args never change once the protocol is deployed. An example is the Statutes struct, which depends on the Statute's launcher ID.

**Immutable state.** The immutable args of a coin's state.

**Keeper.** An individual or entity that performs operations on the protocol without being a user or data provider. For more details see [here](https://docs.circuitdao.com/technical-manual/keepers).

**Lineage.** The succession of coins and coin spends that lead from a launcher or eve coin to the current singleton coin.

**Mod.** Short for module. A Chialisp [module](https://chialisp.com/chialisp-using-modules). Essentially another word for program.

**Module.** See mod.

**MOD_HASH.** A fixed arg that can be found in all of the protocol coins' mods. MOD_HASH is the treehash of the coin's mod after all other fixed args have been curried in.

**Mutable arg.** A curried arg that can be changed by one or more protocol operations.

**Mutable state.** The mutable args of a coin's state.

**Operation.** An action that a user or keeper can perform on the protocol. Examples include depositing collateral into a collateral vault, withdrawing from a savings vault, triggering a liquidation auction, or recovering bad debt. Operations require one or more protocol coins to be spent simultaneously. For example, announcing an Announcer price only requires one coin to be spent, the Announcer itself. Performing the win operation at the end of a Recharge Auction requires the Recharge Auction coin, Statutes, a CRT coin, and all Treasury coins to be spent. Operations are not to be confused with Chialisp [operators](https://chialisp.com/operators).

**Program.** Another word for mod.

**Protocol.** Unless specified otherwise, refers to Circuit protocol.

**Protocol coin.** A coin that is part of the protocol. A complete list of protocol coin types can be found [here](https://docs.circuitdao.com/technical-manual/overview#list-of-protocol-coins).

**Protocol condition.** The following conditions when prefixed by the protocol prefix:
* SEND_MESSAGE
* RECEIVE_MESSAGE
* CREATE_COIN_ANNOUNCEMENT
* CREATE_PUZZLE_ANNOUNCEMENT
* REMARK

See [here](http://localhost:3000/technical-manual/design-decisions#condition-prefixes-and-filtering) for details.

**Protocol deployment.** Refers the creation of the eve coins of Statutes, Announcer Registry and Oracle.

**Protocol prefix.** The 3-byte string "CRT" used to identify protocol conditions.

**Puzzle.** A curried mod whose treehash is being used as the puzzle hash of a coin. More info [here](https://chialisp.com/chialisp-first-smart-coin/).

**Puzzle mod.** A puzzle with all mutable args, immutable args and MOD_HASH [uncurried](https://chialisp.com/chialisp-currying).

**Singleton.** A coin that can have at most one descendant of same type (TODO: not quite correct in case of savings vaults, which can squeeze out other savings vaults in eve state). Note that as opposed to the standard singleton, the parent of a singleton may not be a standard launcher, and may have launched multiple singletons, even of same type. Some singletons may live forever, whereas others are meltable.

**Standard singleton.** A coin with puzzle mod [singleton_top_layer_v1_1.clsp](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/puzzles/singleton_top_layer_v1_1.clsp). In general Chia parlance, [standard singletons](https://chialisp.com/singletons) are simply called singletons. However, in the context of the protocol it is more convenient to use the term singleton in a broader sense.

**State.** The curried args of a coin's puzzle. State consists of three mutually exclusive sets of curried args: fixed state, immutable state, mutable state.

**Tail.** In the context of CATs, a program whose treehash has been curried into the TAIL_PROGRAM_HASH arg of the [CAT mod](https://chialisp.com/cats/#code).

**Treehash.** The canonical hash of a Chialisp program or expression. Defined by the [sha256tree function](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/puzzles/sha256tree.clib).

**Type.** The type of a protocol coin is defined by the innermost inner puzzle mod which is still defined by the protocol. If there is no inner puzzle, then the outer puzzle mod defines the type.

For example, Savings vaults and Treasury coins are different types of coins, even though they share the same outer puzzle - the [standard CAT mod](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/puzzles/cat_v2.clvm) with BYC tail curried in. An example of a coin type that's based on its outer puzzle are Announcers. An example of a coin type with multiple nested inner puzzles are savings vaults. Although a savings vault's inner puzzle (savings_vault.clsp) has itself an inner puzzle (curried into INNER_PUZZLE arg), the latter can be freely chosen by the owner of the savings vault, and hence does not subdivide savings vaults into multiple types.

**Unique singleton.** A singleton of a type that only exists once in the entire protocol. There are three unique singletons in the protocol: Statutes, Oracle and Announcer Registry.

**User.** Somebody who uses the protocol to borrow or earn interest on Bytecash.
