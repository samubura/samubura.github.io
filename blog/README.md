# Notes (disabled)

The blog is turned off in `docusaurus.config.js` (`blog: false`), but everything needed to
bring it back is still here.

To start writing again:

1. In `docusaurus.config.js`, swap `blog: false` for the commented-out `blog: {...}` block
   right above it.
2. Uncomment the `/blog` navbar item and the RSS footer link in the same file.
3. Add a post here as `YYYY-MM-DD-slug.md` with front matter:

```md
---
slug: my-post
title: My post
authors: [samuele]
tags: [notes]
---

Intro paragraph shown in the list.

{/* truncate */}

The rest of the post.
```

Author details live in `authors.yml`.
