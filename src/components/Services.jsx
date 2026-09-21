import './Services.css';

const services = [
  {
    id: 'websites', title: 'Уебсайтове', action: 'Вижте пакетите за сайт', href: '#pricing',
    description: 'Представете услугите си убедително. Улеснете запитванията и резервациите или дайте на клиентите удобен начин да купуват онлайн.',
    capabilities: ['Бизнес и портфолио сайтове', 'Лендинг страници за кампании', 'Онлайн магазини и резервации', 'Редизайн, мобилна версия и базово SEO'],
  },
  {
    id: 'business-systems', title: 'Уеб приложения и системи', action: 'Какво може да се подреди', href: '#systems',
    description: 'Когато таблиците и съобщенията вече не стигат — едно място за клиентите, задачите и информацията, с която екипът работи всеки ден.',
    capabilities: ['CRM и клиентски портали', 'Табла и административни панели', 'Управление на часове, поръчки и наличности', 'Вътрешни инструменти за екипа'],
  },
  {
    id: 'automation', title: 'Автоматизация и интеграции', action: 'Вижте примерен процес', href: '#workflow',
    description: 'Ако повтаряте една и съща дигитална задача на ръка, вероятно може да я автоматизираме. Свързваме инструментите, които вече използвате.',
    capabilities: ['Форма → CRM или Google Sheets', 'Имейл известия и напомняния', 'Автоматични отчети', 'Синхронизация на данни и API интеграции'],
  },
  {
    id: 'maintenance', title: 'Поддръжка и развитие', action: 'Обсъдете поддръжката', href: '#contact',
    description: 'Публикуването е само началото. Оставам насреща за промени, наблюдение и подобрения, докато нуждите на бизнеса се развиват.',
    capabilities: ['Промени по съдържание, услуги и продукти', 'Наблюдение, архиви и базови проверки за сигурност', 'Съдействие с хостинг, домейн, DNS и SSL', 'Анализи и базова SEO поддръжка'],
  },
];

export default function Services() {
  return (
    <section id="services" className="section servicesSection" aria-labelledby="services-heading">
      <div className="container">
        <header className="servicesHeading reveal">
          <p className="sectionEyebrow">С какво мога да помогна</p>
          <h2 id="services-heading">От сайта Ви до<br /><span className="grad">работата зад него.</span></h2>
          <p>Започваме с това, което Ви е нужно сега. Сайт, вътрешен инструмент или по-кратък път между двете.</p>
        </header>
        <div className="servicesList">
          {services.map((service, index) => (
            <article id={service.id} className="serviceRow reveal" key={service.id} aria-labelledby={`${service.id}-heading`}>
              <span className="serviceIndex" aria-hidden="true">0{index + 1}</span>
              <div className="serviceCopy">
                <h3 id={`${service.id}-heading`}>{service.title}</h3>
                <p>{service.description}</p>
                <a className="serviceLink" href={service.href}>{service.action}<span aria-hidden="true">↗</span></a>
              </div>
              <ul>{service.capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className="serviceSupporting reveal">При нужда: Google Business и локално SEO · Google Analytics и Search Console · Meta Pixel и проследяване на реализации.</p>

        <div id="systems" className="systemsStory">
          <div className="systemsCopy reveal">
            <p className="sectionEyebrow">Софтуер по Вашия начин на работа</p>
            <h2>Още една таблица.<br />Или по-ясен процес?</h2>
            <p>Клиентът пише на едно място, поръчката е в таблица, а задачата остава на лист. Изграждам уеб приложения и CRM системи, които събират тези стъпки в общ работен процес.</p>
            <p>Уточняваме кой какво вижда, как се движи работата и кои инструменти трябва да се свържат. Започваме с най-нужното и разширяваме, когато има смисъл.</p>
            <a className="serviceLink" href="#contact">Разкажете ми как работите<span aria-hidden="true">↗</span></a>
          </div>
          <div id="workflow" className="workflowExample reveal" aria-labelledby="workflow-heading">
            <div className="workflowBar"><span className="workflowDots" aria-hidden="true"><i /><i /><i /></span><span>ПРИМЕРЕН ПРОЦЕС</span></div>
            <div className="workflowBody">
              <h3 id="workflow-heading">От запитването до следващата стъпка</h3>
              <ol className="workflowSteps">
                <li><span aria-hidden="true">01</span><div><strong>Сайт / форма</strong><p>Клиентът изпраща запитване.</p></div></li>
                <li><span aria-hidden="true">02</span><div><strong>CRM / бизнес система</strong><p>Данните се записват и заявката получава отговорник.</p></div></li>
                <li><span aria-hidden="true">03</span><div><strong>Автоматично известие</strong><p>Екипът получава имейл с нужната информация.</p></div></li>
                <li><span aria-hidden="true">04</span><div><strong>Напомняне / отчет</strong><p>Следващото действие е планирано, статусът е видим.</p></div></li>
              </ol>
              <p className="workflowNote">Пример за възможна автоматизация. Конкретните стъпки зависят от Вашия процес и използваните инструменти.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
