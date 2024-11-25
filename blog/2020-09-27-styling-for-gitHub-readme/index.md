---
slug: styling-for-gitHub-readme
title: Styling for GitHub README
authors: aakhtar3
tags: [css, beginners, github, html]
---

# Styling Tips for README

Markdown has limited styling, but you can leverage some HTML for a better viewing experience on a Github repository.

<!-- truncate -->

## Line Break

#### Markdown

![3 empty space](./img/empty_space.png)

```
3 Empty Spaces`   `
Second line
```

#### HTML

![break](./img/html.png)

```
HTML</br>Second Line
```

## Allign

##### Markdown

![Table markdown](./img/table.png)

```
| Default | <- Left <- | -> Center <- | -> Right -> |
| ------- | :--------- | :----------: | ----------: |
| Text    | Left       | Center       | Right       |
```

##### HTML

![p left](./img/left.png)

```
<p>Left</p>
```

![p center](./img/center.png)

```
<p align="center">Center</p>
```

![p right](./img/right.png)

```
<p align="right">Right</p>
```

![a](./img/right.png)

```
<a><img alt="Left"></a> <a><img align="right" alt="Right"></a>
```

![table](./img/full.png)

```
<table>
<tr>
<td valign="top" width="33%">
<h2 align="center">Col 1</h2>
-----------------------------
-----------------------------
-----------------------------
-----------------------------
</td>
<td width="34%">
<h5 align="center">Col 2</h5>
<p align="center">Missing valign="top"</p>
</td>
<td valign="top" width="33%">
<h2 align="center">Col 3</h2>
-----------------------------
-----------------------------
-----------------------------
-----------------------------
</td>
</tr>
</table>
```