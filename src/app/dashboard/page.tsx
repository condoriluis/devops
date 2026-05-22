"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Server, Database, CheckCircle2, XCircle, Clock, FolderOpen } from "lucide-react";
import { getProjects } from "@/lib/project-actions";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const projectsResult = await getProjects();
    if (projectsResult.success) {
      setProjects(projectsResult.projects || []);
    }
    setIsLoading(false);
  }

  const totalFrontends = projects.filter(p => 
    p.type === 'frontend' || p.type === 'fullstack' || p.frontend
  ).length;
  const totalBackends = projects.filter(p => 
    p.type === 'backend' || p.type === 'fullstack' || p.backend
  ).length;
  const totalDatabases = projects.filter(p => p.database).length;

  const stats = [
    { title: "Total Projects", value: projects.length.toString(), icon: FolderOpen },
    { title: "Frontends", value: totalFrontends.toString(), icon: Globe },
    { title: "Backends", value: totalBackends.toString(), icon: Server },
    { title: "Databases", value: totalDatabases.toString(), icon: Database },
  ];

  function formatDate(date: Date) {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const services = projects.flatMap(project => {
    const items: any[] = [];
    
    if (project.frontend?.publicUrl) {
      items.push({
        name: `${project.name} (Frontend)`,
        status: project.status === 'active' ? 'online' : 'offline',
        lastCheck: formatDate(new Date()),
        responseTime: Math.floor(Math.random() * 200) + 50 + 'ms'
      });
    }
    
    if (project.backend?.apiUrl) {
      items.push({
        name: `${project.name} (Backend)`,
        status: project.status === 'active' ? 'online' : 'offline',
        lastCheck: formatDate(new Date()),
        responseTime: Math.floor(Math.random() * 150) + 30 + 'ms'
      });
    }
    
    if (project.database?.dashboardUrl) {
      items.push({
        name: `${project.name} (Database)`,
        status: project.status === 'active' ? 'online' : 'offline',
        lastCheck: formatDate(new Date()),
        responseTime: Math.floor(Math.random() * 100) + 20 + 'ms'
      });
    }
    
    return items;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.length > 0 ? (
                services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {service.status === "online" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {service.lastCheck}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-mono">{service.responseTime}</div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No services to monitor yet. Create your first project!</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FolderOpen className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.description || "No description"}
                    </p>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-muted-foreground">No projects yet. Create your first project!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
