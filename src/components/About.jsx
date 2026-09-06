import { useEffect, useRef, useState } from 'react';
import './About.css';

const stages = [
  { title: 'Структура', text: 'Намираме мястото на всяка идея.', note: 'Първо — ясна посока.' },
  { title: 'Дизайн', text: 'Даваме характер на всеки детайл.', note: 'После — собствен почерк.' },
  { title: 'Реализация', text: 'Всичко оживява в работещ сайт.', note: 'Накрая — готов за света.' }
];

function SiteLayers() {
  return (
    <div className="forgeAssembly">
      <div className="forgeLayer forgeBlueprint">
        <div className="forgeBlueprintBar"><i /><span /><i /></div>
        <div className="forgeBlueprintGrid"><div /><div /><div /><div /></div>
        <span className="forgeLayerIndex">01 / СТРУКТУРА</span>
        <i className="forgeAnchor forgeAnchorA" /><i className="forgeAnchor forgeAnchorB" />
        <i className="forgeAnchor forgeAnchorC" /><i className="forgeAnchor forgeAnchorD" />
      </div>

      <div className="forgeLayer forgeDesign">
        <div className="forgeDesignTop"><span>Aa</span><div><i /><i /><i /></div></div>
        <div className="forgeDesignRule" />
        <div className="forgeDesignGrid"><span /><span /><span /></div>
        <span className="forgeLayerIndex">02 / ДИЗАЙН</span>
      </div>

      <div className="forgeLayer forgeWebsite">
        <div className="forgeBrowserBar">
          <span className="forgeBrowserDots"><i /><i /><i /></span>
          <span>your-idea.site</span>
          <span className="forgeBrowserPlus">+</span>
        </div>
        <div className="forgeWebsiteNav"><strong>forma<span>®</span></strong><span>Идея &nbsp; / &nbsp; Детайл &nbsp; / &nbsp; Контакт</span></div>
        <div className="forgeWebsiteHero">
          <div className="forgeWebsiteCopy">
            <span className="forgeWebsiteEyebrow">МАЛКО СМЕЛОСТ. МНОГО ХАРАКТЕР.</span>
            <strong>Идеите<br />добиват<br /><em>форма.</em></strong>
            <span className="forgeWebsiteCta">Да започнем <span>↗</span></span>
          </div>
          <div className="forgeSculpture"><i /><i /><i /><span /></div>
        </div>
        <div className="forgeWebsiteFooter"><span>Създаден с внимание.</span><span>© EXCALFORGE</span></div>
      </div>
    </div>
  );
}

export default function About({ reducedMotion, coarsePointer, onNavigate }) {
  const [stage, setStage] = useState(1);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || coarsePointer || !inView) {
      cancelAnimationFrame(frameRef.current);
      sceneRef.current?.style.removeProperty('--forge-pointer-x');
      sceneRef.current?.style.removeProperty('--forge-pointer-y');
    }
  }, [reducedMotion, coarsePointer, inView]);

  const moveScene = (event) => {
    if (reducedMotion || coarsePointer || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      sceneRef.current?.style.setProperty('--forge-pointer-x', `${x * 7}deg`);
      sceneRef.current?.style.setProperty('--forge-pointer-y', `${-y * 6}deg`);
    });
  };

  const resetScene = () => {
    cancelAnimationFrame(frameRef.current);
    sceneRef.current?.style.removeProperty('--forge-pointer-x');
    sceneRef.current?.style.removeProperty('--forge-pointer-y');
  };

  return (
    <section id="about" className="section aboutForge" ref={sectionRef} data-in-view={inView} aria-labelledby="forge-heading">
      <div className="container">
        <div className="forgeSectionTop reveal"><span><i /> ЧОВЕКЪТ ЗАД EXCALFORGE</span><span>ДИЗАЙН + РАЗРАБОТКА</span></div>

        <div className="forgeLayout">
          <div className="forgeIntro reveal">
            <h2 id="forge-heading">Вашата идея.<br /><span>Моят почерк<i>.</i></span></h2>
            <p className="forgeLead">Говорите с човека,<br />който прави сайта Ви.</p>
            <p className="forgeBio">От първата скица до последния ред код — поемам целия път. Обичам ясния дизайн, смислените детайли и онова малко движение, което прави един сайт запомнящ се.</p>
            <a className="forgeContact" href="#contact" onClick={(event) => { event.preventDefault(); onNavigate('#contact'); }}>
              Да обсъдим Вашата идея <span aria-hidden="true">↗</span>
            </a>
            <div className="forgeCredentials">
              <div className="forgeExperience"><strong>3<span>+</span></strong><span>години<br />практика</span></div>
              <div className="forgeEducation"><span>В основата</span><strong>Софтуерно<br />инженерство</strong></div>
            </div>
          </div>

          <div className="forgeWorkbench" data-stage={stage}>
            <div className="forgeWorkbenchTop"><span><i /> ОТ ИДЕЯ ДО САЙТ</span><span>0{stage + 1} / 03</span></div>
            <div className="forgeScene" ref={sceneRef} onPointerMove={moveScene} onPointerLeave={resetScene} aria-hidden="true">
              <div className="forgeSceneGuides"><span /><span /><span /><span /></div>
              <div className="forgeSceneGround" />
              <div className="forgeSceneScale"><div className="forgeSceneFloat"><SiteLayers /></div></div>
              <span className="forgeSceneAnnotation forgeAnnotationTop">идея → форма</span>
            </div>
            <div className="forgeSceneCaption"><span aria-live="polite">{stages[stage].note}</span><span className="forgePointerHint">Покажете следващия слой ↓</span></div>
            <div className="forgeStages" role="group" aria-label="Етапи на създаване на сайта">
              {stages.map((item, index) => (
                <button type="button" key={item.title} className="forgeStage" aria-pressed={stage === index} onClick={() => setStage(index)}>
                  <span className="forgeStageNumber">0{index + 1}<span aria-hidden="true">↗</span></span>
                  <strong>{item.title}</strong>
                  <span className="forgeStageDescription">{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="forgeSectionBottom reveal"><span>Един човек. Цялата картина.</span><span className="forgeSignature">ExcalForge<span aria-hidden="true">↗</span></span></div>
      </div>
    </section>
  );
}
