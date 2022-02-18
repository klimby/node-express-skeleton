const {Command} = require('commander');
const program = new Command();
const axios = require('axios');
const stream = require('stream');

program.name('string-util').
        description('CLI to some JavaScript string utilities').
        version('0.8.0');

program.argument('<name>').
        description('Split a string into substrings and display as an array').
        action((name, options, command) => {
          console.log(name);
          console.log(options);
//  console.log(command);
          requestToServer(name);
        });

program.parse();


async function requestToServer(cmd) {
  try {
    const response = await axios.get(`http://0.0.0.0:3000/version`);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}
