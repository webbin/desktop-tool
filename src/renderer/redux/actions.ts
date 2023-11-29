import { actions as CommandListActions } from './CommandListReducer';
import { actions as CommandInfoActions } from './CommandInfoReducer';
import { actions as CommandUseInfoActions } from './CommandUseInfoReducer';

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
} = CommandInfoActions;
const { addCommandUse, updateCommandUse } = CommandUseInfoActions;

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
  updateCommandUse,
};
export { clearExecResult, addExecResult } from './CommandResultList';
