import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.js";
import { ProtoUserStructure } from "../model/user.model.js";
import { UserRepo } from "../services/repository/user.repo.js";
import * as ac from "../reducer/user.action.creator";

export function useUsers(repo: UserRepo) {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const regUser = async (user: ProtoUserStructure) => {
    try {
      const newUser = await repo.registerUser(user);
      dispatch(ac.addCreator(newUser));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const logUser = async (user: ProtoUserStructure, token: string) => {
    try {
      const newUser = await repo.loginUser(user, token);
      dispatch(ac.addCreator(newUser));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    users,
    regUser,
    logUser,
  };
}
