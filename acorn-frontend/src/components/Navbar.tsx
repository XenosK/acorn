"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/auth";
import styles from "./Navbar.module.css";

interface NavbarProps {
  username: string;
}

export default function Navbar({ username }: NavbarProps) {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    router.push(path);
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🌰</span>
          <span className={styles.logoText}>Acorn</span>
        </div>
        <div className={styles.menuItems}>
          <a
            href="/requirements"
            className={styles.menuItem}
            onClick={(e) => handleMenuClick(e, "/requirements")}
          >
            数据需求
          </a>
          <a
            href="#"
            className={styles.menuItem}
            onClick={(e) => handleMenuClick(e, "#")}
          >
            AI工具箱
          </a>
          <a
            href="#"
            className={styles.menuItem}
            onClick={(e) => handleMenuClick(e, "#")}
          >
            系统设置
          </a>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.userMenu} ref={menuRef}>
          <button
            className={styles.avatarButton}
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
            aria-expanded={showUserMenu}
          >
            <div className={styles.avatar}>
              {getInitials(username)}
            </div>
          </button>
          {showUserMenu && (
            <div className={styles.userDropdown}>
              <div className={styles.userInfo}>
                <div className={styles.userName}>{username}</div>
              </div>
              <div className={styles.dropdownDivider}></div>
              <button
                className={styles.dropdownItem}
                onClick={handleLogout}
              >
                退出登录
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

