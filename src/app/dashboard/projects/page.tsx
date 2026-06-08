"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, FolderOpen, Edit, Trash2, Globe, Server, Database } from "lucide-react";
import { useState, useEffect } from "react";
import { createProject, getProjects, updateProject, deleteProject } from "@/lib/project-actions";
import { toast } from "sonner";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<any>(null);
  const [projectToEdit, setProjectToEdit] = useState<any>(null);
  
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [newProjectType, setNewProjectType] = useState<'frontend' | 'backend' | 'fullstack'>('frontend');
  const [newFrontendProvider, setNewFrontendProvider] = useState("vercel");
  const [newBackendProvider, setNewBackendProvider] = useState("render");
  const [newDatabaseProvider, setNewDatabaseProvider] = useState("supabase");
  const [newPublicUrl, setNewPublicUrl] = useState("");
  const [newApiUrl, setNewApiUrl] = useState("");
  const [newFrontendDashboardUrl, setNewFrontendDashboardUrl] = useState("");
  const [newBackendDashboardUrl, setNewBackendDashboardUrl] = useState("");
  const [newDatabaseDashboardUrl, setNewDatabaseDashboardUrl] = useState("");
  const [newFrontendFramework, setNewFrontendFramework] = useState("");
  const [newBackendFramework, setNewBackendFramework] = useState("");

  const [editProjectName, setEditProjectName] = useState("");
  const [editProjectDesc, setEditProjectDesc] = useState("");
  const [editProjectType, setEditProjectType] = useState<'frontend' | 'backend' | 'fullstack'>('frontend');
  const [editFrontendProvider, setEditFrontendProvider] = useState("vercel");
  const [editBackendProvider, setEditBackendProvider] = useState("render");
  const [editDatabaseProvider, setEditDatabaseProvider] = useState("supabase");
  const [editPublicUrl, setEditPublicUrl] = useState("");
  const [editApiUrl, setEditApiUrl] = useState("");
  const [editFrontendDashboardUrl, setEditFrontendDashboardUrl] = useState("");
  const [editBackendDashboardUrl, setEditBackendDashboardUrl] = useState("");
  const [editDatabaseDashboardUrl, setEditDatabaseDashboardUrl] = useState("");
  const [editFrontendFramework, setEditFrontendFramework] = useState("");
  const [editBackendFramework, setEditBackendFramework] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const result = await getProjects();
    if (result.success) {
      setProjects(result.projects || []);
    }
  }

  async function handleCreateProject(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const result = await createProject(
      newProjectName, 
      newProjectDesc,
      newProjectType,
      newFrontendProvider,
      newBackendProvider,
      newPublicUrl,
      newApiUrl,
      newFrontendDashboardUrl,
      newBackendDashboardUrl,
      newDatabaseDashboardUrl,
      newFrontendFramework,
      newBackendFramework
    );
    
    if (result.success) {
      toast.success("Project created successfully!");
      resetCreateForm();
      setShowCreateDialog(false);
      loadProjects();
    } else {
      toast.error(result.error || "Failed to create project");
    }
    
    setIsLoading(false);
  }

  function resetCreateForm() {
    setNewProjectName("");
    setNewProjectDesc("");
    setNewProjectType('frontend');
    setNewFrontendProvider("vercel");
    setNewBackendProvider("render");
    setNewDatabaseProvider("supabase");
    setNewPublicUrl("");
    setNewApiUrl("");
    setNewFrontendDashboardUrl("");
    setNewBackendDashboardUrl("");
    setNewDatabaseDashboardUrl("");
    setNewFrontendFramework("");
    setNewBackendFramework("");
  }

  async function handleUpdateProject(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const result = await updateProject(
      projectToEdit.id,
      editProjectName,
      editProjectDesc,
      projectToEdit.status,
      editProjectType,
      editFrontendProvider,
      editBackendProvider,
      editPublicUrl,
      editApiUrl,
      editFrontendDashboardUrl,
      editBackendDashboardUrl,
      editDatabaseDashboardUrl,
      editFrontendFramework,
      editBackendFramework
    );
    
    if (result.success) {
      toast.success("Project updated successfully!");
      setShowEditDialog(false);
      loadProjects();
    } else {
      toast.error(result.error || "Failed to update project");
    }
    
    setIsLoading(false);
  }

  async function handleDeleteProject() {
    setIsLoading(true);

    const result = await deleteProject(projectToDelete.id);
    
    if (result.success) {
      toast.success("Project deleted successfully!");
      setShowDeleteDialog(false);
      setProjectToDelete(null);
      loadProjects();
    } else {
      toast.error(result.error || "Failed to delete project");
    }
    
    setIsLoading(false);
  }

  function openEditDialog(project: any) {
    setProjectToEdit(project);
    setEditProjectName(project.name);
    setEditProjectDesc(project.description || "");
    
    let detectedType = project.type;
    if (!detectedType) {
      if (project.frontend && project.backend) {
        detectedType = 'fullstack';
      } else if (project.frontend) {
        detectedType = 'frontend';
      } else if (project.backend) {
        detectedType = 'backend';
      } else {
        detectedType = 'frontend';
      }
    }
    
    setEditProjectType(detectedType);
    setEditFrontendProvider(project.frontend?.provider || "vercel");
    setEditBackendProvider(project.backend?.provider || "render");
    setEditDatabaseProvider(project.database?.provider || "supabase");
    setEditPublicUrl(project.frontend?.publicUrl || "");
    setEditApiUrl(project.backend?.apiUrl || "");
    setEditFrontendDashboardUrl(project.frontend?.dashboardUrl || "");
    setEditBackendDashboardUrl(project.backend?.dashboardUrl || "");
    setEditDatabaseDashboardUrl(project.database?.dashboardUrl || "");
    setEditFrontendFramework(project.frontend?.framework || "");
    setEditBackendFramework(project.backend?.framework || "");
    setShowEditDialog(true);
  }

  function openDeleteDialog(project: any) {
    setProjectToDelete(project);
    setShowDeleteDialog(true);
  }

  function getProjectIcon(project: any) {
    if (project.type === 'frontend') return <Globe className="h-5 w-5" />;
    if (project.type === 'backend') return <Server className="h-5 w-5" />;
    return <Database className="h-5 w-5" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage all your projects in one place.</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No projects yet. Create your first project!</p>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-200 border border-border hover:border-border/80">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {getProjectIcon(project)}
                    </div>
                    <CardTitle className="text-lg font-semibold truncate">{project.name}</CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium w-fit ${
                      project.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                        : 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
                    }`}>
                      {project.status}
                    </span>
                    {project.type && (
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                        {project.type}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                    onClick={() => openEditDialog(project)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                    onClick={() => openDeleteDialog(project)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground line-clamp-4 min-h-[40px]">
                  {project.description || "No description provided"}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-full sm:max-w-3xl h-[90vh] sm:h-auto overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new project.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateProject} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="create-project-type">Project Type</Label>
                <Select value={newProjectType} onValueChange={(val: any) => setNewProjectType(val)}>
                  <SelectTrigger id="create-project-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="fullstack">Full Stack</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="create-name">Project Name</Label>
                  <Input
                    id="create-name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Enter project name"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="create-description">Description</Label>
                  <Textarea
                    id="create-description"
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    placeholder="Enter project description"
                  />
                </div>
              </div>

              {(newProjectType === 'frontend' || newProjectType === 'fullstack') || (newProjectType === 'backend' || newProjectType === 'fullstack') ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {(newProjectType === 'frontend' || newProjectType === 'fullstack') && (
                    <div className="space-y-3 p-3 rounded-lg border bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-500" />
                        <h3 className="font-semibold text-sm">Frontend</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="create-frontend-provider" className="text-xs">Deployment Provider</Label>
                        <Select value={newFrontendProvider} onValueChange={setNewFrontendProvider}>
                          <SelectTrigger id="create-frontend-provider" className="h-8">
                            <SelectValue placeholder="Select frontend provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vercel">Vercel</SelectItem>
                            <SelectItem value="netlify">Netlify</SelectItem>
                            <SelectItem value="aws">AWS</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="create-public-url" className="text-xs">Public URL</Label>
                        <Input
                          id="create-public-url"
                          value={newPublicUrl}
                          onChange={(e) => setNewPublicUrl(e.target.value)}
                          placeholder="https://myapp.vercel.app"
                          className="h-8"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="create-frontend-dashboard" className="text-xs">Dashboard URL</Label>
                        <Input
                          id="create-frontend-dashboard"
                          value={newFrontendDashboardUrl}
                          onChange={(e) => setNewFrontendDashboardUrl(e.target.value)}
                          placeholder="https://vercel.com/dashboard"
                          className="h-8"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="create-frontend-framework" className="text-xs">Framework</Label>
                        <Input
                          id="create-frontend-framework"
                          value={newFrontendFramework}
                          onChange={(e) => setNewFrontendFramework(e.target.value)}
                          placeholder="Next.js, React, etc."
                          className="h-8"
                        />
                      </div>
                    </div>
                  )}

                  {(newProjectType === 'backend' || newProjectType === 'fullstack') && (
                    <div className="space-y-3 p-3 rounded-lg border bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-purple-500" />
                        <h3 className="font-semibold text-sm">Backend</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="create-backend-provider" className="text-xs">Deployment Provider</Label>
                        <Select value={newBackendProvider} onValueChange={setNewBackendProvider}>
                          <SelectTrigger id="create-backend-provider" className="h-8">
                            <SelectValue placeholder="Select backend provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="render">Render</SelectItem>
                            <SelectItem value="vercel">Vercel</SelectItem>
                            <SelectItem value="aws">AWS</SelectItem>
                            <SelectItem value="fly">Fly.io</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="create-api-url" className="text-xs">API URL</Label>
                        <Input
                          id="create-api-url"
                          value={newApiUrl}
                          onChange={(e) => setNewApiUrl(e.target.value)}
                          placeholder="https://api.myapp.com"
                          className="h-8"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="create-backend-dashboard" className="text-xs">Dashboard URL</Label>
                        <Input
                          id="create-backend-dashboard"
                          value={newBackendDashboardUrl}
                          onChange={(e) => setNewBackendDashboardUrl(e.target.value)}
                          placeholder="https://render.com/dashboard"
                          className="h-8"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="create-backend-framework" className="text-xs">Framework</Label>
                        <Input
                          id="create-backend-framework"
                          value={newBackendFramework}
                          onChange={(e) => setNewBackendFramework(e.target.value)}
                          placeholder="NestJS, Node.js, etc."
                          className="h-8"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              <div className="space-y-3 p-3 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-orange-500" />
                  <h3 className="font-semibold text-sm">Database (Optional)</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="create-database-dashboard" className="text-xs">Dashboard URL</Label>
                  <Input
                    id="create-database-dashboard"
                    value={newDatabaseDashboardUrl}
                    onChange={(e) => setNewDatabaseDashboardUrl(e.target.value)}
                    placeholder="https://supabase.com/dashboard"
                    className="h-8"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setShowCreateDialog(false);
                resetCreateForm();
              }} className="h-8">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="h-8">
                {isLoading ? "Creating..." : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-full sm:max-w-3xl h-[90vh] sm:h-auto overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateProject} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="edit-project-type">Project Type</Label>
                <Select value={editProjectType} onValueChange={(val: any) => setEditProjectType(val)}>
                  <SelectTrigger id="edit-project-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="fullstack">Full Stack</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-name">Project Name</Label>
                  <Input
                    id="edit-name"
                    value={editProjectName}
                    onChange={(e) => setEditProjectName(e.target.value)}
                    placeholder="Enter project name"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editProjectDesc}
                    onChange={(e) => setEditProjectDesc(e.target.value)}
                    placeholder="Enter project description"
                  />
                </div>
              </div>

              {(editProjectType === 'frontend' || editProjectType === 'fullstack') || (editProjectType === 'backend' || editProjectType === 'fullstack') ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {(editProjectType === 'frontend' || editProjectType === 'fullstack') && (
                    <div className="space-y-3 p-3 rounded-lg border bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-500" />
                        <h3 className="font-semibold text-sm">Frontend</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="edit-frontend-provider" className="text-xs">Deployment Provider</Label>
                        <Select value={editFrontendProvider} onValueChange={setEditFrontendProvider}>
                          <SelectTrigger id="edit-frontend-provider" className="h-8">
                            <SelectValue placeholder="Select frontend provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vercel">Vercel</SelectItem>
                            <SelectItem value="netlify">Netlify</SelectItem>
                            <SelectItem value="aws">AWS</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-public-url" className="text-xs">Public URL</Label>
                        <Input
                          id="edit-public-url"
                          value={editPublicUrl}
                          onChange={(e) => setEditPublicUrl(e.target.value)}
                          placeholder="https://myapp.vercel.app"
                          className="h-8"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-frontend-dashboard" className="text-xs">Dashboard URL</Label>
                        <Input
                          id="edit-frontend-dashboard"
                          value={editFrontendDashboardUrl}
                          onChange={(e) => setEditFrontendDashboardUrl(e.target.value)}
                          placeholder="https://vercel.com/dashboard"
                          className="h-8"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-frontend-framework" className="text-xs">Framework</Label>
                        <Input
                          id="edit-frontend-framework"
                          value={editFrontendFramework}
                          onChange={(e) => setEditFrontendFramework(e.target.value)}
                          placeholder="Next.js, React, etc."
                          className="h-8"
                        />
                      </div>
                    </div>
                  )}

                  {(editProjectType === 'backend' || editProjectType === 'fullstack') && (
                    <div className="space-y-3 p-3 rounded-lg border bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-purple-500" />
                        <h3 className="font-semibold text-sm">Backend</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="edit-backend-provider" className="text-xs">Deployment Provider</Label>
                        <Select value={editBackendProvider} onValueChange={setEditBackendProvider}>
                          <SelectTrigger id="edit-backend-provider" className="h-8">
                            <SelectValue placeholder="Select backend provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="render">Render</SelectItem>
                            <SelectItem value="vercel">Vercel</SelectItem>
                            <SelectItem value="aws">AWS</SelectItem>
                            <SelectItem value="fly">Fly.io</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-api-url" className="text-xs">API URL</Label>
                        <Input
                          id="edit-api-url"
                          value={editApiUrl}
                          onChange={(e) => setEditApiUrl(e.target.value)}
                          placeholder="https://api.myapp.com"
                          className="h-8"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-backend-dashboard" className="text-xs">Dashboard URL</Label>
                        <Input
                          id="edit-backend-dashboard"
                          value={editBackendDashboardUrl}
                          onChange={(e) => setEditBackendDashboardUrl(e.target.value)}
                          placeholder="https://render.com/dashboard"
                          className="h-8"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-backend-framework" className="text-xs">Framework</Label>
                        <Input
                          id="edit-backend-framework"
                          value={editBackendFramework}
                          onChange={(e) => setEditBackendFramework(e.target.value)}
                          placeholder="NestJS, Node.js, etc."
                          className="h-8"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              <div className="space-y-3 p-3 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-orange-500" />
                  <h3 className="font-semibold text-sm">Database (Optional)</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-database-dashboard" className="text-xs">Dashboard URL</Label>
                  <Input
                    id="edit-database-dashboard"
                    value={editDatabaseDashboardUrl}
                    onChange={(e) => setEditDatabaseDashboardUrl(e.target.value)}
                    placeholder="https://supabase.com/dashboard"
                    className="h-8"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)} className="h-8">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="h-8">
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-full sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the project "{projectToDelete?.name}". This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteProject} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
