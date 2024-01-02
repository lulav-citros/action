# CITROS Action

[![Lint Codebase](https://github.com/lulav-citros/action/actions/workflows/linter.yml/badge.svg)](https://github.com/lulav-citros/action/actions/workflows/linter.yml)

![CI](https://github.com/actions/hello-world-javascript-action/actions/workflows/ci.yml/badge.svg)


This is the offitial action from CITROS. use this action to run your CITROS project on github. 


## Usage

Here's an example of how to use this action in a workflow file:

```yaml
name: Example Workflow

on:
  workflow_dispatch:
    inputs:
      name:
        description: the name of the batch run
        required: true
        default: 'citros'
        type: string
      message:
        description: the message of the batch run
        required: true
        default: 'default message from github action'
        type: string
      completions:
        description: how many simulations will run 
        required: true
        default: 1
        type: number
      simulation:
        description: the simulation name to run (must be one of the files under `.citros/simulations`)
        required: true
        default: 'simulation'
        type: string
      notebook:
        description: the notebooks to render to report after the simulations finish to run
        type: list

jobs:
  run:
    name: Say Hello
    runs-on: ubuntu-latest

    steps:
      # Change @main to a specific commit SHA or version tag, e.g.:
      # actions/hello-world-javascript-action@e76147da8e5c81eaf017dede5645551d4b94427b
      # actions/hello-world-javascript-action@v1.2.3
      - name: Print to Log
        id: print-to-log
        uses: actions/citros@main
        with:
          name: ${{ inputs.name }}
          message: ${{ inputs.message }}
          completions: ${{ inputs.message }}
          simulation: ${{ inputs.message }}
          notebook: ${{ inputs.notebook }}
```

For example workflow runs, check out the
[Actions tab](https://github.com/actions/hello-world-javascript-action/actions)!
:rocket:

## Inputs

| Input          | Default | Description                     |
| -------------- | ------- | ------------------------------- |
| `who-to-greet` | `World` | The name of the person to greet |

## Outputs

| Output | Description             |
| ------ | ----------------------- |
| `time` | The time we greeted you |

The recorded data from the simulations and the generated report will be locates in the Actions Github artifact.
