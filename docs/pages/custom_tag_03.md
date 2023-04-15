---
update_info:
- date: 2022/09/01
  description:
    - Update information.
- date: 2022/08/31
  description:
    - Update information.
---
# Custom tag 03


## Case

- Custom tag used inside of other markdown notations.


## Container

Container notation is provided by `markdown-it-container` plugin.

Tag is processed, because the container is renderer and processed later than block rule.

:::tip
[[update_info]]
:::

Example to avoid being processed (surround by back quote):

:::tip
`[[update_info]]`
:::


## Code block

Tag is not processed if written inside of code block.

```
[[update_info]]
```


## Table

Tag is not processed if written inside of table cell.

| key  | value           |
|------|-----------------|
| key1 | [[update_info]] |


## List

Tag is not processed if written as part of list item.

- [[update_info]]
- [[update_info]]
