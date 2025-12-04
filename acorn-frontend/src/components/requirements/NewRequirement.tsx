"use client";

import { useState } from "react";
import styles from "./NewRequirement.module.css";

interface RequirementConfig {
  id: string;
  field: string;
  type: string;
  description: string;
  required: boolean;
}

interface NewRequirementProps {
  onCancel: () => void;
}

type Step = "description" | "config" | "review";

export default function NewRequirement({ onCancel }: NewRequirementProps) {
  const [currentStep, setCurrentStep] = useState<Step>("description");
  const [description, setDescription] = useState("");
  const [configs, setConfigs] = useState<RequirementConfig[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const steps: { key: Step; label: string }[] = [
    { key: "description", label: "需求描述" },
    { key: "config", label: "需求配置" },
    { key: "review", label: "确认提交" },
  ];

  const handleAnalyze = async () => {
    if (!description.trim()) {
      alert("请先输入需求描述");
      return;
    }

    setIsAnalyzing(true);

    // TODO: 调用AI解析API
    // 这里使用模拟数据
    setTimeout(() => {
      const mockConfigs: RequirementConfig[] = [
        {
          id: "1",
          field: "数据源",
          type: "string",
          description: "指定数据来源，如数据库、API等",
          required: true,
        },
        {
          id: "2",
          field: "时间范围",
          type: "date_range",
          description: "数据查询的时间范围",
          required: true,
        },
        {
          id: "3",
          field: "指标维度",
          type: "array",
          description: "需要分析的指标和维度",
          required: false,
        },
      ];
      setConfigs(mockConfigs);
      setIsAnalyzing(false);
      setCurrentStep("config");
    }, 1500);
  };

  const handleConfigChange = (id: string, field: keyof RequirementConfig, value: string | boolean) => {
    setConfigs((prev) =>
      prev.map((config) =>
        config.id === id ? { ...config, [field]: value } : config
      )
    );
  };

  const handleNext = () => {
    if (currentStep === "description") {
      if (!description.trim()) {
        alert("请先输入需求描述");
        return;
      }
      setCurrentStep("config");
    } else if (currentStep === "config") {
      setCurrentStep("review");
    }
  };

  const handlePrevious = () => {
    if (currentStep === "config") {
      setCurrentStep("description");
    } else if (currentStep === "review") {
      setCurrentStep("config");
    }
  };

  const handleSubmit = async () => {
    // TODO: 提交需求到API
    alert("需求提交成功！");
    onCancel();
  };

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {steps.map((step, index) => (
          <div key={step.key} className={styles.stepContainer}>
            <div
              className={`${styles.step} ${
                index <= currentStepIndex ? styles.active : ""
              } ${index < currentStepIndex ? styles.completed : ""}`}
            >
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepLabel}>{step.label}</div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`${styles.stepLine} ${
                  index < currentStepIndex ? styles.completed : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className={styles.content}>
        {currentStep === "description" && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>请输入需求描述</h2>
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请详细描述您的数据需求，例如：需要分析用户在平台上的行为数据，包括点击、浏览、停留时间等指标..."
              rows={8}
            />
            <div className={styles.actions}>
              <button className={styles.cancelButton} onClick={onCancel}>
                取消
              </button>
              <button
                className={styles.analyzeButton}
                onClick={handleAnalyze}
                disabled={isAnalyzing || !description.trim()}
              >
                {isAnalyzing ? "AI解析中..." : "AI解析"}
              </button>
            </div>
          </div>
        )}

        {currentStep === "config" && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>需求配置</h2>
            <p className={styles.stepDescription}>
              AI已为您生成以下配置，您可以手动修改
            </p>
            <div className={styles.configList}>
              {configs.map((config) => (
                <div key={config.id} className={styles.configItem}>
                  <div className={styles.configHeader}>
                    <input
                      type="text"
                      className={styles.configField}
                      value={config.field}
                      onChange={(e) =>
                        handleConfigChange(config.id, "field", e.target.value)
                      }
                    />
                    <select
                      className={styles.configType}
                      value={config.type}
                      onChange={(e) =>
                        handleConfigChange(config.id, "type", e.target.value)
                      }
                    >
                      <option value="string">字符串</option>
                      <option value="number">数字</option>
                      <option value="date">日期</option>
                      <option value="date_range">日期范围</option>
                      <option value="array">数组</option>
                      <option value="boolean">布尔值</option>
                    </select>
                    <label className={styles.requiredLabel}>
                      <input
                        type="checkbox"
                        checked={config.required}
                        onChange={(e) =>
                          handleConfigChange(config.id, "required", e.target.checked)
                        }
                      />
                      必填
                    </label>
                  </div>
                  <textarea
                    className={styles.configDescription}
                    value={config.description}
                    onChange={(e) =>
                      handleConfigChange(config.id, "description", e.target.value)
                    }
                    placeholder="配置描述..."
                    rows={2}
                  />
                </div>
              ))}
            </div>
            <div className={styles.actions}>
              <button
                className={styles.previousButton}
                onClick={handlePrevious}
              >
                上一步
              </button>
              <button className={styles.nextButton} onClick={handleNext}>
                下一步
              </button>
            </div>
          </div>
        )}

        {currentStep === "review" && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>确认提交</h2>
            <div className={styles.reviewSection}>
              <h3 className={styles.reviewTitle}>需求描述</h3>
              <p className={styles.reviewText}>{description}</p>
            </div>
            <div className={styles.reviewSection}>
              <h3 className={styles.reviewTitle}>需求配置</h3>
              <div className={styles.configList}>
                {configs.map((config) => (
                  <div key={config.id} className={styles.configItem}>
                    <div className={styles.configHeader}>
                      <span className={styles.configField}>{config.field}</span>
                      <span className={styles.configType}>{config.type}</span>
                      {config.required && (
                        <span className={styles.requiredBadge}>必填</span>
                      )}
                    </div>
                    <p className={styles.configDescription}>{config.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.previousButton}
                onClick={handlePrevious}
              >
                上一步
              </button>
              <button className={styles.submitButton} onClick={handleSubmit}>
                提交
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

