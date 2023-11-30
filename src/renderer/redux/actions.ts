import { actions as CommandListActions } from './CommandListReducer';
import { actions as CommandInfoActions } from './CommandInfoReducer';
import { actions as CommandUseInfoActions } from './CommandUseInfoReducer';
import { actions as CommandResultListActions } from './CommandResultList';

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
} = CommandInfoActions;
const { addCommandUse, updateCommandUse } = CommandUseInfoActions;
const { updateExecResult, addExecResult, clearExecResult } =
  CommandResultListActions;

export {
  updateCommand,
  updateCommandTagByKey,
  initCommands,
  addCommand,
  deleteCommand,
  addSelectedTag,
  deleteSelectedTag,
  clearSeletedTags,
  setSeletedTags,
  putSearchCommand,
  addCommandUse,
  addRunningCommand,
  deleteRunningCommand,
  updateCommandUse,

  //
  updateExecResult,
  addExecResult,
  clearExecResult,
};
