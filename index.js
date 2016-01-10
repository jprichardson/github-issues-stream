var assert = require('assert')
var assign = require('object-assign')
var ghGot = require('gh-got')
var Readable = require('stream').Readable
var util = require('util')

'use strict'

// page 0 is invalid, but it's incremented in _read() before the API call
const defaultQueryOptions = { state: 'all', page: 0, direction: 'desc' }

function GithubIssuesStream (repo, options) {
  assert(repo, 'Must set repo.')
  options = assign({}, options)

  var defaultStreamOptions = { objectMode: true }
  Readable.call(this, defaultStreamOptions)

  options.query = assign({}, defaultQueryOptions, options.query)

  this.options = options
  this.url = 'https://api.github.com/repos/' + repo + '/issues'
  this.page = options.query.page
  this.isFetching = false
}
util.inherits(GithubIssuesStream, Readable)

GithubIssuesStream.prototype._read = function () {
  if (this.isFetching) return // don't want to call API while it's currently calling the API
  this.page += 1
  this.options.query.page = this.page

  this.isFetching = true
  ghGot(this.url, this.options)
  .then((res) => {
    this.isFetching = false
    if (!Array.isArray(res.body)) {
      this.emit('error', new Error('Expected result body to be an array.'))
      return this.push(null)
    }
    if (res.body.length === 0) return this.push(null) // DONE
    res.body.forEach((issue) => this.push(issue))
  })
  .catch((err) => {
    this.isFetching = false
    this.emit('error', err)
    this.push(null)
  })
}

function githubIssues (options) {
  return new GithubIssuesStream(options)
}

module.exports = githubIssues
