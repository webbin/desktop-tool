/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

type UserDetail = {
  huan_id: string;
  token: string;
  login_type: string;
  login_account: string;
  user_nickname: string;
  headurl: string;
  tid: string;
  isLogIn: string;
};

type UserVIPData = { endTime: number; startTime: number; trialState: string; vipState: string };

type UserDataState = {
  userDetail: UserDetail;
  userVIPData: UserVIPData;
};

const InitialState: UserDataState = {
  userDetail: {
    huan_id: '',
    token: '',
    login_type: '',
    login_account: '',
    user_nickname: '',
    headurl: '',
    tid: '',
    isLogIn: '',
  },
  userVIPData: {
    endTime: 0,
    startTime: 0,
    trialState: '',
    vipState: '',
  },
};

const setUserDetail = createAction<UserDetail>('setUserDetail');
const setUserVIPData = createAction<UserVIPData>('setUserVIPData');

const UserDataReducer = createReducer(InitialState, (builder) => {
  builder
    .addCase(setUserDetail, (state, action) => {
      state.userDetail = action.payload;
    })
    .addCase(setUserVIPData, (state, action) => {
      state.userVIPData = action.payload;
    });
});

export default UserDataReducer;
export { setUserDetail, setUserVIPData };
