import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectIdSettingsPageProps {
    params: Promise<{ workspaceId: string; projectId: string }>;
}

const ProjectIdSettingsPage = async ({ params }: ProjectIdSettingsPageProps) => {
    const { projectId } = await params;

    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    const initialValues = await getProject({
        projectId,
    });

    return (
        <div className="w-full lg:max-w-xl">
            Settings Page
        </div>
    );
};

export default ProjectIdSettingsPage;
