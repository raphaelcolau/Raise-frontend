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