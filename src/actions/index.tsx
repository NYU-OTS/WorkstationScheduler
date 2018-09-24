import * as constants from '../constants'
import { Workstation, User } from "./../components/Workstation"

export interface ChangeDay {
    type: constants.CHANGE_DAY;
    newDay: number;
}

export interface UpdateWorkstations {
    type: constants.UPDATE_WORKSTATIONS;
    newWorkstations: Workstation[];
}

export interface UpdateFieldValue {
    type: constants.UPDATE_FIELD_VALUE;
    newValue: string;
}

export interface ChangeUser {
    type: constants.CHANGE_USER;
    newUserName: string;
}

export interface AddUser {
    type: constants.ADD_USER;
    newUsers: User[];
}

export type SchedulerAction = ChangeDay | UpdateWorkstations | ChangeUser | AddUser;
export type NameFormAction = UpdateFieldValue;

export function changeDay(day: number): ChangeDay {
    return {
        type: constants.CHANGE_DAY,
        newDay: day
    }
}

export function updateWorkstations(workstations: Workstation[]): UpdateWorkstations {
    return {
        type: constants.UPDATE_WORKSTATIONS,
        newWorkstations: workstations
    }
}

export function updateFieldValue(value: string): UpdateFieldValue {
    return {
        type: constants.UPDATE_FIELD_VALUE,
        newValue: value
    }
}

export function changeUser(userName: string): ChangeUser {
    return {
        type: constants.CHANGE_USER,
        newUserName: userName
    }
}

export function addUser(users: User[]): AddUser {
    return {
        type: constants.ADD_USER,
        newUsers: users
    }
}