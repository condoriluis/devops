"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Server, Database } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/project-actions";

export default function LinksPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const result = await getProjects();
    if (result.success) {
      setProjects(result.projects || []);
    }
    setIsLoading(false);
  }

  function getProjectIcon(project: any) {
    if (project.type === 'frontend') return <Globe className="h-5 w-5" />;
    if (project.type === 'backend') return <Server className="h-5 w-5" />;
    return <Database className="h-5 w-5" />;
  }

  function getProjectUrl(project: any) {
    if (project.type === 'frontend' && project.frontend?.publicUrl) {
      return project.frontend.publicUrl;
    }
    if (project.type === 'backend' && project.backend?.apiUrl) {
      return project.backend.apiUrl;
    }
    if (project.frontend?.dashboardUrl) {
      return project.frontend.dashboardUrl;
    }
    if (project.backend?.dashboardUrl) {
      return project.backend.dashboardUrl;
    }
    return null;
  }

  function getDashboardUrl(project: any) {
    if (project.frontend?.dashboardUrl) {
      return project.frontend.dashboardUrl;
    }
    if (project.backend?.dashboardUrl) {
      return project.backend.dashboardUrl;
    }
    return null;
  }

  const allLinks = projects.flatMap(project => {
    const links: any[] = [];
    
    if (project.frontend?.publicUrl) {
      links.push({
        name: `${project.name} (Frontend)`,
        url: project.frontend.publicUrl,
        type: 'frontend',
        provider: project.frontend.provider
      });
    }
    
    if (project.backend?.apiUrl) {
      links.push({
        name: `${project.name} (Backend)`,
        url: project.backend.apiUrl,
        type: 'backend',
        provider: project.backend.provider
      });
    }
    
    if (project.database?.dashboardUrl) {
      links.push({
        name: `${project.name} (Database)`,
        url: project.database.dashboardUrl,
        type: 'database',
        provider: project.database.provider
      });
    }
    
    if (project.frontend?.dashboardUrl) {
      links.push({
        name: `${project.frontend.provider} Dashboard`,
        url: project.frontend.dashboardUrl,
        type: 'dashboard',
        provider: project.frontend.provider
      });
    }
    
    if (project.backend?.dashboardUrl && project.backend?.dashboardUrl !== project.frontend?.dashboardUrl) {
      links.push({
        name: `${project.backend.provider} Dashboard`,
        url: project.backend.dashboardUrl,
        type: 'dashboard',
        provider: project.backend.provider
      });
    }
    
    return links;
  });

  const linksToShow = allLinks;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quick Links</h1>
        <p className="text-muted-foreground">Fast access to your favorite dashboards and services.</p>
      </div>

      {linksToShow.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ExternalLink className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No links yet. Create your first project to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {linksToShow.map((link, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="!flex !flex-row !items-center !justify-between !space-y-0">
                <div className="flex items-center gap-3">
                {link.type === 'frontend' && <Globe className="h-5 w-5 text-blue-500" />}
                {link.type === 'backend' && <Server className="h-5 w-5 text-purple-500" />}
                {link.type === 'database' && <Database className="h-5 w-5 text-orange-500" />}
                {link.type === 'dashboard' && <ExternalLink className="h-5 w-5 text-muted-foreground" />}
                <CardTitle className="text-lg">{link.name}</CardTitle>
              </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open
                  </a>
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
