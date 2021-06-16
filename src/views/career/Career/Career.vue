<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="page career">
    <div class="layout">
      <div class="card">
        <div class="about">
          <img class="andrew" alt="Andrew Ovsyannikov" src="@/assets/andrew.png">
          <div class="bio">
            <h1>{{$t('HiAndrew')}}</h1>
            <h2>{{$t('HiAndrew2')}} {{experience}} {{$t('HiAndrew3')}}</h2>
          </div>
        </div>
        <div class="social-media">
          <a class="logo" href="//github.com/drewdru">
            <img class="logo" alt="Drew Dru on GitHub" src="@/assets/github.svg">
          </a>
          <a class="logo" href="//career.habr.com/drew-dru">
            <img class="logo" alt="Drew Dru on Habr career" src="@/assets/habr.jpg">
          </a>
          <a class="logo" href="//www.linkedin.com/in/andrew-ovsyannikov-b97479169/">
            <img class="logo" alt="Drew Dru on Linkedin" src="@/assets/linkedin.svg">
          </a>
          <a class="logo" href="//www.upwork.com/freelancers/~01e59297900f2b4845">
            <img class="logo" alt="Drew Dru on Upwork" src="@/assets/upwork.png">
          </a>
          <a class="logo" href="//t.me/DrewDru/">
            <img class="logo" alt="Drew Dru on Telegram" src="@/assets/telegram.svg">
          </a>
          <a class="logo" href="//join.skype.com/invite/IeLaeqpigHWr">
            <img class="logo" alt="Drew Dru on Skype" src="@/assets/skype.svg">
          </a>
          <a class="logo" href="mailto:drewdrux@gmail.com">
            <img class="logo" alt="Mail to Drew Dru" src="@/assets/gmail.png">
          </a>
        </div>
      </div>
      <div class="card">
        <article>
          <p class="text">🤩 {{$t('FrontendPrefer')}} JavaScript(Vue.js, React, Angular, Node.js, jQuery), HTML, CSS(Less, Bootstrap/Material).</p>
          <p class="text">🧑‍💻 {{$t('BackendPrefer')}} Python(FastApi, Django/DRF, Flask, SQLAlchemy), SQL(PostgreSQL, MongoDB), Nginx, Docker, Celery, Redis.</p>
          <p class="text">🤓 {{$t('ILikeToGrow')}}</p>
          <p class="text">🤖 {{$t('SeeMyPetProjects')}} <a href="https://github.com/drewdru">GitHub</a>.</p>
          <details class="description">
            <summary>🎓 {{$t('ImAMaster')}}</summary>
            <div class="description-body">
              <h3>2016-2018</h3>
              <p class="text">
                <strong>{{$t('AerospaceUniversity')}}</strong><br>
                <em>{{$t('MasterOfComputerScience')}}</em><br>
                {{$t('Faculty')}}: {{$t('InformationTelecommunications')}}<br>
                {{$t('Specialty')}}: {{$t('MasterSpecialty')}}<br>
              </p>
              <h3>2012-2016</h3>
              <p>
                <strong>{{$t('AerospaceUniversity')}}</strong><br>
                <em>{{$t('BachelorOfComputerScience')}}</em><br>
                {{$t('Faculty')}}: {{$t('InformationTelecommunications')}}<br>
                {{$t('Specialty')}}: {{$t('BachelorSpecialty')}}<br>
              </p>
            </div>
          </details>
        </article>
      </div>
      <div class="card">
        <h1>⚡ {{$t('MySkills')}}</h1>
        <table>
          <tbody>
            <tr>
              <th><strong>{{$t('OperatingSystems')}}</strong></th>
              <td>Linux, Windows</td>
            </tr>
            <tr>
              <th><strong>{{$t('DevelopmentLanguages')}}</strong></th>
              <td>Python, JS/TS, Qt/C++/QML, C, C#, Go</td>
            </tr>
            <tr>
              <th><strong>{{$t('Frameworks')}}</strong></th>
              <td>FastAPI, Django/DRF, Flask, Vue.js(Vuetify, Nuxt), React(Next.js), Node.js, AngularJs, jQuery</td>
            </tr>
            <tr>
              <th><strong>{{$t('DBMS')}}</strong></th>
              <td>PostgreSQL, MongoDB, MySQL, SQLite, Redis, RabbitMQ</td>
            </tr>
            <tr>
              <th><strong>{{$t('Others')}}</strong></th>
              <td>Celery, Docker, Nginx, Git, AWS (Amplify, Lambda, S3, Cognito, DynamoDB),  WebRTC</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <article class="experience">
          <h1>🔬 {{$t('MyExperience')}}</h1>
          <div class="card">
            <h3>{{$t('July')}} 2020 - {{$t('ToDate')}}</h3>
            <p class="text">
              <strong>{{$t('FullStackDeveloper')}} | {{$t('Freelance')}}</strong><br>
              🔗 <a href="https://www.upwork.com/freelancers/~01e59297900f2b4845/">{{$t('MyUpworkAccount')}}</a><br>
              ⚡ <em>{{$t('Skills')}}: Python(FastAPI, Flask, Tornado), NodeJS(Express), Vue.js, WebRTC, Docker, Angular, AWS (Amplify, Lambda, DynamoDB, Cognito), PostgreSql, RabbitMQ, Docker, GraphQL</em><br>
            </p>
            <details class="description">
              <summary>🛠 {{$t('Description')}}</summary>
              <div class="description-body">
                <ol >
                  <li><b>{{$t('MyExperienceUpwork_1_1')}}</b>: {{$t('MyExperienceUpwork_1_2')}} – <i>Angular, AWS (Amplify, Lambda, DynamoDB, Cognito), GraphQL</i></li>
                  <li><b>{{$t('MyExperienceUpwork_2_1')}}</b>: {{$t('MyExperienceUpwork_2_2')}} – <i>NodeJS</i></li>
                  <li><b>{{$t('MyExperienceUpwork_3_1')}}</b>: {{$t('MyExperienceUpwork_3_2')}} – <i>FastAPI, SqlAlchemy 1.4.0b1</i></li>
                  <li><b>{{$t('MyExperienceUpwork_4_1')}}</b>: {{$t('MyExperienceUpwork_4_2')}} – <i>Vue.js, Python(Tornado)</i></li>
                </ol>
              </div>
            </details>
          </div>
          <div class="card">
            <h3>{{$t('August')}} 2018 - {{$t('October')}} 2020</h3>
            <p class="text">
              <strong>{{$t('FullStackDeveloper')}} | YLab Development</strong><br>
              🔗 <a href="https://ylab.io/">https://ylab.io/</a><br>
              ⚡ <em>{{$t('Skills')}}: Python(Django/DRF, Flask), Go, AngularJS, Vuejs, PostgreSql, Redis, Celery, Docker</em><br>
            </p>
            <details class="description">
              <summary>🛠 {{$t('Description')}}</summary>
              <div class="description-body">
                <ol type="1">
                  <li><a href="https://ecn.broker/en/">ECN.Broker</a>
                    <ul>
                      <li>{{$t('MyExperienceECNBroker_1_1')}} <a href="https://esplanade-ms.com/en/">Esplanade MS</a> {{$t('MyExperienceECNBroker_1_2')}} <a href="https://ecn.broker/en/">ECN.Broker</a>.</li>
                      <li>{{$t('MyExperienceECNBroker_2')}}</li>
                      <li>{{$t('MyExperienceECNBroker_3')}}</li>
                      <li>{{$t('MyExperienceECNBroker_4')}} API <strong>MetaTrader 4</strong>.</li>
                      <li>{{$t('MyExperienceECNBroker_5_1')}} <strong>Telegram</strong> {{$t('MyExperienceECNBroker_5_2')}}</li>
                      <li>{{$t('MyExperienceECNBroker_6')}}</li>
                      <li>{{$t('MyExperienceECNBroker_7_1')}} <strong>Docker</strong> {{$t('MyExperienceECNBroker_7_2')}}</li>
                      <li>{{$t('MyExperienceECNBroker_8_1')}} <strong>WordPress</strong> {{$t('MyExperienceECNBroker_8_2')}}</li>
                      <li>{{$t('MyExperienceECNBroker_9_1')}} <strong>RBK.money</strong>, <strong>Accentpay</strong> {{$t('MyExperienceECNBroker_9_2')}} <strong>Interkassa</strong> {{$t('MyExperienceECNBroker_9_3')}}</li>
                      <li>{{$t('MyExperienceECNBroker_10')}}</li>
                      <li>{{$t('MyExperienceECNBroker_11_1')}} <strong>WYSIWYG Quill</strong> {{$t('MyExperienceECNBroker_11_2')}}</li>
                      <li>{{$t('MyExperienceECNBroker_12_1')}} API <strong>Claws &amp; Horns</strong>, {{$t('MyExperienceECNBroker_12_2')}} <strong>google visualization charts</strong>.</li>
                      <li>{{$t('MyExperienceECNBroker_13')}} API <strong>IndigoSoft</strong>.</li>
                      <li>{{$t('MyExperienceECNBroker_14')}}</li>
                      <li>{{$t('MyExperienceECNBroker_15_1')}} <strong>RAMM</strong> {{$t('MyExperienceECNBroker_15_2')}}</li>
                      <li>{{$t('MyExperienceECNBroker_16')}} <strong>SendGrid</strong>.</li>
                      <li>{{$t('MyExperienceECNBroker_17_1')}} API <strong>Bpilot</strong> {{$t('MyExperienceECNBroker_17_2')}}</li>
                    </ul>
                  </li>
                  <li><a href="https://b2b-export.com/en/">B2B-export</a>
                    <ul>
                      <li>{{$t('MyExperienceB2BExport_1')}}</li>
                      <li>{{$t('MyExperienceB2BExport_2')}}</li>
                      <li>{{$t('MyExperienceB2BExport_3')}}</li>
                      <li>{{$t('MyExperienceB2BExport_4_1')}} <strong>ABBY</strong> {{$t('MyExperienceB2BExport_4_2')}}</li>
                    </ul>
                  </li>
                  <li><a href="https://carreta.ru/">Carreta</a>
                    <ul>
                      <li>{{$t('MyExperienceCarreta')}}</li>
                    </ul>
                  </li>
                  <li><a href="https://teachlearnlanguages.com/en/">TeachLearnLanguages</a>
                    <ul>
                      <li>{{$t('MyExperienceTeachLearnLanguages_1')}} API <strong>ipstack</strong>.</li>
                      <li>{{$t('MyExperienceTeachLearnLanguages_2')}} <strong>S3Storage</strong>.</li>
                      <li>{{$t('MyExperienceTeachLearnLanguages_3')}}</li>
                      <li>{{$t('MyExperienceTeachLearnLanguages_4_1')}} <strong>Django</strong> {{$t('MyExperienceTeachLearnLanguages_4_2')}}</li>
                    </ul>
                  </li>
                  <li><strong>{{$t('InternalProjects')}}</strong>
                    <ul>
                      <li>{{$t('MyExperienceInternalProjects_1')}} (<strong>scrapy</strong> + <strong>selenium</strong>).</li>
                      <li>{{$t('MyExperienceInternalProjects_2')}} <strong>Clickhouse</strong> + <strong>MSSql</strong>.</li>
                      <li>{{$t('MyExperienceInternalProjects_3')}} (<strong>TensorFlow</strong>)</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </details>
          </div>
          <div class="card">
            <h3>{{$t('September')}} 2016 - {{$t('February')}} 2018</h3>
            <p class="text">
              <strong>{{$t('SoftwareEngineer')}} | Aigeo</strong><br>
              🔗 <a href="http://aigeo.ru/">http://aigeo.ru/</a><br>
              ⚡ <em>{{$t('Skills')}}: Python(Django/SQLAlchemy), AngularJS, OpenLayers 3, PostgreSQL</em><br>
            </p>
            <details class="description">
              <summary>🛠 {{$t('Description')}}</summary>
              <div class="description-body">
                <ul>
                  <li>{{$t('MyExperienceAigeo_1_1')}} <a href="http://references.aigeo.ru/">Aigeo References</a> {{$t('MyExperienceAigeo_1_2')}}</li>
                  <li>{{$t('MyExperienceAigeo_2_1')}} <a href="http://references-map.aigeo.ru/">Aigeo References Map</a> {{$t('MyExperienceAigeo_2_2')}}</li>
                  <li>{{$t('MyExperienceAigeo_3_1')}} <a href="http://map.med-monitor.ru/">Medical Areas</a>(<a href="http://meduch2.aigeo.ru/">{{$t('MyExperienceAigeo_3_2')}}</a>).</li>
                  <li>{{$t('MyExperienceAigeo_4_1')}} <a href="http://map.med-monitor.ru/">Medical Areas</a> {{$t('MyExperienceAigeo_4_2')}} <a href="http://med-monitor.ru/">Med-monitor</a>(<a href="http://med-monitor.aigeo.ru">{{$t('MyExperienceAigeo_4_3')}}</a>).</li>
                  <li>{{$t('MyExperienceAigeo_5_1')}} <a href="http://api.aigeo.ru/pages/normalizer">Normalizer</a> {{$t('MyExperienceAigeo_5_2')}}</li>
                  <li>{{$t('MyExperienceAigeo_6_1')}} <a href="https://github.com/capooti/geonode">Geonode</a> {{$t('MyExperienceAigeo_6_2')}} <a href="https://git.aigeo.ru/aigeo/geonode">{{$t('MyExperienceAigeo_6_3')}}</a>. {{$t('MyExperienceAigeo_6_4')}} <strong>CSW</strong> {{$t('MyExperienceAigeo_6_5')}}</li>
                </ul>
              </div>
            </details>
          </div>
          <div class="card">
            <h3>{{$t('July')}} 2015 - {{$t('August')}} 2015</h3>
            <p class="text">
              <strong>{{$t('JuniorWebDeveloper')}} | Alpateks</strong><br>
              🔗 <a href="http://alpateks.ru/">http://alpateks.ru/</a><br>
              ⚡ <em>{{$t('Skills')}}: Python(Django, Grab), PostgreSQL, Bash</em><br>
            </p>
            <details class="description">
              <summary>🛠 {{$t('Description')}}</summary>
              <div class="description-body">
                <ul>
                  <li>{{$t('MyExperienceAlpateks_1')}} Bitrix24.</li>
                  <li>{{$t('MyExperienceAlpateks_2')}}</li>
                  <li>{{$t('MyExperienceAlpateks_3')}}</li>
                  <li>{{$t('MyExperienceAlpateks_4')}}</li>
                </ul>
              </div>
            </details>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script async lang="ts" src="./career.ts"></script>
<style scoped lang="less" src="./career.less"></style>
