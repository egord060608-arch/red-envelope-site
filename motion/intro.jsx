// Моушн-интро канала «Красный конверт» (1920x1080, 30 fps, 13 c).
// Сборка: higgsedit build motion/intro.jsx  →  renders/intro.mp4
const C = { paper:"#f5ecd9", paperDark:"#ecdfc2", ink:"#2b2420", soft:"#5c5048", red:"#b3261e", redDark:"#8c1c16", gold:"#e8c36a", mustard:"#c9a227", card:"#fbf6ec", line:"#d9c9a8" };
const W = 1920, H = 1080;

const Envelope = ({ x, y, w, delay = 0, name }) => {
  const h = Math.round(w * 2 / 3);
  const s = Math.round(w * 0.13);
  return (
    <frame name={name} layout="none" x={x} y={y} width={w} height={h} origin="center"
      shadow={{ x: 0, y: 18, blur: 40, color: "rgba(140,28,22,0.35)" }}
      motion={{ enter: { from: { scale: 0.2, rotation: -10 }, duration: 0.8, easing: { kind: "overshoot", amount: 1.6 }, at: delay } }}
      animate={[{ property: "opacity", keyframes: [{ at: 0, value: 0 }, { at: delay, value: 0 }, { at: delay + 0.3, value: 1 }] }]}>
      <rect x={0} y={0} width={w} height={h} radius={Math.round(w * 0.05)} fill={C.red} />
      <path x={0} y={0} width={w} height={h} fill={C.redDark}
        d={`M0 0 L${w} 0 L${w / 2} ${Math.round(h * 0.58)} Z`} />
      <rect x={w / 2 - s / 2} y={Math.round(h * 0.5) - s / 2} width={s} height={s} radius={s / 2} fill={C.gold}
        animate={[{ property: "scale", keyframes: [{ at: 0, value: 0 }, { at: delay + 0.6, value: 0 }, { at: delay + 0.9, value: 1.35 }, { at: delay + 1.1, value: 1 }] }]} />
    </frame>
  );
};

const Bg = () => (
  <rect x={0} y={0} width={W} height={H}
    fill={{ kind: "radial", stops: [{ offset: 0, color: C.paper }, { offset: 1, color: C.paperDark }] }}
    effects={[{ kind: "film-grain", params: { amount: 0.03 } }]} />
);

const fadeScene = (enterDur, exitDur) => ({
  enter: { from: { opacity: 0 }, duration: enterDur },
  exit: { to: { opacity: 0, scale: 1.04 }, duration: exitDur, anchor: "end" },
});

const Card = ({ x, cover, glyph, title, line }) => (
  <frame layout="none" x={x} y={0} width={480} height={600} radius={22} background={C.card} clip={true}
    shadow={{ x: 0, y: 14, blur: 34, color: "rgba(43,36,32,0.18)" }}>
    <rect x={0} y={0} width={480} height={300} fill={cover} />
    {glyph}
    <text x={36} y={330} width={410} fontFamily="Playfair Display" fontWeight={700} fontSize={54} color={C.ink}>{title}</text>
    <text x={36} y={410} width={410} fontFamily="Inter" fontWeight={400} fontSize={30} lineHeight={1.35} color={C.soft}>{line}</text>
    <text x={36} y={530} width={410} fontFamily="Inter" fontWeight={700} fontSize={28} color={C.red}>Смотреть →</text>
  </frame>
);

const fadeIn = (at) => [{ property: "opacity", keyframes: [{ at: 0, value: 0 }, { at, value: 0 }, { at: at + 0.3, value: 1 }] }];
const rise = (target, rotation) => ({ target, from: { y: 120, rotation }, duration: 0.7, easing: { kind: "overshoot", amount: 1.2 } });

let ICON;
export default async ({ project, icon }) => {
  ICON = icon;
  const p = await project({ size: `${W}x${H}`, fps: 30, background: C.paper });

  // Сцена 1: появление логотипа
  p.compose(
    <frame layout="none" width={W} height={H} origin="center" motion={fadeScene(0.01, 0.5)}>
      <Bg />
      <Envelope x={W / 2 - 180} y={170} w={360} delay={0.1} />
      <text x={0} y={470} width={W} align="center" fontFamily="Playfair Display" fontWeight={700} fontSize={160} color={C.red}
        motion={{ by: "character", from: { opacity: 0, y: 60 }, at: 0.7, duration: 1.0, easing: "house" }}>Красный конверт</text>
      <rect x={W / 2 - 220} y={700} width={440} height={4} fill={C.red}
        animate={[{ property: "scaleX", keyframes: [{ at: 0, value: 0 }, { at: 1.5, value: 0 }, { at: 2.1, value: 1 }] }]} />
      <text x={0} y={740} width={W} align="center" fontFamily="Playfair Display" fontWeight={400} italic={true} fontSize={60} color={C.soft}
        motion={{ by: "word", from: { opacity: 0, y: 24 }, at: 1.8, duration: 0.8, easing: "ease-out" }}>Как строятся бизнес-империи</text>
    </frame>,
    { at: 0, dur: 4.2, name: "Logo" }
  );

  // Сцена 2: карточки историй
  p.compose(
    <frame layout="none" width={W} height={H} origin="center" motion={fadeScene(0.4, 0.5)}>
      <Bg />
      <text x={0} y={110} width={W} align="center" fontFamily="Playfair Display" fontWeight={700} fontSize={76} color={C.ink}
        motion={{ by: "word", from: { opacity: 0, y: 30 }, at: 0.2, duration: 0.7, easing: "house" }}>Истории компаний, которые знает весь мир</text>
      <frame name="Cards" layout="none" x={180} y={290} width={1560} height={640}
        motion={{ timeline: { stagger: [rise("C1", -4), rise("C2", 3), rise("C3", -3)], each: 0.28, at: 0.6 } }}>
        <frame name="C1" animate={fadeIn(0.6)} layout="none" x={0} y={0} width={480} height={620} origin="center">
          <Card x={0} cover={C.redDark} title="Netflix" line="DVD по почте, который победил Blockbuster"
            glyph={<text x={0} y={40} width={480} align="center" fontFamily="Playfair Display" fontWeight={700} fontSize={200} color="#ffffff">N</text>} />
        </frame>
        <frame name="C2" animate={fadeIn(0.88)} layout="none" x={540} y={0} width={480} height={620} origin="center">
          <Card x={0} cover={C.mustard} title="Spirit Airlines" line="Сверхнизкие цены — и цена за них"
            glyph={ICON("plane", { x: 160, y: 70, size: 160, color: C.ink, strokeWidth: 1.6 })} />
        </frame>
        <frame name="C3" animate={fadeIn(1.16)} layout="none" x={1080} y={0} width={480} height={620} origin="center">
          <Card x={0} cover={C.red} title="Lego" line="От столярной мастерской до империи игрушек"
            glyph={ICON("blocks", { x: 160, y: 70, size: 160, color: "#ffffff", strokeWidth: 1.6 })} />
        </frame>
      </frame>
    </frame>,
    { at: 3.8, dur: 5.4, name: "Stories" }
  );

  // Сцена 3: призыв подписаться
  p.compose(
    <frame layout="none" width={W} height={H} origin="center" motion={{ enter: { from: { opacity: 0 }, duration: 0.4 } }}>
      <Bg />
      <Envelope x={W / 2 - 110} y={200} w={220} delay={0.2} />
      <text x={0} y={440} width={W} align="center" fontFamily="Playfair Display" fontWeight={700} fontSize={88} color={C.ink}
        motion={{ by: "word", from: { opacity: 0, y: 30 }, at: 0.5, duration: 0.8, easing: "house" }}>Новые истории — каждую неделю</text>
      <frame name="Btn" layout="none" x={W / 2 - 280} y={640} width={560} height={130} radius={65} background={C.red} origin="center"
        shadow={{ x: 0, y: 10, blur: 28, color: "rgba(179,38,30,0.4)" }}
        motion={{ enter: { from: { scale: 0.4 }, duration: 0.6, easing: { kind: "overshoot", amount: 2 }, at: 1.3 } }}
        animate={[{ property: "opacity", keyframes: [{ at: 0, value: 0 }, { at: 1.3, value: 0 }, { at: 1.5, value: 1 }] }]}>
        {ICON("bell", { x: 70, y: 37, size: 56, color: "#ffffff", strokeWidth: 2.2, animate: [{ property: "rotation", keyframes: [{ at: 0, value: 0 }, { at: 2.2, value: 0 }, { at: 2.35, value: 18 }, { at: 2.5, value: -16 }, { at: 2.65, value: 10 }, { at: 2.8, value: 0 }] }] })}
        <text x={140} y={33} width={380} align="center" fontFamily="Inter" fontWeight={700} fontSize={54} color="#ffffff">Подписаться</text>
      </frame>
    </frame>,
    { at: 8.8, dur: 4.2, name: "Subscribe" }
  );

  await p.render("renders/intro.mp4");
};
