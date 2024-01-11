export interface WithThemeProps {
    theme: any;
    children?: React.ReactNode;
    style?: any;
    id?: string;
}

export enum GENDER {
    MAN,
    WOMAN,
    NOT_SPECIFIED
}

export enum EXERCISE_STATUS {
    NOT_STARTED = 'NOT_STARTED',
    STARTED = 'STARTED',
    COMPLETED = 'COMPLETED',
}

export enum DAYS {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY'
}

export enum TRAINING_STATUS {
    CANCELLED = 'CANCELLED',
    IN_PROGRESS = 'IN_PROGRESS',
    PERFORMED = 'PERFORMED',
}

export type User = {
    username: string;
    role: Array<string>;
    email: string;
    id: number;
};

export interface SignUpForm {
    username: string;
    password: string;
    gender: GENDER;
    email: string;
}

export type SignUpPropsRes = {
    success: boolean;
    message: string;
    data: {
        id: number;
        username: string;
        email: string;
        gender: GENDER;
    };
}

export interface SignInForm {
    username: string;
    password: string;
}

export type SignInPropsRes = {
    success: boolean;
    message: string;
    data?: {
        id: number;
        username: string;
        email: string;
        roles: Array<string>;
        accessToken: string;
        tokenType: string;
        refreshToken: string;
    };
}

export type Training = {
    day: any;
    numberOfExercise: number;
    trainingDays: Array<DAYS>;
    trainingExercises: Array<Exercise>;
    trainingIconHexadecimalColor: string;
    trainingIconName: string;
    trainingId: number;
    trainingName: string;
    trainingStatus: null | TRAINING_STATUS;
};

export type Exercise = {
    exerciseId: number;
    exerciseName: string;
    exerciseState: EXERCISE_STATUS
    series: Array<Series>;
};

export type Series = {
    completed: boolean;
    id: number;
    positionIndex: number;
    repsCount: number;
    restTime: string;
    weight: number;
}

export interface CreateTrainingProps {
    name: string;
    description: string;
    trainingDays: Array<DAYS>;
    sportPreset: string | null;
    startDate: string | null;
    endDate: string | null;
    hasWarmUp: boolean;
    hasStretching: boolean;
    iconName: string;
    iconHexadecimalColor: string;
};