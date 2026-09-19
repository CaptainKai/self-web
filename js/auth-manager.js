/**
 * Admin Authentication & Access Control Manager (auth-manager.js)
 * 1. 保护简历编辑与数据导入导出，防止未授权访客随意篡改公开主页内容
 * 2. 支持默认安全管理口令与自定义口令存储
 * 3. 采用 Session 状态管理，登出即时锁死特权功能
 */

(function () {
  const AUTH_SESSION_KEY = "SELF_WEBSITE_ADMIN_SESSION";
  const CUSTOM_PWD_KEY = "SELF_WEBSITE_ADMIN_PWD";
  const DEFAULT_PASSWORD = "likai2026"; // 默认安全口令

  let pendingActionCallback = null;

  console.log("[AuthManager] 初始化权限控制中枢，保护简历编辑与导入导出安全");

  // 1. 获取当前有效口令
  function getEffectivePassword() {
    return localStorage.getItem(CUSTOM_PWD_KEY) || DEFAULT_PASSWORD;
  }

  // 2. 检查是否处于已登录状态
  function isLoggedIn() {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === "true";
  }

  // 3. 执行登录校验
  function login(inputPwd) {
    console.log("[AuthManager] 正在验证管理员口令...");
    const correctPwd = getEffectivePassword();
    if (inputPwd === correctPwd) {
      sessionStorage.setItem(AUTH_SESSION_KEY, "true");
      console.log("[AuthManager] 认证成功，已解锁管理员权限");
      updateNavAuthUI();
      closeAuthModal();
      showAuthNotification("🔓 管理员身份验证成功！已解锁简历编辑与数据管理特权。");

      if (typeof pendingActionCallback === "function") {
        const cb = pendingActionCallback;
        pendingActionCallback = null;
        cb();
      }
      return true;
    } else {
      console.warn("[AuthManager] 口令错误，拦截访问");
      const errEl = document.getElementById("auth-error-msg");
      if (errEl) {
        errEl.textContent = "❌ 访问口令错误，请重新输入";
        errEl.style.display = "block";
      }
      return false;
    }
  }

  // 4. 登出 / 锁定权限
  function logout() {
    console.log("[AuthManager] 退出管理员模式");
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    updateNavAuthUI();
    showAuthNotification("🔒 已退出管理员模式，页面恢复只读状态。");
  }

  // 5. 修改管理口令
  function changePassword(oldPwd, newPwd) {
    if (oldPwd !== getEffectivePassword()) {
      alert("原口令验证失败，无法修改！");
      return false;
    }
    if (!newPwd || newPwd.length < 6) {
      alert("新口令长度不得少于 6 位字符！");
      return false;
    }
    localStorage.setItem(CUSTOM_PWD_KEY, newPwd);
    alert("🎉 管理员口令修改成功，请牢记新口令！");
    return true;
  }

  // 6. 打开登录弹窗
  function openAuthModal(callback) {
    if (typeof callback === "function") {
      pendingActionCallback = callback;
    }
    const modal = document.getElementById("admin-auth-modal");
    if (!modal) return;

    const pwdInput = document.getElementById("admin-password-input");
    const errEl = document.getElementById("auth-error-msg");
    if (pwdInput) {
      pwdInput.value = "";
      setTimeout(() => pwdInput.focus(), 100);
    }
    if (errEl) {
      errEl.style.display = "none";
    }
    modal.classList.add("active");
  }

  // 7. 关闭登录弹窗
  function closeAuthModal() {
    const modal = document.getElementById("admin-auth-modal");
    if (modal) modal.classList.remove("active");
    pendingActionCallback = null;
  }

  // 8. 权限守卫：若已登录则执行回调，否则唤起认证弹窗
  function requireAuth(actionCallback) {
    if (isLoggedIn()) {
      if (typeof actionCallback === "function") actionCallback();
    } else {
      openAuthModal(actionCallback);
    }
  }

  // 9. 更新导航栏与界面中的权限状态 UI
  function updateNavAuthUI() {
    const isAuthed = isLoggedIn();
    console.log(`[AuthManager] 更新导航栏权限状态: ${isAuthed ? '已登录 (Admin)' : '未登录 (Guest)'}`);

    const authBtn = document.getElementById("admin-auth-btn");
    const editBtn = document.getElementById("edit-toggle-btn");
    const dataBtn = document.getElementById("data-manage-btn");
    const adminBadge = document.getElementById("admin-status-badge");

    if (authBtn) {
      authBtn.innerHTML = isAuthed ? `<span>🔓</span>` : `<span>🔒</span>`;
      authBtn.setAttribute("title", isAuthed ? "管理员已登录 (点击退出)" : "管理员登录 / 权限解锁");
      if (isAuthed) {
        authBtn.classList.add("authed");
      } else {
        authBtn.classList.remove("authed");
      }
    }

    if (adminBadge) {
      adminBadge.style.display = isAuthed ? "inline-flex" : "none";
    }

    // 未授权时，编辑与数据按钮带有加锁提示或低调样式
    if (editBtn) {
      editBtn.setAttribute("title", isAuthed ? "打开结构化简历编辑器" : "✏️ 简历编辑 (需管理员登录)");
    }
    if (dataBtn) {
      dataBtn.setAttribute("title", isAuthed ? "数据导入导出与备份" : "📤 数据管理 (需管理员登录)");
    }
  }

  // 快捷通知提示
  function showAuthNotification(msg) {
    let notify = document.getElementById("data-notification");
    if (!notify) {
      notify = document.createElement("div");
      notify.id = "data-notification";
      notify.style.cssText = `
        position: fixed; top: 70px; left: 50%; transform: translateX(-50%);
        background: rgba(15, 23, 42, 0.95); color: #38bdf8; padding: 10px 22px;
        border-radius: 8px; border: 1px solid #38bdf8; z-index: 99999;
        font-size: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(notify);
    }
    notify.textContent = msg;
    notify.style.opacity = "1";
    setTimeout(() => {
      notify.style.opacity = "0";
    }, 3500);
  }

  // 全局暴露 AuthManager 与点击处理函数
  window.handleAdminAuthClick = function () {
    if (isLoggedIn()) {
      if (confirm("当前已处于管理员模式，是否退出登录恢复只读访客状态？")) {
        logout();
      }
    } else {
      openAuthModal();
    }
  };

  window.submitAdminAuth = function () {
    const pwdInput = document.getElementById("admin-password-input");
    if (pwdInput) {
      login(pwdInput.value);
    }
  };

  window.AuthManager = {
    isLoggedIn,
    login,
    logout,
    openAuthModal,
    closeAuthModal,
    requireAuth,
    changePassword,
    updateNavAuthUI
  };

  // DOM 就绪后挂载事件并初始化 UI
  document.addEventListener("DOMContentLoaded", () => {
    updateNavAuthUI();
  });
})();
