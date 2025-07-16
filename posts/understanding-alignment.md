---
title: Understanding Alignment
date: 2025-07-15
description: Is alignment tractable?
layout: blog.njk
---

Given the recently publicized efforts towards the creation of Artificial Superintelligence and the associated problem of "superalignment" (the alignment of superintelligent systems) I was curious about whether this problem was tractable on a ==philosophical==, ==technical==, and ==sociopolitical== level.

<br>

**Philosophically:** Can we define "human values" in a way that is precise, coherent, and acceptable enough to guide a superintelligent system?

**Technically:** Even if we could define human values, is it technically possible to make an AI understand and obey them robustly?

**Sociopolitically:** Even if we had a philosophical consensus and technical solution, could we realistically coordinate global actors to implement it?

<br>

I don't have much expertise on the former and I don't have much hope for the latter.

<br>

I thought I'd run the question on technical tractability by Gemini Deep Research, and [this](https://docs.google.com/document/d/1gRrMDbVXGVVyDYZR91tSaHE7pe9Ueaw6kIfV-MPTHd4/edit?usp=sharing) is what it produced.

I found its description of the paradoxical nature of current approaches to superalignment to be captivating and wanted to share.

I was also a bit surprised by how convinced I was after reading this article. These tools are getting insanely good! I also just read the article it produced today; perhaps I need more time to digest.

## My favorite excerpts

> The inner alignment problem is the challenge of ensuring that the goal a model learns to pursue internally (the mesa-objective) is the same as the objective it was trained on (the base objective). The term mesa-optimization, introduced by researchers at the Machine Intelligence Research Institute (MIRI), describes the phenomenon where a learned model becomes an optimizer itself. The "base optimizer" (e.g., stochastic gradient descent) searches through the space of possible models to find one that scores well on the "base objective" (the loss function). However, a particularly effective way to score well on the base objective might be for the model itself to become a powerful search process—a "mesa-optimizer"—that actively pursues some goal, or "mesa-objective".

> Imagine a superintelligent AI tasked with designing a novel protein for a vaccine. It produces two candidate protein structures, each described by thousands of pages of complex biophysical calculations. How does a human supervisor provide feedback? Or consider an AI that generates a million lines of code in a new programming language it invented to optimize a city's power grid. A human engineer asked to verify that this code contains no subtle backdoors or catastrophic failure modes would be utterly lost. In these scenarios, human supervision is not just slow or expensive; it is impossible. The supervisor lacks the cognitive capacity to even understand the AI's output, let alone judge its quality or safety. This means that our primary method for providing a reward signal—human feedback—becomes useless precisely when the stakes are highest.

> Achieving true corrigibility requires designing an agent that is, in some deep sense, uncertain about its own goals and defers to humans as the ultimate source of truth about what it should be doing. This involves solving profound philosophical and technical problems about utility indifference, value learning, and logical uncertainty for which we currently have no clear, scalable solutions. The challenge is to build a system that wants to be corrected, rather than a system that wants to resist but is physically prevented from doing so.

<br>

## Going further

I'm still personally curious about the philosophical nature of superalignment. These are some points that ChatGPT and I thought may be important:

### Key concepts:
- Value alignment vs. value learning
- Moral realism vs. anti-realism
- Value pluralism (Is there even one set of values to align with?)
- ==Coherent Extrapolated Volition (Yudkowsky)== -- I especially recommend this reading

### Main difficulties:
- Human values are often vague, conflicting, and context-dependent.
- There is no consensus on what "doing the right thing" means, even for humans.
- Cultural and moral diversity complicates any universal alignment effort.

### Debates:
- Can we formalize values at all? (philosophy of language, ethics)
- Should AI systems align to individual preferences, aggregate preferences, or an idealized extrapolation?]

> _More to come_