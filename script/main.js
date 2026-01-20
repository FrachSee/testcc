// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("./customize.json")
    .then(res => {
      if (!res.ok) throw new Error("customize.json not found");
      return res.json();
    })
    .then(data => {
      const dataArr = Object.keys(data);

      dataArr.forEach(customData => {
        if (data[customData] !== "") {
          const el = document.querySelector(`[data-node-name*="${customData}"]`);
          if (!el) return;

          if (customData === "imagePath") {
            el.setAttribute("src", data[customData]);
          } else {
            el.innerText = data[customData];
          }
        }
      });

      // JSON 成功加载后启动动画
      animationTimeline();
    })
    .catch(err => {
      // 失败也不要白屏：直接跑默认动画
      console.warn("Load customize.json failed:", err);
      animationTimeline();
    });
};

// Animation Timeline
const animationTimeline = () => {
  // Split chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  if (textBoxChars) {
    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
      .split("")
      .join("</span><span>")}</span`;
  }

  if (hbd) {
    hbd.innerHTML = `<span>${hbd.innerHTML
      .split("")
      .join("</span><span>")}</span`;
  }

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  // 判断移动端（与你的 CSS 断点一致）
  const isMobile = window.matchMedia("(max-width: 500px)").matches;

  const tl = new TimelineMax();

  // ✅ 移动端整体只慢一点点（比之前快很多）
  if (isMobile) {
    tl.timeScale(0.85); // 0.85：更接近原速；想再快点改 0.9
  }

  tl
    .to(".container", 0.1, {
      visibility: "visible"
    })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible"
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(127, 206, 248)"
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
      },
      "+=0.5"
    )
    .to(
      ".idea-5 .smiley",
      0.7,
      {
        rotation: 90,
        x: 8
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      },
      0.2,
      "+=1"
    )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400
      },
      {
        opacity: 1,
        y: -1000
      },
      0.2
    )
    .from(
      ".lydia-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg"
      },
      "party"
    )

    // ✅ 核心：移动端仅把速度从“太快”拉到“舒服”，但不会“拖”
    .staggerTo(
      ".eight svg",
      isMobile ? 2.4 : 1.5, // 原来 1.5，移动端变成 2.4（更舒服但不慢）
      {
        visibility: "visible",
        opacity: 0,                 // ✅ 保持原始亮度逻辑（不额外压暗）
        scale: 80,                  // ✅ 保持最初效果（你说希望和最初一样）
        repeat: isMobile ? 2 : 3,   // 移动端少一点轮次，减少“密集变化”
        repeatDelay: isMobile ? 2.0 : 1.4, // 间隔稍拉开
        ease: Power1.easeOut
      },
      isMobile ? 0.45 : 0.3 // 原来 0.3，移动端改 0.45：更不密集，但不会太空
    )

    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90
      },
      "+=1"
    );

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  if (replyBtn) {
    replyBtn.addEventListener("click", () => {
      tl.restart();
    });
  }
};

// ===============================
// Background music (more reliable)
// ===============================
const setupBgm = () => {
  const audio = document.getElementById("bgm");
  const btn = document.getElementById("musicToggle");
  if (!audio || !btn) return;

  audio.preload = "auto";
  audio.loop = true;

  const render = () => {
    const playing = !audio.paused;
    btn.classList.toggle("is-playing", playing);
    btn.textContent = playing ? "🔊 暂停音乐" : "🔊 播放音乐";
  };

  const tryPlay = async () => {
    try {
      await audio.play();
    } catch (err) {
      // Autoplay may be blocked; ignore
    }
    render();
  };

  tryPlay();
  window.addEventListener("load", () => tryPlay());
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tryPlay();
  });

  const unlock = () => {
    tryPlay();
    document.removeEventListener("click", unlock);
    document.removeEventListener("touchstart", unlock);
    document.removeEventListener("keydown", unlock);
  };
  document.addEventListener("click", unlock, { once: true });
  document.addEventListener("touchstart", unlock, { once: true });
  document.addEventListener("keydown", unlock, { once: true });

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (err) {
      console.warn("BGM play failed:", err);
    }
    render();
  });

  audio.addEventListener("play", render);
  audio.addEventListener("pause", render);
  render();
};

// Run fetch and animation in sequence
fetchData();
setupBgm();
