import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";
import { Separator } from "./components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { ModeToggle } from "./components/ModeToggle";

export const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {window.location.pathname.split("/")[1] && (
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={`${window.location.origin}`}>
                      {window.location.pathname.split("/")[1]}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                {window.location.pathname.split("/").length > 2 &&
                  window.location.pathname
                    .split("/")
                    .slice(2)
                    .map((segment, index) => {
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbLink
                              href={`${window.location.origin}/${segment}`}
                            >
                              <BreadcrumbPage>{segment}</BreadcrumbPage>
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                        </div>
                      );
                    })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-4">
            <ModeToggle />
          </div>
        </header>
        <main className="mx-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
