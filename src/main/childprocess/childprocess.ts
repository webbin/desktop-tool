import { exec, execSync } from 'child_process';

function execCommand(command: string) {
  exec(command, (err, res) => {
    if (err) {
      console.log('exec command ', command, ',  error ', err);
      return;
    }
    console.log('exec command ', command, ',  result ', res);
  });
}

function execCommandSync(command: string) {
  return execSync(command).toString();
}

export { execCommand, execCommandSync };
