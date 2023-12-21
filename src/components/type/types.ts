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
