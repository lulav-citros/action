/**
 * Unit tests for the action's main functionality, src/main.js
 */
const core = require('@actions/core')
const github = require('@actions/github')
const main = require('../src/main')

// Mock the GitHub Actions core library
const infoMock = jest.spyOn(core, 'info').mockImplementation()
const getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Other utilities
const timeRegex = /^\d{2}:\d{2}:\d{2}/

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets the time output', async () => {
    // Mock the action's inputs
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'name':
          return 'citros'
        case 'message':
          return 'default message from github action'
        case 'completions':
          return 1
        case 'simulation':
          return 'simulation'
        case 'notebook':
          return 'notebook'
        default:
          throw new Error('Something went wrong...')
      }
    })

    // Mock the action's payload
    github.context.payload = {}

    await main.run()
    expect(runMock).toHaveReturned()

    // console.log(setOutputMock.mock)
    expect(setOutputMock).toHaveBeenLastCalledWith(
      'time',
      expect.stringMatching(timeRegex)
    )
  })

  it('logs the event payload', async () => {
    // Mock the action's inputs
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'name':
          return 'citros'
        case 'message':
          return 'default message from github action'
        case 'completions':
          return 1
        case 'simulation':
          return 'simulation'
        case 'notebook':
          return 'notebook'
        default:
          throw new Error('Something went wrong...')
      }
    })

    // Mock the action's payload
    github.context.payload = {
      actor: 'vovacooper'
    }

    await main.run()
    expect(runMock).toHaveReturned()

    expect(infoMock).toHaveBeenCalledWith(
      `The event payload: ${JSON.stringify(github.context.payload, null, 2)}`
    )
  })

  it('sets a failed status', async () => {
    // Mock the action's inputs
    getInputMock.mockImplementation(name => {
      switch (name) {
        default:
          throw new Error('Something went wrong...')
      }
    })

    // Mock the action's payload
    github.context.payload = {
      actor: 'vovacooper'
    }

    await main.run()
    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenCalledWith('Something went wrong...')
  })
})
