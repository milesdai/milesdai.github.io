---
layout: post
title: Personal Website
thumbnail: /assets/img/personal-site/custom-theme.jpg
excerpt: The gory details behind the construction of my personal website -- the one you are reading at this moment!
category:
  - Projects
tags:
---

## Current Technology Stack

The content on this site is generated with [Jekyll](https://jekyllrb.com/) and is styled with the [Bulma](https://bulma.io/) CSS framework. The site itself is served from [Github Pages](https://pages.github.com/). The theme was handcrafted with Bulma.

## History

A few years back, I learned that MIT provided each of its students with the ability host a static site in their student directory. Curious, I began to play around with it and soon hit on the idea of making a personal website to document some of the projects I have worked on.

I am by no means a frontend developer. Initially, I hardcoded the site with HTML, CSS, Javascript, and Bulma and served it from my MIT student directory. Around this time, I began to use Github Pages for [MIT Science Olympiad](https://scioly.mit.edu) and decided that for a sustainable solution, I should migrate away from MIT hosting.

The move to Github pages brought along the usual benefits of version control, but I was also required to make the source code of the site public. Given that there was nothing private on the site anyway, I was okay with that.

![Custom Theme](/assets/img/personal-site/custom-theme.jpg)
*My handcrafted theme made with Bulma*

As the site expanded, and I wanted to make changes, the limitations of using raw HTML became clear. There was repeated code and making stylistic changes often required modifying many files. I had the foresight at the time to generate shared elements across my pages using Javascript (e.g. the navbar), but I began looking into static site generation. Jekyll support is built in to Github Pages, so it was a natural choice. I also decided to try out Jekyll with the [Hydeout](https://github.com/fongandrew/hydeout) theme.

![Hydeout Theme](/assets/img/personal-site/hydeout-theme.jpg)
*Migration to the Hydeout theme*

After migrating the entire site over, several friends and family members expressed a preference for the old site. To be honest, I preferred my original design using Bulma as well. This led to the most recent iteration of the site as of this post which reverts back to my original custom theme but with Jekyll support now.

Some ongoing goals of the site are to improve accessibility and switch to a more privacy-friendly analytics software than Google Analytics.

## Challenges

There were some unexpected challenges in the process of migrating my hardcoded site over to use Jekyll. Documentation was a bit sparse, so I will address some of the challenges I faced here.

### Jekyll and Bulma

Bulma works by assigning classes to HTML elements. For example, to create a section out of a div, you would use `<div class="section">`. The most immediate problem with this is that Jekyll will not assign these class names when it parses the Markdown files. I was not able to find any way to mess with the Markdwon parser, so instead, a workaround is to wrap all my post content in a div with Bulma's `content` class which is designed for this exact purpose. This applies Bulma's stylings onto the HTML tags like h1, h2, etc. This can be done easily using Jekyll layouts. I modified my post layout with the following

```html
<!-- _layouts/post.html -->
<div class="content">
    {% raw %} {{ content }} {% endraw %}
</div>
```
