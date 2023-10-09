import { CommandData } from '../types';

const COMMAND_KEY = 'COMMAND';

const getLocalCommandList = () => {
  const str = window.localStorage.getItem(COMMAND_KEY);
  if (str) {
    const list = JSON.parse(str) as CommandData[];
    return list;
  }
  return undefined;
};

const saveLocalCommandList = (list: CommandData[]) => {
  const data = JSON.stringify(list);
  window.localStorage.setItem(COMMAND_KEY, data);
};

const deleteLocalCommand = (key: string) => {
  const list = getLocalCommandList();
  if (list) {
    const index = list.findIndex((item) => item.key === key);
    if (index >= 0) {
      list.splice(index, 1);
      saveLocalCommandList(list);
    }
  }
};

const deleteLocalCommandByIndex = (index: number) => {
  const list = getLocalCommandList();
  if (list) {
    if (index >= 0) {
      list.splice(index, 1);
      saveLocalCommandList(list);
    }
  }
};

const addCommandToLocal = (data: CommandData) => {
  const list = getLocalCommandList();
  if (list) {
    const { key } = data;
    const index = list.findIndex((item) => item.key === key);
    if (index < 0) {
      list.push(data);
    }
    saveLocalCommandList(list);
  } else {
    const l = [data];
    saveLocalCommandList(l);
  }
};

const updateCommandByKey = (data: CommandData) => {
  const list = getLocalCommandList();
  if (list) {
    const { key } = data;
    const index = list.findIndex((item) => item.key === key);
    if (index >= 0) {
      list[index] = data;
    }
    saveLocalCommandList(list);
  }
};

export {
  getLocalCommandList,
  saveLocalCommandList,
  addCommandToLocal,
  deleteLocalCommand,
  deleteLocalCommandByIndex,
  updateCommandByKey,
};
