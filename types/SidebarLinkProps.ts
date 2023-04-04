import {Calendar, Grid, Settings, User} from "react-feather";

const icons = { Settings, User, Grid, Calendar };

export interface SidebarLinkProps {
    link: {
        link: string;
        icon: keyof typeof icons;
    };
}