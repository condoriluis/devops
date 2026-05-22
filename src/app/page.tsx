import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Globe,
  Server,
  Database,
  Shield,
  Zap,
  GitBranch,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Globe,
    title: "Frontend Deployments",
    description: "Track all your frontend deployments across providers like Vercel and Netlify.",
  },
  {
    icon: Server,
    title: "Backend Services",
    description: "Monitor your backend APIs and services on Render, Railway, and more.",
  },
  {
    icon: Database,
    title: "Database Management",
    description: "Keep track of your database instances and their configurations.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security with encrypted credentials and secure authentication.",
  },
  {
    icon: Zap,
    title: "Uptime Monitoring",
    description: "Monitor your services' uptime and performance in real-time.",
  },
  {
    icon: GitBranch,
    title: "Repository Links",
    description: "Quick access to GitHub repositories, dashboards, and documentation.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Server className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">DevOps Dashboard</span>
            </div>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
                Your Developer Control Center
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                Manage all your projects, deployments, databases, and DevOps tools from one
                centralized dashboard. Keep track of everything with ease.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything You Need in One Place
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <Icon className="h-10 w-10 text-primary mb-4" />
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Organize Your Projects?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Start managing your deployments and services with a clean, modern dashboard.
            </p>
            <Button size="lg" asChild>
              <Link href="/login">
                Enter Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>© 2026 DevOps Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
