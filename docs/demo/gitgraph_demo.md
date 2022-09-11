# gitgraph demo

[vuepress-plugin-gitgraph-minigram](https://www.npmjs.com/package/vuepress-plugin-gitgraph-minigram)


## Example

```gitgraph
[log]
git commit -m 'initial commit'

git branch feature/1
git branch feature/2

git switch feature/1
git commit -m '1'

git switch feature/2
git commit -m '2'
git commit -m '3'

git switch master
git merge feature/2
git merge feature/1
git tag v1.0.0
```

::: details Source

````
```gitgraph
[log]
git commit -m 'initial commit'

git branch feature/1
git branch feature/2

git switch feature/1
git commit -m '1'

git switch feature/2
git commit -m '2'
git commit -m '3'

git switch master
git merge feature/2
git merge feature/1
git tag v1.0.0
```
````

:::


## Example: error

```gitgraph
[option]
defaultBranch: master
[log]
git commit -m '1'
git switch -c develop
git commit -n '2'
git switch master
git merge develop
```
