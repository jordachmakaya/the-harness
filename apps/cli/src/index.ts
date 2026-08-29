#!/usr/bin/env node

import { Command } from "commander";

const program = new Command()
  .name("the-harness")
  .description("Local agent-harness command line interface")
  .version("0.1.0");

program.parse();
