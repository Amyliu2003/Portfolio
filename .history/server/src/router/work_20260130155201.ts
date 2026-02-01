import { Router } from "express";

const router = Router();

/**
 * GET /api/works
 * 返回所有 works（列表页用）
 */
router.get("/", (_req, res) => {
  res.json([
    {
      id: "campus-cravings",
      title: "Campus Cravings",
      year: 2026,
      skills: ["React", "UX", "Systems"],
      cover: "/assets/campus-cravings.png",
    },
  ]);
});

/**
 * GET /api/works/:id
 * 返回单个 work（详情页 / modal 用）
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  // 暂时 mock
  res.json({
    id,
    title: "Campus Cravings",
    description: "A system-driven food discovery platform.",
    content: "Long-form project description here...",
  });
});

export default router;