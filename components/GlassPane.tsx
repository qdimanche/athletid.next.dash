import clsx from "clsx";
import {Props} from "@/types/Props"

const GlassPane = ({ children, className }: Props) => {
    return (
        <div
            className={clsx(
                "glass rounded-2xl border-solid border-2 border-gray-200",
                className
            )}
        >
            {children}
        </div>
    );
};

export default GlassPane;