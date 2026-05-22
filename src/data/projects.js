/**
 * Projects Database
 * -----------------
 * Single source of truth for all portfolio projects.
 * Updating an entry here updates the landing page, the projects gallery,
 * and the corresponding detail page automatically.
 *
 * Schema:
 *   id          – URL slug, used for projects/[id].html
 *   title       – Project name
 *   subtitle    – Short tagline (shown on detail page hero)
 *   description – 1–2 sentence card summary
 *   tags        – Array of technology / topic tags
 *   category    – "engine" | "game" | "web"
 *   role        – Your role and team size
 *   date        – "YYYY-MM" (used for display and sorting)
 *   images      – Array of image paths (carousel + lightbox). [] = use placeholder.
 *   video       – Optional YouTube embed URL (https://www.youtube.com/embed/...)
 *   links       – { github, itch, live, newgrounds, ... }
 *   featured    – true to appear in the landing page Featured section
 *   sections    – Optional [{ title, content }] for the detail page body
 */
const PROJECTS = [

  // ─── Engines & Tools ─────────────────────────────────────────────────────

  {
    id: "modularender",
    title: "ModulaRender",
    subtitle: "Networked Vulkan Physics Simulation Engine",
    description: "A distributed real-time physics simulation engine built from scratch in C++ with Vulkan 1.3. Features a three-thread architecture pinned to CPU cores, full-mesh TCP networking for 4 peers, a 14-pair rigid body collision system, and GPU-accelerated boid flocking.",
    tags: ["C++", "Vulkan", "Networking", "Physics", "Multithreading", "GPU Compute", "ImGui"],
    category: "engine",
    role: "Solo",
    date: "2026-05",
    images: [],
    video: "",
    links: {
      github: "https://github.com/SeminixDev/ModulaRender"
    },
    featured: true,
    sections: [
      {
        title: "Multithreaded Architecture",
        content: "<p>Three fully independent subsystems — Visualisation, Simulation, and Networking — each pinned to specific CPU cores via Win32 <code>SetThreadAffinityMask</code>. Each thread runs a <strong>sleep/spin hybrid clock</strong>: sleeps until 1.5 ms before the deadline then spin-locks for precision, achieving sub-millisecond accuracy at rates up to 1000 Hz. All three subsystem frequencies are adjustable at runtime via ImGui.</p><p>Thread-safe state sharing uses a double-buffered <code>PhysicsStateBuffer</code> (mutex-guarded swap), a <code>GlobalState</code> struct for infrequent cross-thread writes, and a <code>_pendingModels</code> queue that decouples entity spawning between threads — introduced after a crash caused by the sim thread reallocating <code>EntityRegistry</code> while the render thread held iterators into the same vectors.</p>"
      },
      {
        title: "Vulkan Rendering Pipeline",
        content: "<p>Forward renderer using <strong>Vulkan 1.3 Dynamic Rendering</strong> — no VkRenderPass objects. The per-frame pipeline is:</p><ol><li>Shadow depth pass — orthographic projection, slope-scale bias, PCF 3×3 soft shadows</li><li>Particle compute dispatch — 10k particles, positions updated by compute shader into an SSBO</li><li>Barrier — compute write → vertex read</li><li>Main scene draw — Phong (per-pixel + bump mapping via dFdx/dFdy) and Gouraud shading, bindless texture array</li><li>Globe draw — alpha-blended pass</li><li>ImGui overlay</li></ol><p>Scenes communicate with the renderer exclusively through a <code>FrameRenderData</code> struct containing camera matrices, lighting, draw callbacks, and particle config. They never touch command buffers or render passes directly.</p>"
      },
      {
        title: "TCP Full-Mesh Networking",
        content: "<p>Four-peer full-mesh topology over TCP (migrated from UDP during development — TCP's reliable ordering eliminated the need for manual retry queues, ACKs, and sequence numbers, with negligible latency difference on LAN). Each peer listens on <code>basePort + peerId</code>; a PowerShell script launches all four peers from a single command.</p><p>Clock drift is addressed by timestamping packets with the receiver's local clock. <strong>Dead reckoning</strong> extrapolates positions between network ticks. <strong>Smooth lerp correction</strong> converges on authoritative state over a configurable blend window without snapping.</p><p>Cross-peer collisions use a <strong>collision arbitration protocol</strong>: the peer whose entity has the lower EntityID acts as Collision Authority, resolves the full impulse for both bodies, and sends an <code>ImpulseEventPayload</code>. This prevents the \"network dodging\" artefact where both peers independently resolve the same collision.</p>"
      },
      {
        title: "Rigid Body Physics",
        content: "<p>Full rigid body simulation: <strong>semi-implicit Euler</strong> integration (energy-conservative for oscillatory systems), analytically-computed inertia tensors rotated per-frame via <code>R · I⁻¹_local · Rᵀ</code>, Coulomb friction clamped to the friction cone, and impulse-based collision response with angular effects (<code>ωA += IA⁻¹ (rA × jn)</code>).</p><p>A <strong>collision dispatch table</strong> maps ordered type pairs to function pointers for O(1) lookup, covering 14 collision pair types including 15-axis SAT for Cuboid–Cuboid. Container objects invert the collision normal to constrain bodies to their interior. Animated objects use backward finite-difference velocity so moving surfaces are handled correctly in the impulse solver.</p>"
      },
      {
        title: "Flocking & Spatial Partitioning",
        content: "<p>Reynolds' canonical boid behaviours — separation, alignment, cohesion — plus collision avoidance, running on the GPU as a compute shader updating SSBOs. Boid weights and radii are tunable per-boid via ImGui.</p><p>Two acceleration structures implement a common <code>ISpatialPartition</code> interface, switchable at runtime:</p><ul><li><strong>Uniform Grid</strong> — O(N) build, O(K) query by hashing boid positions into cells of side = query radius</li><li><strong>Octree</strong> — O(N log N) build, pool-allocated nodes to avoid heap fragmentation, debug wireframe overlay (green for grid, magenta for octree leaves)</li></ul><p>Live performance metrics — build/query time, memory, result count — are captured via <code>high_resolution_clock</code> and displayed in ImGui for direct comparison between structures.</p>"
      }
    ]
  },

  // ─── Games ───────────────────────────────────────────────────────────────

  {
    id: "spectral-ninja",
    title: "Spectral Ninja",
    subtitle: "2D Fighter Platformer with Time Rewind",
    description: "A 2D fighter platformer where you control a ninja who can rewind time to trigger spectral damage. Ranked 331/1773 overall and 267/1773 for fun in Brackeys Jam 2020.2. Also published on Newgrounds (1,061 views, 3.19/5).",
    tags: ["Unity", "C#", "Game Jam", "Platformer", "Fighter"],
    category: "game",
    role: "Solo",
    date: "2020-08",
    images: [],
    video: "",
    links: {
      itch: "https://seminix.itch.io/spectral-ninja",
      github: "https://github.com/SeminixDev/Spectral-Ninja",
      newgrounds: "https://www.newgrounds.com/portal/view/764843"
    },
    featured: true,
    sections: [
      {
        title: "About",
        content: "<p>Made solo for <strong>Brackeys Jam 2020.2</strong> (theme: <em>Rewind</em>). You control a ninja who can kill enemies through the spectral dimension. Attacks deal physical damage; the second attack and dash also deal spectral damage (shown in blue on the enemy health bar). Rewinding restores 50% of health lost during the 4-second window and triggers all accumulated spectral damage simultaneously.</p><p>Also published on Newgrounds, achieving 1,061 views and a 3.19/5 rating from 89 ratings. Ranked 331/1773 overall and 267/1773 for fun in the jam.</p>"
      }
    ]
  },

  {
    id: "cleanse-me-to-freedom",
    title: "Cleanse Me To Freedom",
    subtitle: "Twin-Stick Boomer Shooter",
    description: "A twin-stick boomer shooter where you fight waves of enemies using a shotgun and scythe across multiple floors. Made for Arcademia Jam 2026 (theme: Pandora's Box). 22 views, 15 downloads.",
    tags: ["Godot", "GDScript", "Game Jam", "Shooter", "Twin-Stick"],
    category: "game",
    role: "Programmer (team of 2)",
    date: "2026-03",
    images: [],
    video: "",
    links: {
      itch: "https://usagidvv.itch.io/cleansemetofreedom"
    },
    featured: true,
    sections: [
      {
        title: "About",
        content: "<p>Made for <strong>Arcademia Jam 2026</strong> (theme: <em>Pandora's Box</em>). You play as a priest sent to exorcise a demonic box — you fail the ritual and are sucked inside. Armed with a shotgun and scythe, fight your way out by cleansing each floor of enemies. Collaborated with a student from the University of the Witwatersrand (WITS) who handled narrative design and 3D modelling.</p>"
      }
    ]
  },

  {
    id: "greypixelgrabbing",
    title: "GreyPixelGrabbing",
    subtitle: "2D Vertical-Scroller Platformer with Grappling Hook",
    description: "A 2D vertical-scroller platformer with a grappling hook mechanic. Use your gun and grappling hook to ascend broken platforms from below. Made for Three Thing Game at the University of Hull.",
    tags: ["MonoGame", "C#", "Game Jam", "Platformer"],
    category: "game",
    role: "Programmer (team of 4)",
    date: "2025-11",
    images: [],
    video: "",
    links: {
      itch: "https://graymakesgame.itch.io/greypixelgrabbing"
    },
    featured: false,
    sections: [
      {
        title: "About",
        content: "<p>Made for <strong>Three Thing Game</strong> (University of Hull private game jam, November 2025). Theme words: <em>Pixel, Grey, Grabbing</em>. A lonely Grey Pixel grabbing for survival — use your gun and grappling hook, grabbing onto broken platforms to ascend from the Hell you fell into. The only way out is up. Collaborated with three fellow Hull students.</p>"
      }
    ]
  },

  {
    id: "modular-mothership",
    title: "Modular Mothership",
    subtitle: "Roguelike Horizontal Space Shooter",
    description: "A roguelike horizontal space shooter where you assemble your ship from collected weapon modules to grow stronger. Made solo for GMTK 2021. Ranked 1243/5638 overall and 760/5638 for fun.",
    tags: ["Unity", "C#", "Game Jam", "Shooter", "Roguelike"],
    category: "game",
    role: "Solo",
    date: "2021-06",
    images: [],
    video: "",
    links: {
      itch: "https://seminix.itch.io/modular-mothership"
    },
    featured: false,
    sections: [
      {
        title: "About",
        content: "<p>Made solo for <strong>GMTK Game Jam 2021</strong> (theme: <em>Joined Together</em>). Pick up guns to join them to your ship and grow stronger. Avoid enemy bullets — you can judge their damage by size. Achieved 261 views and 121 browser plays out of 5,638 entries, ranking 1243 overall and 760 for fun.</p>"
      }
    ]
  },

  {
    id: "out-of-sight",
    title: "Out of Sight",
    subtitle: "Top-Down 2D Stealth Puzzle",
    description: "A top-down puzzle game with one rule: nothing can move or shoot while inside your vision cone. Made solo for GMTK 2020 (theme: Out of Control). Ranked 1636/5247 overall, 505 for originality.",
    tags: ["Unity", "C#", "Game Jam", "Puzzle", "Top-Down"],
    category: "game",
    role: "Solo",
    date: "2020-07",
    images: [],
    video: "",
    links: {
      itch: "https://seminix.itch.io/out-of-sight"
    },
    featured: false,
    sections: [
      {
        title: "About",
        content: "<p>Made solo for <strong>GMTK Game Jam 2020</strong> (theme: <em>Out of Control</em>). The core mechanic: nothing — enemies or projectiles — can move or shoot while inside your vision cone. Use your visibility as a shield, and exploit the blind spots to survive. 94 views and 41 browser plays out of 5,247 entries.</p>"
      }
    ]
  },

  {
    id: "space-pace",
    title: "Space Pace: Shooter",
    subtitle: "2D Vertical-Scroller Space Shooter",
    description: "A short 2D vertical-scroller space shooter made as a personal project. My first completed standalone game, built to learn Unity.",
    tags: ["Unity", "C#", "Shooter"],
    category: "game",
    role: "Solo",
    date: "2020-05",
    images: [],
    video: "",
    links: {
      itch: "https://seminix.itch.io/space-pace-shooter"
    },
    featured: false,
    sections: [
      {
        title: "About",
        content: "<p>A short vertical-scroller space shooter made as a personal project in May 2020 — my first completed Unity game, built outside of any jam to learn the engine. 55 views, 16 browser plays.</p>"
      }
    ]
  },

  {
    id: "cooking-with-papa",
    title: "Cooking with Papa",
    subtitle: "3D Cooking Chaos Game",
    description: "A 3D cooking game where a tech mogul cooks meals in a workshop to keep his remaining staff happy. Made with Beetroot Studios for Three Thing Game jam (theme: Coal, Workshop, Candy Canes).",
    tags: ["Unity", "C#", "Game Jam", "3D", "Cooking"],
    category: "game",
    role: "Programmer (team of 6, Beetroot Studios)",
    date: "2022-11",
    images: [],
    video: "",
    links: {
      itch: "https://beetrootgames.itch.io/cooking-papa-with-meelon-pusk"
    },
    featured: false,
    sections: [
      {
        title: "About",
        content: "<p>Made for <strong>Three Thing Game</strong> (University of Hull private game jam, November 2022) with Beetroot Studios — a group of five graduates. Theme words: <em>Coal, Workshop, Candy Canes</em>. A parody of a tech mogul who fires 90% of his staff and takes to cooking meals in the workshop to keep the remaining employees from walking out.</p>"
      }
    ]
  },

  {
    id: "prawnageddon",
    title: "Prawnageddon",
    subtitle: "2D Fighter Side-Scroller",
    description: "A 2D fighter side-scroller where you play as a prawn fighting to escape the food chain. Made with Beetroot Studios for Climax Game Jam in support of Mind (theme: Chain).",
    tags: ["Unity", "C#", "Game Jam", "Fighter", "Side-Scroller"],
    category: "game",
    role: "Programmer (team of 6, Beetroot Studios)",
    date: "2022-03",
    images: [],
    video: "",
    links: {
      itch: "https://beetrootgames.itch.io/prawnagedon"
    },
    featured: false,
    sections: [
      {
        title: "About",
        content: "<p>Made for <strong>Climax Game Jam</strong> in support of Mind (the charity), March 2022, with Beetroot Studios. Theme: <em>Chain</em>. Play as the only prawn in the world fed up of their place in the food chain — chain together attacks and dashes to dodge and defeat oncoming predators on your way to the top of the pecking order.</p>"
      }
    ]
  },

  {
    id: "ore-gobbler",
    title: "Ore Gobbler",
    subtitle: "2D Block Mining Survival Game",
    description: "A 2D mining game where you balance sparkler production for profit against defending yourself from ghost miners you accidentally awoke. Made with Beetroot Studios for Three Thing Game (theme: Turkeys, Ghosts, Sparklers).",
    tags: ["Unity", "C#", "Game Jam", "Mining", "Strategy"],
    category: "game",
    role: "Programmer (team of 6, Beetroot Studios)",
    date: "2021-11",
    images: [],
    video: "",
    links: {
      itch: "https://beetrootgames.itch.io/ore-gobbler"
    },
    featured: false,
    sections: [
      {
        title: "About",
        content: "<p>Made for <strong>Three Thing Game</strong> (University of Hull private game jam, November 2021) with Beetroot Studios. Theme words: <em>Turkeys, Ghosts, Sparklers</em>. Mine ores to make sparklers to sell for money — but you've set up camp over the graves of miners past. Their ghosts are coming for you, and their only weakness is sparklers. Balance profit against self-defence as you dig deeper and face more dangerous depths.</p>"
      }
    ]
  },

  // ─── Web ─────────────────────────────────────────────────────────────────

  {
    id: "portfolio-website",
    title: "Portfolio Website",
    subtitle: "Personal Developer Portfolio",
    description: "This site — a code-themed portfolio with dark/light mode, filterable project gallery, image carousels, lightbox gallery, Markdown blog, and individual project detail pages. Built without frameworks.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "web",
    role: "Solo",
    date: "2026-05",
    images: [],
    video: "",
    links: {
      github: "https://github.com/SeminixDev/seminixdev.github.io"
    },
    featured: false,
    sections: [
      {
        title: "About",
        content: "<p>A fully static portfolio site — pure HTML, CSS, and vanilla JavaScript, no frameworks or build tools. Features include dark/light theme toggle, a data-driven project gallery with category filtering and image carousels, a blog system with Markdown content fetched and parsed at runtime using marked.js, individual project detail pages with a keyboard-navigable lightbox gallery, and a responsive mobile layout. Hosted on GitHub Pages.</p>"
      }
    ]
  }

];
