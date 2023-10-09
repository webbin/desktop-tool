type CommandData = {
  title?: string;
  command: string;
  key: string;
};

type CommandResultInfo = {
  command: string;
  result: string;
  timestamp: number;
};

export { CommandData, CommandResultInfo };
