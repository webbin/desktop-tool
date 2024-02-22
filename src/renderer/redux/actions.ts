import { actions as CommandListActions } from './CommandListReducer';
import { actions as CommandInfoActions } from './CommandInfoReducer';
import { actions as CommandUseInfoActions } from './CommandUseInfoReducer';
import { actions as CommandResultListActions } from './CommandResultList';
import { actions as SpawnListActions } from './SpawnListReducer';

const {
  updateCommand,
  updateCommandTagByKey,
  initCommands,
  addCommand,
  deleteCommand,
} = CommandListActions;

const {
  addSelectedTag,
  deleteSelectedTag,
  clearSeletedTags,
  setSeletedTags,
  putSearchCommand,
  addRunningCommand,
  deleteRunningCommand,
  addRecentRunCommand,
} = CommandInfoActions;
const { addCommandUse, updateCommandUse } = CommandUseInfoActions;
const { updateExecResult, addExecResult, clearExecResult } =
  CommandResultListActions;

const { addSpawn, updateSpawn, deleteSpawn } = SpawnListActions;

export {
  updateCommand,
  updateCommandTagByKey,
  initCommands,
  addCommand,
  deleteCommand,

  //
  addSelectedTag,
  deleteSelectedTag,
  clearSeletedTags,
  setSeletedTags,
  putSearchCommand,
  addCommandUse,
  addRunningCommand,
  deleteRunningCommand,
  updateCommandUse,
  addRecentRunCommand,

  //
  updateExecResult,
  addExecResult,
  clearExecResult,

  // 新建进程运行的命令
  addSpawn,
  updateSpawn,
  deleteSpawn,
};
