import { actions as CommandListActions } from './CommandListReducer';
import { actions as CommandInfoActions } from './CommandInfoReducer';

const {
  updateCommand,
  updateCommandTagByKey,
  initCommands,
  addCommand,
  deleteCommand,
} = CommandListActions;

const { addSelectedTag, deleteSelectedTag, clearSeletedTags, setSeletedTags } =
  CommandInfoActions;

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
};
export { clearExecResult, addExecResult } from './CommandResultList';
