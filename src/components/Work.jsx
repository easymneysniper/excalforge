import './Work.css';

const crownedUrl = 'https://www.crowned.bg/';
const boutiqueUrl = 'projects/sample-website/index.html';
const skincareUrl = 'projects/skincare-studio/index.html';

function CrownedPreview() {
  return (
    <a
      className="selectedWorkPreview"
      href={crownedUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Към сайта CROWNED — отваря се в нов раздел"
    >
      <div className="selectedWorkPreviewTop" aria-hidden="true"><span>EXCALFORGE / SELECTED WORK</span><span>01</span></div>
      <div className="crownedDevices">
        <div className="crownedDesktop">
          <div className="crownedBrowserBar" aria-hidden="true"><span><i /><i /><i /></span><span>crowned.bg</span><span>↗</span></div>
          <img
            src="/projects/crowned-desktop.webp"
            srcSet="/projects/crowned-desktop-960.webp 960w, /projects/crowned-desktop.webp 1440w"
            sizes="(max-width: 620px) 82vw, (max-width: 960px) 76vw, 620px"
            width="1440"
            height="1000"
            alt="Началната страница на CROWNED с колекцията лимитирани шапки"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="crownedMobile" aria-hidden="true">
          <img src="/projects/crowned-mobile.webp" width="390" height="844" alt="" loading="lazy" decoding="async" />
        </div>
      </div>
      <div className="selectedWorkPreviewBottom" aria-hidden="true"><span>DESKTOP + MOBILE</span><span className="selectedWorkOpen">Към сайта <span>↗</span></span></div>
    </a>
  );
}

export default function Work() {
  return (
    <section id="work" className="section selectedWork">
      <div className="container">
        <header className="selectedWorkHead reveal">
          <p className="sectionEyebrow">Избрани проекти <span>01 — 03</span></p>
          <h2>От идея до<br /><span className="grad">работещ сайт.</span></h2>
          <p className="selectedWorkIntro">Част от сайтовете, които съм изработил. Реален онлайн магазин и две собствени концепции — всяка със своя цел и характер.</p>
        </header>

        <article className="selectedWorkFeatured" aria-labelledby="crowned-project-title">
          <div className="reveal"><CrownedPreview /></div>
          <div className="selectedWorkStory reveal">
            <div className="selectedWorkMeta"><span><i /> Реализиран проект</span><span>01 / 03</span></div>
            <h3 id="crowned-project-title">CROWNED</h3>
            <p className="selectedWorkStatement">Лимитирани серии.<br />Собствен характер.</p>
            <p className="selectedWorkDescription">Онлайн магазин за български бранд с лимитирани шапки с бродерия. Продуктите и детайлите са на преден план — от разглеждането на колекциите до поръчката.</p>
            <dl className="selectedWorkDetails">
              <div><dt>Моята роля</dt><dd>Изработка на уебсайта</dd></div>
              <div><dt>Тип проект</dt><dd>Онлайн магазин</dd></div>
              <div><dt>Фокус</dt><dd>Продукти и онлайн продажби</dd></div>
            </dl>
            <div className="selectedWorkTags" aria-label="Функционалности"><span>Продуктов каталог</span><span>Количка</span><span>Мобилна версия</span></div>
            <a className="selectedWorkLink" href={crownedUrl} target="_blank" rel="noopener noreferrer">
              <span>Разгледайте crowned.bg<span className="visuallyHidden"> (отваря се в нов раздел)</span></span><span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>

        <article className="selectedWorkDemo reveal" aria-labelledby="boutique-project-title">
          <a className="selectedWorkDemoLink" href={boutiqueUrl}>
            <div className="selectedWorkDemoImage" aria-hidden="true"><span>Boutique</span><small>PERSONAL STYLE / DIGITAL CONCEPT</small></div>
            <div className="selectedWorkDemoCopy">
              <div className="selectedWorkDemoMeta"><span>02 / 03</span><span>Демо проект</span></div>
              <h3 id="boutique-project-title">Boutique</h3>
              <p>Собствена концепция за моден бранд. Спокойна визия, колекции и ясен път до заявка за личен стайлинг.</p>
              <span className="selectedWorkDemoRole">Дизайн и разработка</span>
            </div>
            <span className="selectedWorkDemoAction">Разгледайте демото <span aria-hidden="true">↗</span></span>
          </a>
        </article>

        <article className="selectedWorkDemo selectedWorkDemo--skincare reveal" aria-labelledby="skincare-project-title">
          <a className="selectedWorkDemoLink" href={skincareUrl}>
            <div className="selectedWorkDemoImage selectedWorkDemoImage--skincare" aria-hidden="true" />
            <div className="selectedWorkDemoCopy">
              <div className="selectedWorkDemoMeta"><span>03 / 03</span><span>Демо проект</span></div>
              <h3 id="skincare-project-title">SKINCARE STUDIO</h3>
              <p>Собствена концепция за бутиково студио за красота. Представяне на процедури, галерия и удобен път до запазване на час.</p>
              <span className="selectedWorkDemoRole">Дизайн и разработка</span>
            </div>
            <span className="selectedWorkDemoAction">Разгледайте демото <span aria-hidden="true">↗</span></span>
          </a>
        </article>
      </div>
    </section>
  );
}
