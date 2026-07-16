---
title: Troublesome Tanks
description: "Top-down tank shooter, where each team uses custom Arduino controllers to control and power their tank."
skills: [C#, Agile, MonoGame]
tags: [Arduino, Client Project, 2D, Shooter]
category: game
role: Project Manager & Scrum Master (team of 4)
date: "2026-05"
images: ["/assets/projects/tt1.png", "/assets/projects/tt2.png", "/assets/projects/tt3.png", "/assets/projects/tt4.jpg", "/assets/projects/tt5.png", "/assets/projects/tt6.jpeg"]
video: ""
links:
  github: https://github.com/DavidParkerDr/TroublesomeTanks_3DP
featured: true
---

# Project Context

This project was undertaken by me and three fellow University of Hull students as part of a two-semester module called CDP (Commercial Development Practice). David Parker, the client for this project, is a University of Hull professor and lecturer. The game was originally developed by him and his team. It has since gone through numerous iterations, including a further improvement by another CDP team a year prior.

Troublesome Tanks is a top-down tank shooter where up to four teams of three compete against each other and try to be the last tank standing. Each team has to manage the power of their tank by connecting and disconnecting components via the custom Arduino interface. The application has been developed in C# and MonoGame, which interfaces with Arduino controllers using C/C++. The repository is publicly available, and includes 3D prints for the custom controllers.

The game is a tool for the university to showcase its Computer Science department during open days and outreach events. It is also used as a team building activity for students. The game suffered from critical stability and usability issues that impacted player experience and the unversity's image.

The aim was to transition the software from a prototype state to a production-ready game. I acted as both the project manager and scrum master to successfuly deliver the three core objectives we outlined at the start.

# Objectives

We have successfully completed the project lifecycle, delivering a stabilized, highly refactored, and rigorously tested application. We held a successful public playtesting tournament with 30 attendees, confirming that the core game loop is stable and enjoyable.

## Objective 1: Remediation of Technical Debt & Critical Bugs

We successfully stabilized the core game by addressing major technical debt and resolving critical bugs:

- **Hardware Latency**: We successfully eliminated the 8-second delay when connecting a specific controller early in the project.
- **Input Reliability**: We fixed the major issues with input failing to register, greatly improving the user experience. Some smaller input issues were spotted during the playtest; these were documented as tracked issues for future teams with reproduction steps.
- **Clipping**: We resolved clipping issues by overhauling the collision system and performing additional checks for tanks being inside walls.
- **Soft-lock**: We ensured destroyed tanks no longer block pathways or prevent progression by making tank debris completely destroyable, as per the client's suggestion.
- **UI Scalability**: The user interface and in-game elements (such as Pickups and RectWalls) were updated to scale correctly across different resolutions, and resolution-scaling bugs were caught and fixed during regression testing.

## Objective 2: Gameplay Balance & Feedback Enhancements

We worked closely with the client to implement features that vastly improved the pacing, clarity, and precision of the game:

- **Visual Clarity**: We improved track particle clarity by adding black outlines to the sprites to ensure visibility against any avatar colour.
- **Collision Precision**: We completely overhauled the collision detection system, moving from legacy point-based checks to a custom 2D collision engine (using SAT) that accurately calculates intersections for Circles, AABBs, and OBBs, ensuring bullets and tanks perfectly match their visual sizes. This precision was verified using a newly developed internal debugging tool that visually renders the collision boundaries.
- **Pacing (Sudden Death)**: We successfully implemented the "Sudden Death" shrinking play zone (death ring) to force engagements and prevent late-game stalemates.
- **Pacing (Timer)**: We added a timer to limit the maximum time a game is allowed to run, resulting in a win for the player with the highest remaining health, or a draw if tied.

## Objective 3: Maintainability & Quality

We transformed the legacy codebase into a professional, maintainable environment for future teams:

- **Standardisation**: We authored and enforced Coding-Guidelines.md, retroactively updating inconsistent variable names and adding XML <summary> tags to public methods and classes.
- **CI/CD Pipeline**: We established a Continuous Integration pipeline using GitHub Actions that automatically builds the project and runs our newly created TankontrollerTests suite on every push and pull request.
- **Peer Reviews**: We successfully transitioned the team to a Pull Request workflow, enforcing peer code reviews before merging into the main branch to ensure code quality and readability.
- **Refactoring Strategy**: We applied the 'Boy Scout Rule', safely deleting redundant classes (e.g., in the Pickup hierarchy) and abstracting tightly coupled logic, successfully reducing technical debt in the codebase.
- **Continuous Improvements**: We consistently held Sprint Retrospectives to evaluate our workflows, which directly led to improvements in our Agile practices, role accountability, and communication.

## Stretch Objectives and Handoff

- **Map Editor Tools**: We invested significant effort into the map editor stretch objective, creating a completely new tool from scratch to streamline the map creation process.
- **Bullet & Pick-up Menu**: A new menu was added to the game, allowing the players to select which power-ups they would like to spawn in the game, and at what frequency.
- **Handoff**: We compiled an extensive, prioritized backlog of GitHub issues and structured Handover Documentation to ensure the next team can seamlessly pick up where we left off.