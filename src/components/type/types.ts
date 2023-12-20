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