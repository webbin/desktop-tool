import {
  exec,
  execSync,
  spawn,
  ChildProcessWithoutNullStreams,
} from 'child_process';
import iconv from 'iconv-lite';

import DataUtils from '../../utils/DataUtils';

const options = {
  shell: 'C:\\Program Files\\Git\\bin\\bash.exe',
};

function setShellPath(path: string) {
  const p = path.replaceAll('\\', '\\\\');
  console.log('path to set: ', p);
  options.shell = path;
}

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

function execCommandAsync(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, { ...options, encoding: 'buffer' }, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      // console.log('exec command async , result ', res);
      const str = iconv.decode(res, 'cp936');
      resolve(str);
    });
  });
}

const processMap: { [key: string]: ChildProcessWithoutNullStreams } = {};

type SpawnData = {
  command: string;
  args?: string[];
  opts?: any;
};

type SpawnCallback = {
  onResponse: (id: string, result: string) => void;
  onError: (id: string, err: string) => void;
  onClose: (id: string) => void;
};

function execSpawn(spawnData: SpawnData, callbacks: SpawnCallback) {
  const processId = DataUtils.UUID();

  const proc = spawn(spawnData.command, spawnData.args, spawnData.opts);

  proc.stdout.on('data', (data) => {
    callbacks.onResponse(processId, data);
  });

  proc.stderr.on('data', (data) => {
    callbacks.onError(processId, data);
  });

  proc.on('close', (code) => {
    // close
    console.log('spawn exec close command: ', spawnData.command);
    console.log('spawn exec close ', code);

    callbacks.onClose(processId);
    delete processMap[processId];
    // proc.stdin.end();
  });

  processMap[processId] = proc;

  return processId;
}

const stopSpawn = (id: string) => {
  const proc = processMap[id];
  if (proc) {
    return proc.kill();
  }
  return true;
};

export {
  execCommand,
  execCommandAsync,
  execCommandSync,
  execSpawn,
  stopSpawn,
  setShellPath,
};
