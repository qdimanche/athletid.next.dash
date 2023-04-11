import clsx from "clsx";
import {Props} from "@/types/Props";

const Card = ({ className, children }:Props) => {
    return (
        <div
            className={clsx(
                "rounded-3xl py-4",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;