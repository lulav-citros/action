const core = require('@actions/core')
const github = require('@actions/github')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const name = core.getInput('name', { required: true })
    const message = core.getInput('message', { required: true })
    const completions = core.getInput('completions', { required: true })
    const simulations = core.getInput('simulations', { required: true })

    core.info(`name ${name}`)
    core.info(`message ${message}`)
    core.info(`completions ${completions}`)
    core.info(`simulations ${simulations}`)

    // Get the current time and set as an output
    const time = new Date().toTimeString()
    core.setOutput('time', time)

    // Output the payload for debugging
    core.info(
      `The event payload: ${JSON.stringify(github.context.payload, null, 2)}`
    )
  } catch (error) {
    // Fail the workflow step if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
