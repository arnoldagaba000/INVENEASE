import { Breadcrumb } from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

const Header = () => (
    <header className="items-center-safe flex h-16 shrink-0 border-b px-4">
        <div className="items-center-safe flex gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
                className="mr-2 data-[orientation=vertical]:h-4"
                orientation="vertical"
            />

            <Breadcrumb />
        </div>
    </header>
);

export default Header;
