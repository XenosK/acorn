"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import styles from "./page.module.css";
import RequirementList from "@/components/requirements/RequirementList";
import NewRequirement from "@/components/requirements/NewRequirement";

type TabType = "all" | "in-progress" | "completed";

export default function RequirementsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [showNewRequirement, setShowNewRequirement] = useState(false);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>数据需求</h1>
          {!showNewRequirement && (
            <button
              className={styles.newButton}
              onClick={() => setShowNewRequirement(true)}
            >
              + 新增需求
            </button>
          )}
        </div>

        {showNewRequirement ? (
          <NewRequirement onCancel={() => setShowNewRequirement(false)} />
        ) : (
          <>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === "all" ? styles.active : ""}`}
                onClick={() => setActiveTab("all")}
              >
                全部需求
              </button>
              <button
                className={`${styles.tab} ${activeTab === "in-progress" ? styles.active : ""}`}
                onClick={() => setActiveTab("in-progress")}
              >
                进行中
              </button>
              <button
                className={`${styles.tab} ${activeTab === "completed" ? styles.active : ""}`}
                onClick={() => setActiveTab("completed")}
              >
                已完成
              </button>
            </div>

            <RequirementList filter={activeTab} />
          </>
        )}
      </div>
    </Layout>
  );
}

