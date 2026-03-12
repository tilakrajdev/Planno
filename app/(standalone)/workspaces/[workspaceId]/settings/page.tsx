import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingsPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

const WorkspaceIdSettingsPage = async ({
  params,
}: WorkspaceIdSettingsPageProps) => {
  const { workspaceId } = await params;

  if (!workspaceId) {
    redirect("/workspaces");
  }

  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspace = await getWorkspace({ workspaceId });

  if (!workspace) {
    redirect(`/workspaces/${workspaceId}`);
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={workspace} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
