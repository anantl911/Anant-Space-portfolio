import type { Project } from '@/types/models/project';

const projects: Project[] = [
  {
    _id: "6a1f22e63f3da4346a868606",
    title: "HADES - FAS",
    description: [
      "HADES is a plug and play Face Authentication Solution, a SaaS made available on a token access basis for active liveness and Virtual Camera attack detection powered by MobileNet V3 and XCeptionNet CNN.",
      "My role required me to build an end to end SaaS platform from Frontend to Backend, including a plug & play NPM module development as part of our SaaS, with RazorPay integration, and model integration.",
      "Collaborated in a team four to build a dataset of 2500 images, involving 25 subjects and helped train MobileNet V3 Neural Network model, achieving an accuracy of 97.5%"
    ],
    techTags: {
      general: [],
      frontend: ["reactjs", "tailwindcss", "shadcn", "javascript"],
      backend: ["expressjs", "nodejs"],
      database: ["posgressql", "prismaorm"],
      desktop: [],
      others: []
    },
    designatedTag: {
      tag: "FY_PROJECT",
      detail: null
    },
    visibleFor: ["everyone"],
    screenshots: [
      "https://res.cloudinary.com/diddxcfh1/image/upload/v1780755795/hades1_ekx74x.avif",
      "https://res.cloudinary.com/diddxcfh1/image/upload/v1780755795/hades3_ab7blf.avif",
      "https://res.cloudinary.com/diddxcfh1/image/upload/v1780755794/hades2_ugdjsx.avif"
    ],
    startedAt: "2024-01-07T18:30:00.000Z",
    finishedAt: "2025-01-05T18:30:00.000Z",
    priority: 1,
    createdAt: "2026-06-02T18:37:26.676Z",
    updatedAt: "2026-06-02T18:37:26.676Z",
    __v: 0
  },
  {
    _id: "6a1fe8aad74324e19a4cb755",
    title: "AI Interview Platform",
    description: [
      "AI Interview is a platform for Q&A based interview preparation. Users generate interview questions of topic of their choice, powered by MERN stack and Google Gemini Flash model."
    ],
    techTags: {
      general: [],
      frontend: ["reactjs", "tailwindcss", "shadcn", "javascript"],
      backend: ["expressjs", "nodejs"],
      database: ["mongodb"],
      desktop: [],
      others: ["google/genai"]
    },
    designatedTag: {
      tag: "",
      detail: null
    },
    visibleFor: ["everyone"],
    screenshots: [
      "https://res.cloudinary.com/diddxcfh1/image/upload/v1780756164/aiplat1_kyve32.avif",
      "https://res.cloudinary.com/diddxcfh1/image/upload/v1780756167/aiplat2_imwykf.avif"
    ],
    startedAt: "2025-04-02T18:30:00.000Z",
    finishedAt: "2025-04-03T18:30:00.000Z",
    priority: 2,
    createdAt: "2026-06-03T08:41:14.156Z",
    updatedAt: "2026-06-03T08:41:14.156Z",
    __v: 0
  },
  {
    _id: "6a2005669c35da88327c3ac3",
    title: "StoreIt - Storage Solution",
    description: [
      "With features like virus scanning, RAG based file search and LLM integration. StoreIt is a secure cloud file storage system made using React, NextJs and TailwindCSS"
    ],
    techTags: {
      general: ["nextjs"],
      frontend: ["reactjs", "tailwindcss", "shadcn", "javascript"],
      backend: [],
      database: ["appwrite/tabledb"],
      desktop: [],
      others: ["appwrite/storagebucket"]
    },
    designatedTag: {
      tag: "",
      detail: null
    },
    visibleFor: ["everyone"],
    screenshots: [
      "https://res.cloudinary.com/diddxcfh1/image/upload/v1780756281/sit1_n0fgxr.avif",
      "https://res.cloudinary.com/diddxcfh1/image/upload/v1780756288/sit2_ctdaoz.avif",
      "https://res.cloudinary.com/diddxcfh1/image/upload/v1780756440/sit3_hbkjja.avif",
      "https://res.cloudinary.com/diddxcfh1/image/upload/v1780756562/sit4_vfb68y.avif"
    ],
    startedAt: "2025-01-05T18:30:00.000Z",
    finishedAt: "2025-02-07T18:30:00.000Z",
    priority: 3,
    createdAt: "2026-06-03T10:43:50.276Z",
    updatedAt: "2026-06-03T10:43:50.276Z",
    __v: 0
  },
  {
    _id: "6a2020a355801d75a7cafbdb",
    title: "SussyGeek",
    description: [
      "Made for GeeksForGeeks, an extension and a ranking platform, SussyGeeks allows institution wide student searching, ranking and QOL  fixes to GFG.",
      "Powered by Distributed Scrapping engine to reduce scrapping time linearly without reverse proxies. Multiple people can scrape institute data hassle free.",
      "Quality of life features like bookmarking problems, note-making and custom celebration window, as well full-name based searching."
    ],
    techTags: {
      general: ["typescript"],
      frontend: ["reactjs", "tailwindcss", "shadcn"],
      backend: ["nodejs", "expressjs"],
      database: ["appwrite/tabledb", "redis"],
      desktop: [],
      others: []
    },
    designatedTag: {
      tag: "",
      detail: null
    },
    visibleFor: ["everyone"],
    screenshots: [
      "https://res.cloudinary.com/diddxcfh1/image/upload/v1780756752/sg1_d65sa4.avif",
      "https://res.cloudinary.com/diddxcfh1/image/upload/v1780756752/sg2_imiznk.avif"
    ],
    startedAt: "2025-01-07T18:30:00.000Z",
    finishedAt: "2025-01-09T18:30:00.000Z",
    priority: 4,
    createdAt: "2026-06-03T12:40:03.127Z",
    updatedAt: "2026-06-03T12:40:03.127Z",
    __v: 0
  },
  {
    _id: "6a2039e8b82364a6b12876c2",
    title: "Cellular Automaton",
    description: [
      "Implementation of Conway's Game of Life, Langton Ant and Predator vs Prey, popular CA models as part of Project Based Learning (PBL).",
      "Introduced Perlin's Noise for natural terrain generation and image input in C++ using OpenCV.",
      "Introduced vertex mode, generation count and graph to visualize cell population growth. All implemented using C++ and SFML."
    ],
    techTags: {
      general: ["c++", "sfml", "opencv"],
      frontend: [],
      backend: [],
      database: [],
      desktop: [],
      others: []
    },
    designatedTag: {
      tag: "",
      detail: null
    },
    visibleFor: ["everyone"],
    screenshots: [
      "https://res.cloudinary.com/diddxcfh1/image/upload/v1780759600/00SCI-CONWAY-zucconi-image-jumbo_ivlkzl.jpg"
    ],
    startedAt: "2025-01-05T18:30:00.000Z",
    finishedAt: "2025-01-09T18:30:00.000Z",
    priority: 6,
    createdAt: "2026-06-03T14:27:52.598Z",
    updatedAt: "2026-06-03T14:27:52.598Z",
    __v: 0,
    links: {
      youtube: "youtube.com",
      as_blog: "test",
      deployment: "fasfasf",
      github: "sdadas"
    }
  }
];

export default projects;
