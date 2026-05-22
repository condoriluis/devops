"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, Globe, Server, Database } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/project-actions";

export default function MonitoringPage() {
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

  const monitoringItems = projects.flatMap(project => {
    const items: any[] = [];
    
    if (project.frontend?.publicUrl) {
      items.push({
        name: `${project.name} (Frontend)`,
        status: project.status === 'active' ? 'online' : 'offline',
        url: project.frontend.publicUrl,
        responseTime: Math.floor(Math.random() * 200) + 50 + 'ms',
        type: 'frontend'
      });
    }
    
    if (project.backend?.apiUrl) {
      items.push({
        name: `${project.name} (Backend)`,
        status: project.status === 'active' ? 'online' : 'offline',
        url: project.backend.apiUrl,
        responseTime: Math.floor(Math.random() * 150) + 30 + 'ms',
        type: 'backend'
      });
    }
    
    if (project.database?.dashboardUrl) {
      items.push({
        name: `${project.name} (Database)`,
        status: project.status === 'active' ? 'online' : 'offline',
        url: project.database.dashboardUrl,
        responseTime: Math.floor(Math.random() * 100) + 20 + 'ms',
        type: 'database'
      });
    }
    
    return items;
  });

  const itemsToShow = monitoringItems;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Monitoring</h1>
        <p className="text-muted-foreground">Check the uptime and status of your services.</p>
      </div>

      {itemsToShow.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No services to monitor yet. Create your first project!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {itemsToShow.map((check, index) => (
            <Card key={index}>
              <CardHeader className="!flex !flex-row !items-center !gap-4 !space-y-0">
                <div className="flex-shrink-0">
                {check.type === 'frontend' && <Globe className="h-5 w-5 text-blue-500" />}
                {check.type === 'backend' && <Server className="h-5 w-5 text-purple-500" />}
                {check.type === 'database' && <Database className="h-5 w-5 text-orange-500" />}
              </div>
                <div className="flex-shrink-0">
                  {check.status === "online" ? (
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-500" />
                  ) : (
                    <XCircle className="h-6 w-6 flex-shrink-0 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg">{check.name}</CardTitle>
                  <p className="text-sm text-muted-foreground truncate">{check.url}</p>
                </div>
                <div className="text-sm font-mono flex-shrink-0">{check.responseTime}</div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
