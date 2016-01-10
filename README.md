github-issues-stream
====================
> Readable GitHub issues stream.

Install
-------

    npm i --save github-issues-stream


Usage
-----

### githubIssues(repo, [options])

Returns a [Readable Stream](https://nodejs.org/dist/latest-v5.x/docs/api/stream.html#stream_class_stream_readable)
of [Github Issue objects](https://developer.github.com/v3/issues/#response-1).

Parameters:
- `repo`: The repo containing the issues you want to fetch.
- `options`:
  - `token`: For private repos, you must specify a token. Can be generated here: https://github.com/settings/tokens
  - `query`: Github API issues [query parameters](https://developer.github.com/v3/issues/#parameters-1).


**Example:**

```js
var githubIssues = require('github-issues-stream')
var repo = 'jprichardson/node-fs-extra'

console.log('\nfetching %s issues...\n', repo)

githubIssues(repo)
.on('data', function (issue) {
  console.log('  #%d: %s', issue.number, issue.title)
})
.on('error', function (err) {
  console.log('ERROR: ' + err)
})
.on('end', function () {
  console.log('\ndone!\n')
})
```


License
-------

MIT

Copyright (c) [JP Richardson](https://github.com/jprichardson)
