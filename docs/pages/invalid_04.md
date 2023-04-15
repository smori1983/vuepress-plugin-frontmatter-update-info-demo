---
update_info:
  date: 2022/07/20
  description:
  - Update text of the page.
  - Update text of the page.
---
# Invalid 04


## Reason

- A record should be defined as the array element.


## Frontmatter source

```
---
update_info:
  date: 2022/07/20
  description:
  - Update text of the page.
  - Update text of the page.
---
```

should be:

```
---
update_info:
  - date: 2022/07/20
    description:
    - Update text of the page.
    - Update text of the page.
---
```
