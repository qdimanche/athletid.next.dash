import clsx from "clsx";
import {FC} from "react";

export interface InputProps
    extends React.HTMLAttributes<HTMLInputElement>{
    required?: boolean;
    value?: string;
    type?: string
}

const Input : FC<InputProps> = ({ className, ...props }) => {
    return (
        <input
            className={clsx(
                "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
                className
            )}
            {...props}
        />
    );
};

export default Input;