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

Provided by `markdown-it-container` plugin.

Tag is processed, because the container is renderer and processed later than block rule.

:::tip
[[update_info]]
:::

Example to avoid being processed (surround by back quote):

:::tip
`[[update_info]]`
:::


## Code block

Tag is not processed.

```
[[update_info]]
```


## Table

Tag is not processed.

| key  | value           |
|------|-----------------|
| key1 | [[update_info]] |


## List

Tag is not processed.

- [[update_info]]
- [[update_info]]
