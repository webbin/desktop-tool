import { exec } from 'child_process';

function execCommand(command: string) {
  exec(command, (err, res) => {
    if (err) {
      console.log('exec command ', command, ',  error ', err);
      return;
    }
    console.log('exec command ', command, ',  result ', res);
  });
}

export {
  execCommand,
}
