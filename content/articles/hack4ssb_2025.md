---
title: Winning Hack4SSB 2025 with the VektorVikings
date: 2025-01-20
summary: How a cross-team crew at Statistics Norway fused vector search, MCP tooling, and clear interfaces to win the yearly hackathon.
image: /images/article-3.svg
readingTime: 3
tags:
  - modernization
  - mcp
  - hackathon
featured: true
---

🚀 This year’s Hack4SSB was a blast! 🎉 \
Hack4SSB = Statistics Norway’s yearly internal hackathon

I got to team up with a bunch of friendly dudes from other departments, some of whom have just recently started working for SSB. I was very impressed of how adaptable, humble and inventive everyone was, how easily the communication, github and other worked flowed. We early on defined "data-interfaces" (see green and blue points in the architecture slide) where parallell work was possible before and after these layers, so we could often split the team into 2-3 smaller groups while working.

![Architecture of the VektorVikings solution](/articles/hack4ssb_2025/ssb_vektor_architecture.jpeg)

## Our project:
1. Build a vector-embedding–based search across SSB’s content (articles + one 140-page PDF for the hack).
2. Wrap it in an API that not only serves search + full documents, but also exposes an MCP server so an AI/LLM can use it as tools.

![The search with distance](/articles/hack4ssb_2025/ssb_vektor_distance.jpeg)

## The Techstack
- Own code and Docling for data-collection , -filtering and -unification [Docling Github](https://github.com/docling-project/docling) 
- NB-SBERT-BASE from the AI-lab at the Nasjonalbiblioteket | The National Library of Norway used for doing the vectorization [Linkedin page of National Library](https://www.linkedin.com/company/nasjonalbiblioteket-the-national-library-of-norway/)
- The extension sqlite_vec and sqlite to create a .db file. [Sqlite Vec Github](https://github.com/asg017/sqlite-vec)
- FastAPI + FastAPI-MCP to host the API that distributes the database's content [FastAPI MCP Github](https://github.com/tadata-org/fastapi_mcp)
- A demo website for search, copying the design of ssb.no, turned into a jinja-template also hosted by another fastapi-instance.
- We demoed the MCP using Claude locally on the desktop (we generated an http-stdio bridge using AI, so that Claude works even without a subscription).



🏆Oh, and yes. We won the jury prize :)


![Talking to the MCP with Claude locally](/articles/hack4ssb_2025/claude_ssb_tool.jpeg)


[Linkedin Post mirroring content here](https://www.linkedin.com/posts/carl-corneil-4312098_this-years-hack4ssb-was-a-blast-activity-7375777931467505664-c4O-?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAF0VyUBdrGG8-FuXJm0WAX4jPU4gHEdks0)