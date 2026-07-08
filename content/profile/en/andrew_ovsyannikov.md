::CvAboutCard
---
about: |
  I specialise in designing project architecture and building scalable, high-performance systems using TypeScript(Node.js, NestJS, Express), Python(FastAPI, Django), and modern front-end frameworks (Vue/Nuxt, React/Next, Angular).
  I'm also proficient in PostgreSQL, MongoDB, Docker, Nginx, Redis, RabbitMQ, and Kafka.
  I'm experienced in leading projects, machine learning integration, and performance optimization.
---
::

::CvExperienceCard
---
items:
  - label: '05/2025 to date – layer3.press – Full-stack Developer'
    content: |
      **Site:** [layer3.press](https://layer3.press)

      **Skills:** JS/TS(Bun, Elysia, Drizzle, React, Remix, Zustand), PostgreSQL, Docker, Kubernetes, AWS, Kafka, Redis, Nostr, LLMs(ChatGPT, Gemini).
      
      **Overview:**
        - Developed layer3.press, a multi-tenant blogging platform combining decentralized publishing via Nostr, subscription-based monetization, AI-powered content workflows, and automated publishing systems.
        - Designed and implemented core full-stack architecture, including backend APIs, frontend applications, authentication systems, event-driven services, background processing, and scheduled workflows.
        - Built scalable content aggregation, processing, and publishing pipelines supporting automated content creation and distribution.
    details: |
      **Nostr Ecosystem:**
        - Designed and implemented a Nostr-based blogging ecosystem using Nostr protocol specifications (NIPs) and an event-driven architecture for content publishing (notes and articles), communication (direct messages), social features (pins, profile search, comments, reactions), and monetization (article donations via zaps).
        - Built authentication systems supporting email OTP and Nostr-based authentication via secret keys or browser extensions.
        - Developed services for multi-relay event publishing, Nostr event indexing and caching, profile synchronization, and automated content publishing workflows.

      **Content Management & Creation:**
        - Developed a customizable MJML-based email template editor with dynamic content blocks, user metadata, and article data injection.
        - Built a Lexical-based editor with custom plugins for images, YouTube embeds, Nostr integration, and paywall functionality, including article preview support.
        - Implemented a Markdown-to-HTML conversion pipeline.
      
      **Subscriptions & Monetization:**
        - Implemented subscription and monetization features including Stripe Connect integration, paid blog subscriptions, paywalled content access, and configurable subscription plans.
        - Developed guided onboarding flows with gamification, enabling bloggers to configure monetization and publishing settings, featuring a "go-live" mechanism that prevents automated publishing workflows to Nostr until configuration is complete.
        - Added publisher membership management.

      **AI-powered Features:**
        - Developed AI-powered content processing and generation features, including:
          - article summarization;
          - content translation;
          - image generation;
          - generating new articles based on crawled publisher data;
          - summarizing and analyzing opposing opinions on the same topic.
        - Implemented real-time narrative generation for trending topics.
        - Developed AI-powered article re-ranking to surface the most relevant and interesting content.
        - Developed automated content processing pipelines for article creation, signing, and publishing using AWS KMS-based secret storage for secure key management.

      **Infrastructure and Integrations:**
        - Implemented RSS URL normalization for specific blogging platforms and developed crawling pipelines for automated content ingestion from RSS feeds and websites.
        - Built high-load background job processing with SSE notifications for long-running tasks and reactive UI updates.
        - Implemented X (Twitter) profile synchronization with Nostr blog.
        - Added hCaptcha-protected forms.
  - label: '09/2023 to 04/2025 – EURO ATLANTIC SMART TECHNOLOGY LTD (SP. Z O.O) – Tech Lead / ML Engineer / Full-stack Developer'
    content: |
      **Site:** [EURO ATLANTIC SMART TECHNOLOGY LTD](https://euro-atlantic.pl/)

      **Skills:** JS/TS (NestJS, Prisma), Python (FastAPI, PyTorch, NLTK), PostgreSQL, Docker, Kubernetes, RabbitMQ, Redis, Firebase, Azure (OpenAI, Storage, AI Speech, Custom Question Answering), AWS (S3, Transcribe, EC2), LLMs (Anthropic, ChatGPT, Gemini, Phi-3, Llama), LangChain, Langflow, ChromaDB.
      
      **Overview:**
        - Led development of AI-powered knowledge management and Q&A platforms integrating modern LLMs, cloud AI services, and RAG-based systems.
        - Designed and implemented full-stack architecture including scalable backend services, real-time communication, AI workflows, and data processing pipelines.
        - Improved AI response quality through RAG optimization, evaluation metrics, and advanced retrieval techniques.
    details: |
      **AI Q&A Platform:**
        - Developed an AI-powered Q&A chat system with REST API and SSE-based streaming responses using modern LLMs and cloud AI services.
        - Built knowledge base management workflows with document processing, OCR, audio transcription, and data preprocessing for RAG systems.
        - Integrated external knowledge sources and enterprise platforms including LMS Docebo, Google Drive, and AWS services.

      **RAG & AI Optimization:**
        - Optimized RAG system accuracy using parameter tuning with Optuna, re-ranking with Cohere, and evaluation using RAGAS metrics.
        - Led integration of LangChain and Langflow to improve AI workflow development and orchestration.
  - label: '11/2022 to 09/2023 – UDev – Full-stack Developer'
    content: |
      **Site:** [UDev](https://udev.dev/)

      **Skills:** JS/TS (NestJS, Prisma), Python (FastAPI, Django), Socket.IO, React, PostgreSQL, Docker, Kubernetes, Kafka, MongoDB, GCP.

      **Overview:**

        - Modernized existing backend systems by migrating legacy architectures, improving performance, and introducing scalable solutions.
        - Developed voice assistant and IoT integrations using NLP-based command processing and smart speaker APIs.
    details: |
      **Tumeke Platform:**
        - Migrated the [Tumeke](https://www.tumeke.io/) project from Python to NestJS and redesigned the architecture for improved performance and maintainability.
        - Developed an algorithm for calculating and visualizing Ergonomic Posture Risk Assessment.
        - Optimized raw SQL queries and improved API response times by 30x.

      **Smart Speaker Integration:**
        - Developed Yandex Alice skill with authentication APIs to play background music on smart speakers using NLP-based command processing.
  - label: '03/2022 to 11/2022 – Freelance (Upwork) – Full-stack Developer'
    content: |
      **Site:** [Upwork Profile](https://www.upwork.com/freelancers/~01e59297900f2b4845/)

      **Skills:** Node.js (Express), Python (Flask, Tornado), Vue, React, GraphQL, RabbitMQ, Docker, PostgreSQL.

      **Overview:**
      - Developed full-stack solutions for gamified assessment and video surveillance platforms with real-time processing requirements.
      - Designed scalable backend architectures, complex business logic, and configuration-driven frontend systems.
      - Implemented real-time features including communication, video streaming, and data processing pipelines.
    details: |
      **Gamified Assessment Platform [Cibirlan](https://cibirlan.com/):**
        - Developed a tournament scheduling system for a gamified assessment platform.
        - Implemented team creation algorithms with role assignment logic.
        - Built real-time chat functionality using Socket.IO.

      **Video Surveillance Platform:**
        - Developed an administration panel with customizable dashboards and widgets.
        - Implemented WebRTC-based video streaming pipelines for real-time surveillance processing, enabling integration of computer vision algorithms including object tracking, image enhancement, and stream analysis.
        - Designed a configuration-driven frontend architecture where UI components, layouts, and behavior were dynamically controlled through backend-provided configurations.
  - label: '07/2021 to 03/2022 – Altermeliora – Full-stack Developer'
    content: |
      **Site:** [Altermeliora](https://altermeliora.com/)

      **Skills:** TypeScript, Node.js (NestJS), React.js, Python (Django), PostgreSQL, Redis, MongoDB, Docker, GCP.

      **Overview:**
        - Developed a full-stack e-commerce and payment platform for selling digital courses and physical products.
        - Designed and implemented complex business workflows including product management, checkout processes, payments, invoicing, taxation, and sales analytics.
        - Integrated multiple external services for payments, delivery, email communication, and third-party course platforms.
    details: |
      **E-commerce & Payment Platform:**
        - Developed product management features including product forms and category hierarchy builders.
        - Implemented invoice generation workflows with payment configuration, discounts, promo codes, and seller tax calculation.
        - Built customizable checkout flows with automated registration on third-party services.
        - Developed sales reporting and analytics functionality.

      **External Integrations:**
        - Integrated delivery services including Shiptor and ChinaDivision.
        - Integrated payment providers including Bluesnap, Fondy, PayPal, YooMoney, and Stripe.
        - Implemented email delivery workflows using SendGrid.
        - Integrated external course-selling platforms.

      **Additional Features:**
        - Developed calorie calculation functionality.
        - Implemented cross-platform synchronization.
        - Built multilingual interfaces.
  - label: '10/2020 to 06/2021 – Freelance (Upwork) – Full-stack Developer'
    content: |
      **Site:** [Upwork Profile](https://www.upwork.com/freelancers/~01e59297900f2b4845)

      **Skills:** TypeScript, Node.js (NestJS), Angular, AWS (Amplify, Lambda, DynamoDB, Cognito), RabbitMQ, Docker.

      **Overview:**
        - Developed full-stack solutions for logistics, SaaS, and security-oriented platforms.
        - Designed scalable cloud architectures with AWS services, authentication systems, asynchronous processing, and flexible business workflows.
        - Built configurable applications with automation features, third-party integrations, and AI-powered processing components.
    details: |
      **Freight Transportation Platform:**
        - Developed an administration panel for an MVP freight transportation system.
        - Implemented Cognito-based authentication, geocoding, and data visualization using HERE Maps services.

      **White-label SaaS Platform [I-EXP](https://www.linkedin.com/company/viartech/about/):**
        - Designed and implemented scalable architecture for white-label licensing with request-based billing.
        - Developed a Telegram bot, neural network training data generation tools, image similarity vector search, and authentication workflows.

      **Website Security Analysis Platform:**
        - Developed a system for automated website security analysis and assessment.
  - label: '08/2018 to 10/2020 – YLab – Lead Full-stack Developer'
    content: |
      **Site:** [YLab](https://ylab.io/)

      **Skills:** Python (FastAPI, Django/DRF, Flask), SQLAlchemy, TensorFlow, TypeScript, AngularJS, Vue.js, Go, PostgreSQL, Redis, Celery, Docker, MinIO, S3, Scrapy, Selenium, ClickHouse, MS SQL.

      **Overview:**
        - Led development teams of up to 10 engineers while designing and implementing full-stack solutions across fintech, B2B, and internal products.
        - Collaborated directly with customers to translate business requirements into scalable technical solutions, planned development roadmaps, managed sprint execution, and coordinated feature delivery.
        - Mentored and onboarded new developers, enabling rapid project setup and efficient integration into complex codebases.
    details: |
      **[ECN.Broker (Esplanade MS, onfin.io)](https://onfin.io/):**
        - Led development of a fintech trading platform including an administration panel, user accounts, trader training pages, landing pages, email templates, authentication, and customer-facing interfaces.
        - Developed a MetaTrader 4 integration microservice, Telegram bot, referral program, and Forex calculation tools.
        - Integrated RBK.money, AccentPay, Interkassa, and SorexPay payment providers.
        - Integrated RAMM copy trading, Bpilot contract specifications, IndigoSoft services, Google Charts, Quill WYSIWYG editor, Claws&Horns, and SendGrid email delivery.

      **[B2B-export Platform](https://www.b2b-sn.com/):**
        - Developed administration panel, user account pages, email templates, category hierarchy management, and bulk product import.
        - Integrated ABBYY translation services for automated product localization.

      **[Carreta](https://carreta.ru/):**
        - Developed product price crawling and bulk price import functionality.

      **Internal Products:**
        - Developed internal tools including a CSV/XLS reporting aggregator, user testing platform, and OCR processing system.
  - label: '09/2016 to 02/2018 – Aigeo – Full-stack Developer'
    content: |
      **Site:** [Aigeo](https://aigeo.ru/)

      **Skills:** Python (Django, SQLAlchemy), TypeScript, AngularJS, OpenLayers 3, PostgreSQL, PostGIS.

      **Overview:**
        - Developed geospatial applications and mapping tools for the Yenisei GIS platform.
        - Designed full-stack GIS solutions combining interactive map interfaces with spatial data processing pipelines.
        - Built medical GIS features and geospatial data normalization tools to improve the accuracy and quality of spatial analysis.
    details: |
      **Yenisei GIS Platform:**
        - Developed geospatial applications and interactive mapping tools using OpenLayers 3.
        - Implemented backend services for processing and managing spatial data with Python, PostgreSQL, and PostGIS.
        - Developed [medical GIS functionality](https://med-monitor.ru/) for visualization and analysis of healthcare-related geospatial data.

      **Geospatial Data Processing:**
        - Implemented [Aigeo References](http://references.aigeo.ru), a comprehensive geospatial reference management system.
        - Developed [geospatial data normalization tools](https://api.aigeo.ru/pages/normalizer) for addresses, coordinates, and administrative locations to improve the accuracy of spatial matching and mapping algorithms.

---
::

