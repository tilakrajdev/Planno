import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectSettingsPageProps {
  params: Promise<{ workspaceId: string; projectId: string }>;
}

const ProjectSettingsPage = async ({ params }: ProjectSettingsPageProps) => {
  const { projectId } = await params;

  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({
    projectId,
  });

  return (
    <div className="w-full lg:max-w-xl">
      <h2 className="text-xl font-bold mb-4">Project Settings</h2>
      <p>This is the dedicated Project Settings page.</p>
    </div>
  );
};

export default ProjectSettingsPage;
