---
title: A new website for Skogens Verksted - our farm
date: 2025-11-13
summary: Replacing our old wordpress site with a modern static site built with React like this one.
type: Web
tags:
  - javascript
  - React
  - Email
  - Forms
image: /images/skogens_verksted_react_site.png
repository: https://github.com/aecorn/skogens_verksted_site
githubRepo: aecorn/skogens_verksted_site
secondaryPage: https://www.skogensverksted.no
secondaryPageLabel: The website
featured: true
---

After developing this site, I felt it was time to replace the old Wordpress site for our farm, Skogens Verksted, with a modern static site built with React.

I was able to reuse a good part of the work on this site, but new challenges arose, such as integrating with email services for contact forms and setting up hosting that could handle form submissions.

![Screenshot of the Skogens Verksted website](/images/skogens_verksted_react_site.png)

The most challenging part was setting up the email forms. Mail is handled with Migadu, the forms are secured with Cloudflare's Turnstile, and the site is hosted on my own homelabbed server that I have plugged in the back room here. A cronjob regularly pulls updates from GitHub and deploys the site.

Some work was put into refining the texts on the site, making it work on smaller screens and following Norwegian law regarding alcohol sales and marketing.