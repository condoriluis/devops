import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .defaultNow(),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type"),
  status: text("status").default("active"),
  icon: text("icon"),
  tags: text("tags", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .defaultNow(),
});

export const projectFrontends = sqliteTable("project_frontends", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  provider: text("provider"),
  publicUrl: text("public_url"),
  dashboardUrl: text("dashboard_url"),
  framework: text("framework"),
  repoUrl: text("repo_url"),
});

export const projectBackends = sqliteTable("project_backends", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  provider: text("provider"),
  apiUrl: text("api_url"),
  dashboardUrl: text("dashboard_url"),
  framework: text("framework"),
  runtime: text("runtime"),
  logsUrl: text("logs_url"),
});

export const projectDatabases = sqliteTable("project_databases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  provider: text("provider"),
  type: text("type"),
  host: text("host"),
  dashboardUrl: text("dashboard_url"),
  region: text("region"),
});

export const auditLogs = sqliteTable("audit_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  action: text("action").notNull(),
  details: text("details", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .defaultNow(),
});
