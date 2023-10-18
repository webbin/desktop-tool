import { exec, execSync } from 'child_process';
import iconv from 'iconv-lite';

const options = {
  shell: 'C:\\Program Files\\Git\\bin\\bash.exe',
};
function execCommand(command: string) {
  exec(command, options, (err, res) => {
    if (err) {
      console.log('exec command ', command, ',  error ', err.message);
      return;
    }
    console.log('exec command ', command, ',  result ', res);
  });
}

function execCommandSync(command: string) {
  let res = '';
  try {
    const buffer = execSync(command, options);
    // return buffer;
    res = iconv.decode(buffer, 'cp936');
    console.log('execsync res: ', res);
  } catch (error) {
    res = (error as Error).message;
  }
  return res;
}

export { execCommand, execCommandSync };
