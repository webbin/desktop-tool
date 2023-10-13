import { actions as CommandListActions } from './CommandListReducer';

const {
  updateCommand,
  updateCommandTagByIndex,
  initCommands,
  addCommand,
  deleteCommand,
} = CommandListActions;
export {
  updateCommand,
  updateCommandTagByIndex,
  initCommands,
  addCommand,
  deleteCommand,
};
export { setExecResult } from './CommandInfoReducer';
export { clearExecResult, addExecResult } from './CommandResultList';
