// import type { CSSProperties } from "react";

import { useEffect, useState } from "react";

// import { AppSidebar } from "@/components/app-sidebar";
// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { DataTable } from "@/components/data-table";
// import { SectionCards } from "@/components/section-cards";
// import { SiteHeader } from "@/components/site-header";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import data from "@/app/dashboard/data.json";
interface ProjectResponse {
  success: boolean;
  count: number;
  data: ProjectData[];
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
}

export default function App() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/projects");

        if (!response.ok) throw new Error("Failed");
        const projectData: ProjectResponse = await response.json();
        setProjects(projectData.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load projects...",
        );
      }
    };
    getProjectData();
  }, []);

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  return (
    <div className="flex gap-10 p-5">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-indigo-200 p-5 w-60 h-auto rounded-2xl"
        >
          <img
            src="https://static-assets.codecademy.com/assets/homepage/hero/v3/self-mobile.webp"
            alt=""
          />
          <h1 className="font-bold">{project.title}</h1>
          <p className="text-gray-600 mb-3">{project.description}</p>

          <div className="flex flex-wrap">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="bg-amber-200 m-1 p-1 rounded-lg"
              >
                {technology}
              </span>
            ))}
          </div>

          <p>{project.featured}</p>
        </div>
      ))}
    </div>

    // <TooltipProvider>
    //   <SidebarProvider
    //     style={
    //       {
    //         "--sidebar-width": "calc(var(--spacing) * 72)",
    //         "--header-height": "calc(var(--spacing) * 12)",
    //       } as CSSProperties
    //     }
    //   >
    //     <AppSidebar variant="inset" />
    //     <SidebarInset>
    //       <SiteHeader />
    //       <main className="flex flex-1 flex-col">
    //         <div className="@container/main flex flex-1 flex-col gap-2">
    //           <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
    //             <SectionCards />
    //             <div className="px-4 lg:px-6">
    //               <ChartAreaInteractive />
    //             </div>{" "}
    //             *
    //             <DataTable data={data} />
    //           </div>
    //         </div>
    //       </main>
    //     </SidebarInset>
    //   </SidebarProvider>
    // </TooltipProvider>
  );
}
