"use server";

import { db } from "@/db";
import { projects, projectFrontends, projectBackends, projectDatabases } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createProject(
  name: string, 
  description?: string,
  projectType?: 'frontend' | 'backend' | 'fullstack',
  frontendProvider?: string,
  backendProvider?: string,
  publicUrl?: string,
  apiUrl?: string,
  frontendDashboardUrl?: string,
  backendDashboardUrl?: string,
  databaseDashboardUrl?: string,
  frontendFramework?: string,
  backendFramework?: string
) {
  try {
    const [newProject] = await db.insert(projects).values({
      name,
      description,
      type: projectType,
      status: "active",
    }).returning();

    if (projectType === 'frontend' || projectType === 'fullstack') {
      await db.insert(projectFrontends).values({
        projectId: newProject.id,
        provider: frontendProvider || 'vercel',
        publicUrl,
        dashboardUrl: frontendDashboardUrl,
        framework: frontendFramework,
      });
    }

    if (projectType === 'backend' || projectType === 'fullstack') {
      await db.insert(projectBackends).values({
        projectId: newProject.id,
        provider: backendProvider || 'render',
        apiUrl,
        dashboardUrl: backendDashboardUrl,
        framework: backendFramework,
      });
    }

    if (databaseDashboardUrl) {
      await db.insert(projectDatabases).values({
        projectId: newProject.id,
        provider: 'supabase',
        dashboardUrl: databaseDashboardUrl,
      });
    }

    return { success: true, project: newProject };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function getProjects() {
  try {
    const allProjects = await db.select().from(projects);
    
    const projectsWithDetails = await Promise.all(
      allProjects.map(async (project) => {
        const [frontend] = await db.select().from(projectFrontends).where(eq(projectFrontends.projectId, project.id));
        const [backend] = await db.select().from(projectBackends).where(eq(projectBackends.projectId, project.id));
        const [database] = await db.select().from(projectDatabases).where(eq(projectDatabases.projectId, project.id));
        
        return {
          ...project,
          frontend,
          backend,
          database,
        };
      })
    );

    return { success: true, projects: projectsWithDetails };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, projects: [], error: "Failed to fetch projects" };
  }
}

export async function updateProject(
  id: number, 
  name: string, 
  description?: string, 
  status?: string,
  projectType?: 'frontend' | 'backend' | 'fullstack',
  frontendProvider?: string,
  backendProvider?: string,
  publicUrl?: string,
  apiUrl?: string,
  frontendDashboardUrl?: string,
  backendDashboardUrl?: string,
  databaseDashboardUrl?: string,
  frontendFramework?: string,
  backendFramework?: string
) {
  try {
    await db.update(projects)
      .set({ name, description, status, type: projectType })
      .where(eq(projects.id, id));

    const existingFrontend = await db.select().from(projectFrontends).where(eq(projectFrontends.projectId, id));
    const existingBackend = await db.select().from(projectBackends).where(eq(projectBackends.projectId, id));
    const existingDatabase = await db.select().from(projectDatabases).where(eq(projectDatabases.projectId, id));

    if (projectType === 'frontend' || projectType === 'fullstack') {
      if (existingFrontend.length > 0) {
        await db.update(projectFrontends)
          .set({ 
            provider: frontendProvider || 'vercel', 
            publicUrl, 
            dashboardUrl: frontendDashboardUrl, 
            framework: frontendFramework 
          })
          .where(eq(projectFrontends.projectId, id));
      } else {
        await db.insert(projectFrontends).values({
          projectId: id,
          provider: frontendProvider || 'vercel',
          publicUrl,
          dashboardUrl: frontendDashboardUrl,
          framework: frontendFramework,
        });
      }
    }

    if (projectType === 'backend' || projectType === 'fullstack') {
      if (existingBackend.length > 0) {
        await db.update(projectBackends)
          .set({ 
            provider: backendProvider || 'render', 
            apiUrl, 
            dashboardUrl: backendDashboardUrl, 
            framework: backendFramework 
          })
          .where(eq(projectBackends.projectId, id));
      } else {
        await db.insert(projectBackends).values({
          projectId: id,
          provider: backendProvider || 'render',
          apiUrl,
          dashboardUrl: backendDashboardUrl,
          framework: backendFramework,
        });
      }
    }

    if (databaseDashboardUrl) {
      if (existingDatabase.length > 0) {
        await db.update(projectDatabases)
          .set({ 
            provider: 'supabase', 
            dashboardUrl: databaseDashboardUrl 
          })
          .where(eq(projectDatabases.projectId, id));
      } else {
        await db.insert(projectDatabases).values({
          projectId: id,
          provider: 'supabase',
          dashboardUrl: databaseDashboardUrl,
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: number) {
  try {
    await db.delete(projectFrontends).where(eq(projectFrontends.projectId, id));
    await db.delete(projectBackends).where(eq(projectBackends.projectId, id));
    await db.delete(projectDatabases).where(eq(projectDatabases.projectId, id));
    await db.delete(projects).where(eq(projects.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
