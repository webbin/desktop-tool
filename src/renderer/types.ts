type CommandData = {
  title?: string;
  command: string;
  key: string;
  tag?: string;
};

type CommandResultInfo = {
  command: string;
  result: string;
  startTimestamp: number;
  endTimestamp: number;
  running: boolean;
};

type CommandSearchInfo = {
  keyword: string;
  tag: string;
};

type CommandSearchMap = {
  [key: string]: CommandSearchInfo;
};

export { CommandData, CommandResultInfo, CommandSearchInfo, CommandSearchMap };
