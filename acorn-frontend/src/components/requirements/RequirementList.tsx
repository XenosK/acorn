"use client";

import { useState, useEffect } from "react";
import styles from "./RequirementList.module.css";

interface Requirement {
  id: string;
  title: string;
  description: string;
  status: "in-progress" | "completed";
  createdAt: string;
  updatedAt: string;
}

interface RequirementListProps {
  filter: "all" | "in-progress" | "completed";
}

export default function RequirementList({ filter }: RequirementListProps) {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 从API获取需求列表
    // 这里使用模拟数据
    const mockRequirements: Requirement[] = [
      {
        id: "1",
        title: "用户行为分析数据需求",
        description: "需要分析用户在平台上的行为数据，包括点击、浏览、停留时间等指标",
        status: "in-progress",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
      },
      {
        id: "2",
        title: "销售数据报表需求",
        description: "生成月度销售数据报表，包含销售额、订单量、客户增长等维度",
        status: "completed",
        createdAt: "2024-01-10",
        updatedAt: "2024-01-18",
      },
    ];

    setTimeout(() => {
      setRequirements(mockRequirements);
      setLoading(false);
    }, 500);
  }, []);

  const filteredRequirements = requirements.filter((req) => {
    if (filter === "all") return true;
    return req.status === filter;
  });

  if (loading) {
    return <div className={styles.loading}>加载中...</div>;
  }

  if (filteredRequirements.length === 0) {
    return (
      <div className={styles.empty}>
        <p>暂无{filter === "all" ? "" : filter === "in-progress" ? "进行中" : "已完成"}的需求</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {filteredRequirements.map((req) => (
        <div key={req.id} className={styles.item}>
          <div className={styles.itemHeader}>
            <h3 className={styles.itemTitle}>{req.title}</h3>
            <span
              className={`${styles.status} ${
                req.status === "completed" ? styles.completed : styles.inProgress
              }`}
            >
              {req.status === "completed" ? "已完成" : "进行中"}
            </span>
          </div>
          <p className={styles.itemDescription}>{req.description}</p>
          <div className={styles.itemFooter}>
            <span className={styles.date}>创建时间: {req.createdAt}</span>
            <span className={styles.date}>更新时间: {req.updatedAt}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

