import { exec, execSync } from 'child_process';
import iconv from 'iconv-lite';

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
  const buffer = execSync(command);
  // return buffer;
  console.log('execsync res: ', buffer.toString());
  return iconv.decode(buffer, 'cp936');
}

export { execCommand, execCommandSync };
