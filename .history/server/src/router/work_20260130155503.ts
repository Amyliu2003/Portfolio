import { Router } from "express";
import projects from "../data/projects.json";

const router = Router();

router.get("/", (_req, res) => {
  res.json(projects);
});

router.get("/:slug", (req, res) => {
  const project = projects.find(
    (p: any) => p.slug === req.params.slug
  );

  if (!project) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(project);
});

export default router;