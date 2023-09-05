<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="page career">
    <div class="layout">
      <div class="card">
        <div class="about">
          <img class="andrew" alt="Andrew Ovsyannikov" src="@/assets/andrew2.png">
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
          <p class="text">🤩 {{$t('FrontendPrefer')}} TypeScript(Vue, React, Angular), HTML, CSS(Less, Bootstrap/Material).</p>
          <p class="text">🧑‍💻 {{$t('BackendPrefer')}} NodeJS(Nestjs), Python(FastApi, Django/DRF, Flask), ORM(SQLAlchemy, Prisma, TypeOrm, Sequelize), SQL(PostgreSQL, MongoDB), Nginx, Docker, MQTT(Redis, RabbitMQ, Kafka).</p>
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
              <td>Python, JS/TS, C#, Go</td>
            </tr>
            <tr>
              <th><strong>{{$t('Frameworks')}}</strong></th>
              <td>Node(Express, Nest, Prisma, TypeORM), Vue/Nuxt, React, Angular, Python(FastAPI, Django/DRF, Flask, SqlAlchemy)</td>
            </tr>
            <tr>
              <th><strong>DBMS/MQTT/ORM</strong></th>
              <td>PostgreSQL, MongoDB, MySQL, Redis, RabbitMQ, Kafka, DynamoDB, Prisma, SQLAlchemy, TypeORM, Sequalize</td>
            </tr>
            <tr>
              <th><strong>{{$t('Others')}}</strong></th>
              <td>Celery, Docker, Nginx, Git, Google Cloud Platform, AWS(Amplify, Lambda, S3, Cognito), WebRTC, SocketIO.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <article class="experience">
          <h1>🔬 {{$t('MyExperience')}}</h1>
          <!-- <div class="card">
            <h3>{{$t('July')}} 2020 - {{$t('ToDate')}}</h3>
            <p class="text">
              <strong>Full Stack Developer | {{$t('Freelance')}}</strong><br>
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
          </div> -->
          <div class="card">
            <h3>{{$t('August')}} 2018 - {{$t('October')}} 2020</h3>
            <p class="text">
              <strong>Full Stack Leed Developer | YLab Development</strong><br>
              🔗 <a href="https://ylab.io/">https://ylab.io/</a><br>
              ⚡ <em>{{$t('Skills')}}: Python(FastAPI,Django/DRF,Flask), SqlAlchemy, TensorFlow, AngularJS, Vuejs, Go, PostgreSql, Redis, Celery, Docker, Minio, S3, scrapy/selenium, Clickhouse, MSSql.</em><br>
            </p>
            <details class="description">
              <summary>🛠 {{$t('Description')}}</summary>
              <div class="description-body">
                <ol type="1">
                  <li><a href="https://ecn.broker/en/">ECN.Broker</a>
                    <ul>
                      <li><strong>{{$t('MarkedUpLayoutsOf')}}:</strong> {{$t('MyExperienceECNBroker_1')}}</li>
                      <li><strong>{{$t('Developed')}}:</strong> {{$t('MyExperienceECNBroker_2')}}</li>
                      <li><strong>{{$t('Added')}}:</strong> {{$t('MyExperienceECNBroker_3')}}</li>
                    </ul>
                  </li>
                  <li><a href="https://b2b-export.com/en/">B2B-export</a>
                    <ul>
                      <li><strong>{{$t('MarkedUpLayoutsOf')}}:</strong> {{$t('MyExperienceB2BExport_1')}}</li>
                      <li><strong>{{$t('Added')}}:</strong> {{$t('MyExperienceB2BExport_2')}}</li>
                    </ul>
                  </li>
                  <li><a href="https://carreta.ru/">Carreta</a>
                    <ul>
                      <li><strong>{{$t('Added')}}:</strong> {{$t('MyExperienceCarreta')}}</li>
                    </ul>
                  </li>
                  <li><strong>{{$t('InternalProjects')}}</strong>
                    <ul>
                      <li><strong>{{$t('Added')}}:</strong> {{$t('MyExperienceInternalProjects_1')}}</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </details>
          </div>
          <div class="card">
            <h3>{{$t('September')}} 2016 - {{$t('February')}} 2018</h3>
            <p class="text">
              <strong>Full Stack Developer | Aigeo</strong><br>
              🔗 <a href="http://aigeo.ru/">http://aigeo.ru/</a><br>
              ⚡ <em>{{$t('Skills')}}: Python(Django/SQLAlchemy), AngularJS, OpenLayers 3, PostgreSQL</em><br>
            </p>
            <details class="description">
              <summary>🛠 {{$t('Description')}}</summary>
              <div class="description-body">
                <ul>
                  <li><strong>{{$t('MyExperienceAigeo_1_1')}}: </strong>
                    <a href="http://references.aigeo.ru/">Aigeo References</a>, 
                    <a href="http://references-map.aigeo.ru/">Aigeo References Map</a>,
                    <a href="http://map.med-monitor.ru/">Medical Areas</a>(<a href="http://meduch2.aigeo.ru/">{{$t('MyExperienceAigeo_3_2')}}</a>),
                    <a href="http://api.aigeo.ru/pages/normalizer">Normalizer</a>
                  </li>
                  <li><strong>{{$t('MyExperienceAigeo_4_1')}}:</strong> <a href="http://map.med-monitor.ru/">Medical Areas</a> {{$t('MyExperienceAigeo_4_2')}} <a href="http://med-monitor.ru/">Med-monitor</a>(<a href="http://med-monitor.aigeo.ru">{{$t('MyExperienceAigeo_4_3')}}</a>).</li>
                  <li><strong>{{$t('MyExperienceAigeo_6_1')}}:</strong> <a href="https://github.com/capooti/geonode">Geonode API</a> {{$t('MyExperienceAigeo_6_2')}} <a href="https://git.aigeo.ru/aigeo/geonode">{{$t('MyExperienceAigeo_6_3')}}</a>.</li>
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
