var ghIssues = require('./')
var repo = 'jprichardson/node-fs-extra'

var token = ''

console.log('\nfetching %s issues...\n', repo)

ghIssues(repo, { token: token })
.on('data', function (issue) {
  console.log('  #%d: %s', issue.number, issue.title)
})
.on('error', function (err) {
  console.log('ERROR: ' + err)
})
.on('end', function () {
  console.log('\ndone!\n')
})
