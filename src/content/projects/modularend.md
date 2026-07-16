---
title: ModulaRend
description: A distributed real-time physics simulation engine and renderer built from scratch in C++ & Vulkan 1.3. 
skills: [C++, Vulkan, Multithreading, Physics, Networking]
tags: [GPU Compute, CMake]
category: engine
role: Solo
date: "2026-05"
images: ["/assets/projects/mr3.png", "/assets/projects/mr4.png", "/assets/projects/mr1.png", "/assets/projects/mr2.png"]
video: ""
links:
  github: https://github.com/SeminixDev/ModulaRend
featured: true
---

A distributed real-time physics simulation engine built from scratch in C++ with Vulkan 1.3, designed as a final-year MEng project to explore the intersection of graphics, systems programming, and networked simulation. Features a three-thread architecture pinned to CPU cores, full-mesh TCP networking for 4 peers, a 14-pair rigid body collision system, and Reynolds' boid flocking.

## Multithreaded Architecture

Three fully independent subsystems — Visualisation, Simulation, and Networking — each pinned to specific CPU cores via Win32 `SetThreadAffinityMask`. Each thread runs a **sleep/spin hybrid clock**: sleeps until 1.5 ms before the deadline then spin-locks for precision, achieving sub-millisecond accuracy at rates up to 1000 Hz. All three subsystem frequencies are adjustable at runtime via ImGui.

Thread-safe state sharing uses a double-buffered `PhysicsStateBuffer` (mutex-guarded swap), a `GlobalState` struct for infrequent cross-thread writes, and a `_pendingModels` queue that decouples entity spawning between threads.

## Vulkan Rendering Pipeline

Forward renderer using **Vulkan 1.3 Dynamic Rendering** — no VkRenderPass objects. The per-frame pipeline is:

1. Shadow depth pass — orthographic projection, slope-scale bias, hardware PCF 3×3 soft shadows
2. Particle compute dispatch — 10k particles, positions updated by compute shader into an SSBO
3. Barrier — compute write → vertex read
4. Main scene draw — Phong (per-pixel + bump mapping via dFdx/dFdy) and Gouraud shading, bindless texture array
5. Globe draw — alpha-blended pass
6. ImGui overlay

Scenes communicate with the renderer exclusively through a `FrameRenderData` struct containing camera matrices, lighting, draw callbacks, and particle config. They never touch command buffers or render passes directly.

## TCP Full-Mesh Networking

Four-peer full-mesh topology over TCP.

Clock drift is addressed by timestamping packets with the receiver's local clock. **Dead reckoning** extrapolates positions between network ticks. **Smooth lerp correction** converges on authoritative state over a configurable blend window without snapping.

Cross-peer collisions use a **collision arbitration protocol**: the peer whose entity has the lower EntityID acts as Collision Authority, resolves the full impulse for both bodies, and sends an `ImpulseEventPayload`. This prevents the "network dodging" artefact where both peers independently resolve the same collision.

## Rigid Body Physics

Full rigid body simulation: **semi-implicit Euler** integration (energy-conservative for oscillatory systems), analytically-computed inertia tensors rotated per-frame via `R · I⁻¹_local · Rᵀ`, Coulomb friction clamped to the friction cone, and impulse-based collision response with angular effects (`ωA += IA⁻¹ (rA × jn)`). The simulation can handle 750+ spheres at 60fps on a low-budget PC.

A **collision dispatch table** maps ordered type pairs to function pointers for O(1) lookup, covering 14 collision pair types including 15-axis SAT for Cuboid–Cuboid. Container objects invert the collision normal to constrain bodies to their interior. Animated objects use backward finite-difference velocity so moving surfaces are handled correctly in the impulse solver.

## Flocking & Spatial Partitioning

Reynolds' canonical boid behaviours — separation, alignment, cohesion — plus collision avoidance. Boid weights and radii are tunable per-peer via ImGui.

Two acceleration structures implement a common `ISpatialPartition` interface, switchable at runtime with debug wireframe overlay (green for grid, magenta for octree leaves):

- **Uniform Grid** — O(N) build, O(K) query by hashing boid positions into cells of side = query radius
- **Octree** — O(N log N) build, pool-allocated nodes to avoid heap fragmentation

Live performance metrics — build/query time, memory, result count — are captured via `high_resolution_clock` and displayed in ImGui for direct comparison between structures. The simulation can handle 2500+ boids at 60fps on a low-budget PC.
