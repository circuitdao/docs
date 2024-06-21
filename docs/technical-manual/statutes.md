---
id: statutes
title: Statutes
sidebar_position: 180
---

# Statutes

The Statutes singleton makes use of [identical spend aggregation](https://docs.chia.net/faq/#what-is-identical-spend-aggregation), which allows multiple spend bundles to spend the same coin in the same block. This way Statutes parameters can be used by various other components of the protocol at the same time.

For example, a borrower can take out a new loan, another withdraw collateral, and a third have his vault liquidated, all while savers go about their business and deposit or withdraw from their savings vaults.

