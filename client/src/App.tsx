import { useEffect, useState } from "react";

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
  );
}
