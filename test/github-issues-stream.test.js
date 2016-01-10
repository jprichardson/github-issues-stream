import test from 'ava'
import ghIssues from '../'

// for private repo
const GITHUB_TOKEN = ''

test.cb('fetch issues', (t) => {
  let issues = []
  ghIssues('jprichardson/node-fs-extra', { token: GITHUB_TOKEN })
  .on('data', (issue) => {
    issues.push(issue)
  })
  .on('error', (err) => {
    t.fail(err)
  })
  .on('end', () => {
    t.true(issues.length > 100, 'ensure has issues')
    t.end()
  })
})

test.cb('fetch invalid repo', (t) => {
  let errors = []
  ghIssues('jprichardson/THIS_REPO_DOES_NOT_EXIST', { token: GITHUB_TOKEN })
  .on('data', () => {})
  .on('error', (err) => {
    errors.push(err)
  })
  .on('end', () => {
    t.is(errors.length, 1)
    t.is(errors[0].statusCode, 404)
    t.end()
  })
})
