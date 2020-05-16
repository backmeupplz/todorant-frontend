export const messages = {
  ru: {
    encryption: {
      title: 'Шифрование',
      info:
        'Используйте эту секцию с максимальной осторожностью! Шифрование не будет работать, если вы не введете пароль. Дальше будет два типа задач: зашифрованные и незашифрованные. Все новые задачи будут зашифрованными. Старые задачи можно будет зашифровать, нажав на кнопку ниже. Если вы потеряете пароль, восстановить задачи будет невозможно.',
      switch: 'Шифровать задачи',
      password: 'Пароль',
      encryptAllButton: 'Зашифровать все',
      decryptAllButton: 'Расшифровать все',
      confirm:
        'Уверены, что хотите шифровать все задачи паролем? Вы сможете расшифровать задачи этим же паролем. Если вы потеряете пароль, у вас не получится расшифровать задачи!',
      disableConfirm:
        'Уверены, что хотите убрать пароль и выключить шифрование? Это действие не расшифрует зашифрованные задачи.',
      errorDecrypting: 'Неправильный пароль расшифровки',
    },
    search: 'Поиск',
    qr: {
      code: 'QR код',
      description:
        'Используйте этот QR код, чтобы войти в вашу учетную запись на мобильных устройствах. Это изображение — пароль, никому его не передавайте!',
    },
    breakdown: {
      request:
        'Похоже, вы переносите эту задачу слишком часто. Пожалуйста, разбейте ее на более мелкие задачи, вы больше не можете ее переносить. Поверьте, это поможет вам завершить задачу!',
      button: 'Разбить',
    },
    warning: 'Внимание',
    hashtags: {
      title: 'Хештеги',
    },
    supportAlert: {
      title: 'Поддержка',
      text:
        'Если у вас есть какие-либо вопросы или предложения, <a href=mailto:todorant@borodutch.com">напишите мне имеил</a>, <a href="https://t.me/borodutch" target="_blank">в Телеграм</a> или <a href="https://t.me/todorant_feedback" target="_blank">присоединитесь к нашей групе сообщества в Телеграме</a>!',
    },
    loginMobile: {
      telegram: {
        headline:
          'Пожалуйста, зайдите через Телеграм, введя свой Телеграм ID в поле ниже и нажав "Войти". Вы можете узнать свой Телеграм ID, отправив <code>/id</code> в <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>. Или вы можете отправить команду <code>/qr</code> в <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a> и просканировать его в секции логина через QR код!',
        id: '123456789',
        idHint: 'Телеграм ID',
        loginButton: 'Войти',
        noCredentialsError: 'Пожалуйста, укажите Телеграм ID',
        cannotSendMessageError:
          'Не получилось отправить запрос на логин пользователю. Пожалуйста, убедитесь, что вы начали чат с @todorant_bot и что Телеграм ID правильный.',
        waiting:
          'Ожидаем ответа в <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>...',
        notAllowedError: 'Запрос на вход был отвергнут',
      },
      apple: {
        headline: 'Пожалуйста, зайдите через Эппл, нажав на кнопку ниже.',
      },
    },
    noReport: {
      title: 'Недостаточно данных',
      text: 'Давайте, выполните свою первую задачу и возвращайтесь сюда!',
    },
    report: {
      title: 'Отчет',
      tasksCompleted: 'Задач завершено',
      frogsCompleted: 'Лягушек завершено',
      share: 'Поделитесь отчетом с друзьями!',
      hashtag: 'Хештег',
      shareButton: 'Поделиться',
      url: 'Постоянная ссылка на этот отчет',
      shareMessage: 'Посмотрите на мой отчет продуктивности в Тудуранте!',
      call: 'Хотите присоединиться?',
      callButton: 'Присоединиться к Тудуранту',
      startDate: 'Дата начала',
      endDate: 'Дата конца',
    },
    title: 'Тудурант',
    cookie: {
      button: 'Понятненько!',
      message: 'Этот вебсайт использует печеньки.',
    },
    home: {
      texts: {
        level: [
          'Однажды, я был как вы',
          'Я часами старался завершить задачи, и ничего все равно не получалось. Новые задачи появлялись из ниоткуда, а старые продолжали наполнять собой бесконечные списки. Не было никакого выхода из ситуации — ни один из менеджеров задач не смог мне помочь, они лишь оказывали психологическое давление всеми вещами, про которые я забыл, и всеми задачами, которые я так и не закончил.',
          'В то время как сложные инструменты с множеством функций достаточно хорошо справляются с записью некоторых задач, когнитивная психология говорит, что перегрузка подсознания всеми подвешенными задачами, которые мы не записываем, может занимать большую часть мозга, ответственную за ощущение счастья.',
        ],
        winter: [
          'Зима близко',
          'Несмотря на то, что человечество сегодня счастливее, чем когда-либо, личная продуктивность ухудшается. Если мы ничего не изменим, мы можем оказаться в ситуации среди серой массы средних людей, которые ничего не знают о продуктивности и не могут закончить даже одну маломальски сложную и комплексную задачу — просто потому, что на них давит психологическая тревога.',
          'Количество людей, которые забывают про важные события с их супругами и партнерами, которые обещают сделать больше, чем на самом деле могут, которые постоянно думают о "той вещи, которую мне нужно проверить, но я точно не помню, что" — скоро зашкалит. Есть вероятность, что вы сами станете простой бездушной биологической машиной, которая сможет выполнять только простые низкооплачиваемые задачи, если вы не предпримите против этого действия.',
        ],
        contact: ['Остались вопросы? Напишите мне на ', '. Спасибо.'],
        solution: [
          'Но у вас есть решение',
          'После того, как я ознакомился с трудами по поведенческой психологии в роде "Оставьте Брезгливость, Съешьте Лягушку!", "Сила Воли", "Атомные Привычки" и "Как Привести Дела в Порядок", я разработал собственную систему, которая подняла мою продуктивность в 10 раз. Теперь я выполняю в 10 раз больше задач и довожу в 10 раз больше проектов до запуска. Я делюсь этим решением с вами, чтобы улучшить собственное окружение. Если люди вокруг меня развиваются — мой уровень счастья поднимается пропорционально.',
          'Тудурант — это самый простой список задач с единственным отличием. Каждое действие и каждая функция были аккуратно взвешены и протестированы с точки зрения когнитивной психологии. Я воспользовался десятилетиями исследований и упаковал их в один простой, но действенный инструмент. Тудурант обманывает ваш мозг, чтобы вы делали больше правильных — и меньше неправильных — действий. Он помогает развивать хорошие привычки и избавляться от вредных. Так что перестаньте бездумно записывать свои задачи. Пришло время начать использовать систему, которая работает.',
        ],
        consequences: {
          title: 'Последствия использования?',
          points: [
            'Папка "входящие" всегда пустая',
            'Неприятные задачи (лягушки) всегда выполняются',
            'Все проекты развиваются',
            'Ваш мозг сам хочет быть эффективным',
            'Вы ничего не забываете',
            'Люди восхищаются вашей продуктивностью',
          ],
        },
        deal: [
          'Какие условия?',
          'Тудурант дороже других менеджеров задач, да. Вообще, стандартная цена по индустрии — $3/месяц, когда у Тудуранта 30 дней бесплатного использования, а после цена в $5/месяц. Да, у Тудуранта меньше функций, чем у конкурентов — но это сделано специально.',
          'Когда другие просто предоставляют вам место, куда вы можете записать свои задачи и забыть про них, Тудурант дает вам силу идеологии и методологии — Тудурант заставляет вас завершать задачи, а не просто бездумно их записывать. Тудурант не для всех — он специально создан для людей, которые хотят освободить свою голову от постоянно надоедающих задач и которые хотят наконец уже начать завершать проекты. Вы можете ознакомиться с методологией, открыв ',
          'список правил',
          ' в правом верхнем углу этой страницы.',
        ],
        personal: [
          'Что бы сделал я?',
          'Я опробовал десятки разных менеджеров задач. Если бы я мог попробовать Тудурант до того, как я его разработал — то я бы точно дал ему шанс. Он бесплатен первые 30 дней — и этого времени как раз достаточно, чтоб понять, работает ли эта система для меня. И, тысяча чертей, если она работает и я завершаю все свои задачи — я бы заплатил любую цену, лишь бы продолжить этот поток продуктивности. Первые 30 дней от пользователей ничего не требуется — просто нужно зайти и начать пользоваться. Можете найти кнопки ниже. Хватит разглагольствовать — пришло время взрывать продуктивность!',
        ],
      },
      youAreRegistered: '(вы уже зарегистрированы)',
      headline: [
        'Не забывайте задачи.',
        'Всегда их выполняйте.',
        'Живите полной жизнью.',
        'С Тудурантом.',
      ],
      signIn: 'Войти',
      lastSignIn: '(хорошо, это последняя кнопка, войдите уже наконец)',
      facebook: 'Войти через Фейсбук',
      google: 'Войти через Гугл',
      privacy: 'Политика конфиденциальности',
      appstores: 'Скачайте приложение',
      feedback: {
        title: 'Что говорят пользователи?',
        reviews: [
          {
            name: 'Sergey Romanov',
            username: 'Gendoor',
            text:
              'Милые сообщения в разделе подписки Тудуранта :)\n\nБлагодарю за простой и стремящийся к идеальному сервис. Оказалось, что он помогает быть не только продуктивным, но и проактивным. Маленькие улучшения каждый день уверенно подтягивают за собой отстающие звенья, а свободный от задач разум постоянно ищет, чем бы заполнить опустевший список задач, чтобы снова и снова получать удовольствие от их выполнения и связанных с этим перемен — и это прямой путь к улучшению всего, что меня окружает.\n\nВ общем, Тудурант, каким бы простым он ни казался на первый взгляд, способен стать верным соратником в любых делах. Спасибо, Никита, что осознал аспекты истинной продуктивности и поделился ими с нами в удобном решении.\n\nБлагодарный подписчик Тудуранта.',
          },
          {
            name: 'Dinislam Sad',
            username: 'Azerzet',
            text:
              'Главные плюсы, которые лично мне да и уверен остальным также понравились.\n1. Простой и удобный интерфейс.\n2. Пропущенные задачи автоматически становятся лягушками, и также возможность изначально отметить задачу "лягушкой".\n3. Категория /done это просто необходимость, и спасибо за это, Никита. Я юзал Тудуист, Вундерлист, Мои Дела. Все эти программы перегруженные слишком.\n4. Телеграм бот.',
          },
          {
            name: 'Aleksei Kaut',
            username: 'aleksei_kaut',
            text:
              'После того как создал первые задачи и переключился на вкладку "Текущие" — офигел от того, что передо мной только одна задача и что надо завершить ее перед тем как идти дальше. Эта идея с одной задачей и концентрацией на ней меня поразила, вроде очевидно, но раньше так не мог.\n\nЯ обычно писал в Notes задачи и идеи, что нужно сделать в ближайшем времени, но не подходил к этому как к системе. Пользуюсь сервисом пару недель и не очень активно, но думаю это очень сильный подход к систематизации дел и задач.\n\nСпасибо за твою работу!',
          },
          {
            name: 'Anton',
            username: 'mas1311',
            text:
              'Протестировал тудурант. Сначала был скепсис (уж очень много перепробовал сервисов по планированию), но понял, что действительно эффективно работает и очень прост в использовании.\n\nПлюс, по неизвестной мне причине, когда выполняются все задачи на день появляется мощная гордость и удовлетворение, что отсутствовало в других планировщиках (там было что то в формате "ну вроде все.. или нет?").\n\nСпасибо за твои работы!',
          },
          {
            name: 'Willsey Paslen',
            username: 'WillseyPaslen',
            text:
              'Спасибо за отличный сервис. Прошло достаточно времени, чтобы точно можно было сказать — мне он помогает. Спасибо, Никита 😁 И удачи с приложением.',
          },
          {
            name: 'Игорь Малинкин',
            username: 'sxe4kilo',
            text:
              'с Тударантом я хоть что-то начал делать, так что моя производительность поднялась с 0.',
          },
          {
            name: 'Владимир Дубенко',
            username: 'dubenko_v',
            text:
              'Твой сервис потрясный в плане, как минимум, трех вещей:\n1. Удобен — вот реально ничего лишнего!\n2. Прививает привычку, как ты там писал в каком-то из постов, прям с языка снял в тот момент: мы — это набор привычек.\n3. Как ни странно, не заставляет рационально мыслить.\n\nЯ по своей натуре иррационален, я не могу просто вести 1 проект (я быстро выгораю). Я живу только многозадачностью! 3 проекта параллельно легко, но мало... 7 — вот это интересней. И твой сервис позволяет этого достигать. Именно чередование задач не дает возможности мозгу выгорать в одном конкретном направлении. А каким-то магическим образом чередует задачи с одного проекта на другой.',
          },
          {
            name: 'Maksim Alekseyevich',
            username: 'MMAradiology',
            text:
              'Сказать, что пользование Тудурантом изменило мою жизнь, я не могу. Сказать, что это значимое и очень полезное приложение/сайт? Да, хоть тысячу раз.\n\nМне Тудурант нравится, и он позволяет освободить свою "операционную память", позволить себе мыслить над решением проблемы, а не над её запоминанием. Как правильно написал Никита (создатель) — при постоянном и правильном использовании перестанут появляться задачи, которые раньше внушали поистине библейский страх. И это будет происходит не из-за того, что перестают поступать сложные задачи. Тебе (и мне, и всем) станет понятно — "дорогу осилит идущий", "путь в тысячу ли начинается с одного шага".',
          },
          {
            name: 'Kiku Reise',
            username: 'Kiku_Reise',
            text:
              'Я разгрузил свои задачи по работе, программированию и хобби. И даже этот отзыв написал благодаря фокусу от Тудуранта. Всего одна задача, никаких усложняющих приоритетов. В этом вся фишка сервиса — он помог мне сконцентрироваться, и не распыляясь поочередно выполнить таски.\n\nКонечно, можно проставить задачи и забить, но лично мне проще возвращаться к минималистичному приложению с одной задачкой, нежели пол дня искать в сохраненках Телеграма или Notion какую бы задачу сейчас выполнить из сотни запланированных.\n\nОсобенно порадовало обновление с хештегами — теперь вся статистика как на ладони, могу трекать и делиться с друзьями сколько задач по разработке я выполнил в этом месяце.\n\nБольшое спасибо за Тудурант!',
          },
        ],
      },
    },
    menu: {
      darkMode: {
        on: 'Темная тема: вкл',
        off: 'Темная тема: выкл',
      },
      merge: 'Объединить аккаунты',
      logout: 'Выйти',
    },
    support:
      'Что-то непонятно? Пишите мне на <a target="_blank" href="mailto:n@borodutch.com">n@borodutch.com</a>',
    errors: {
      login: {
        facebook: 'Не получилось зайти через Фейсбук',
        google: 'Не получилось зайти через Гугл',
        telegram: 'Не получилось зайти через Телеграм',
        apple: 'Не получилось зайти через Эпл',
      },
      internal: 'Внутренняя ошибка сервера',
      loadTodos: 'Не получилось загрузить задачи',
      todo: {
        textLenght: 'Задачи должны иметь текст',
        dateOrMonth: 'Задачам нужно выставлять либо точную дату, либо месяц',
      },
      invalidForm: 'Пожалуйста, заполните необходимые поля',
      report: 'Не получилось загрузить отчет',
      addTodoOld: 'Нельзя добавить задачу в прошлом',
      appleFirefox:
        'К сожалению, это <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1628361">баг</a> в Firefox. Пока его не поправят, пожалуйста, используйте другой браузер для логина через Эппл — а после объедините аккаунты с другими соцсетями в Тудуранте. Прошу прощения за неудобства.',
    },
    close: 'Закрыть',
    notFound: 'Страница не найдена',
    todo: {
      create: {
        title: 'Добавить задачи',
        text: 'Текст задачи',
        textHint: 'Сюда можно добавить ссылку на имеил или вебсайт',
        placeholder: 'Задача',
        frog: 'Это лягушка!',
        completed: 'Сделано',
        date: 'Точный день',
        month: 'Или месяц',
        tooltip:
          'Задачи должны быть: указывающими на следующее действие ("Найти лучшие билеты в Мексику на агрегаторе билетов", а не "Полететь в Мексику"); наиболее маленькими и понятными ("Протереть дисплей", а не "Прибраться дома").',
        goFirst: 'Добавить наверх',
        time: 'Точное время',
      },
      list: {
        completed: 'Показать завершенные',
      },
      edit: {
        title: 'Редактирование',
      },
      planning:
        'Похоже, вам нужно заняться планированием! Пожалуйста, перераспределите оставшиеся задачи ниже для того, чтобы разблокировать секцию "Текущее", и для того, чтобы оставаться продуктивными. Удачи!',
    },
    cancel: 'Отменить',
    save: 'Сохранить',
    delete: 'Удалить',
    deleteHeadline: 'Вы уверены, что хотите удалить "{name}"?',
    current: 'Текущее',
    planning: 'Планирование',
    underDevelopment: 'Раздел в разработке',
    created: 'Создано',
    breakdownInfo: 'Используйте разбивку, если текущая задача слишком широкая',
    skipInfo:
      'Используйте пропуск, когда не хотите заниматься текущей задачей. Пропускать можно максимум раз в день, максимум три раза в неделю. Лягушек пропускать нельзя. Задача, пропущенная дважды, становится лягушкой.',
    clear: {
      congratulations: 'Поздравляем!',
      text:
        '🥳 Вы это сделали! Все задачи на сегодня выполнены, идите отдохните — ну или потанцуйте немного 💃',
    },
    empty: {
      action: 'Вперед!',
      text:
        'На сегодня у вас нет задач. Хотите поработать — добавьте новые задачи на сегодня или заберите задачи с других дней.',
    },
    howto: {
      title: 'Как пользоваться Тудурантом?',
      premise:
        'Ниже описаны основные принципы, которых вы должны придерживаться, чтобы максимально продуктивно пользоваться всеми функциями Тудуранта. Это просто, как 1-2-3, просто на несколько шагов побольше.',
      rules: [
        'Как только у вас появляется задача (получаете имеил, звонок, сообщение или просто видите что-то интересное что нужно добавить в ваш список задач) — сразу же создавайте задачу. <b>Не ждите</b>, вы <b>забудете</b> про эту задачу, если ее не запишете. Пользуйтесь Телеграм ботом <a target="_blank" href="https://tlg.fyi/todorant_bot">@todorant_bot</a> для быстрого создания задач.',
        'Задачи <b>всегда</b> должны быть призывом к действию и как можно более понятными. Если задача займет <b>меньше двух минут</b> — сделайте ее сразу и создайте в списке задач, как выполненную.',
        'Во время создания задачи вы либо указываете точную дату, либо месяц. Вы не можете выбрать текущий месяц без определенной даты. Это сделано для того, чтобы расслабить вам мозг. Если вы доверяете системе и добавляете в нее все, что нужно, на правильные даты — то вы будете встречаться с задачами в правильное время. Огромное количество силы воли тратится зря на постоянный стресс вроде "той вещи, которую мне нужно сделать, но я точно не помню, что это за вещь". Научитесь доверять и расслабляться.',
        'Первая вещь, которую вам нужно будет сделать в начале каждого месяца — это планирование. Вы берете все задачи на текущий месяц и расфасовываете их в нужные даты. Это позволяет вам отфильтровать задачи, которые более не актуальны и помогает вам оставаться в полном спокойствии, четко осознавая, что вам нужно будет делать в этом месяце.',
        'Первым делом каждым утром вы будете планировать. Посмотрите на секцию <b>Планирование</b>. Вы сможете все это сделать? Раскидайте задачи, с которыми сегодня не справитесь, на другие дни. Раскидайте так же и задачи, которые остались незаконченными с предыдущих дней.',
        'Кроме чрезвычайных случаев, <b>никогда</b> не смотрите на секцию планирования после окончания процесса планирования. Вам психологически будет гораздо проще, если вы будете сфокусированны только на одной задаче за раз, так что смотрите только на секцию <b>Текущее</b>. Доверяйте системе, она помнит все. Работайте и расслабляйте свой мозг.',
        'В секции <b>Текущее</b> всегда есть максимум одна задача, на которой вы должны фокусироваться — больше ничего. У вас может быть больше одной задачи в день, количество задач и прогресс показан для вашего удобства. Вам нельзя прыгать между задачами — вы должны работать линейно, выполняя одну задачу за раз.',
        'Лягушки — это особый тип задач, которые вы не хотите делать. Обычно, это задачи, которые вы не делаете месяцами и даже годами. Тудурант заставляет вас разбираться с лягушками первым делом каждый день. Утром ваши резервы силы воли достаточно большие, чтобы справиться даже с самыми неприятными задачами. А после победы над лягушкой вы получите достаточный заряд счастья, чтобы сиять улыбкой весь день. Вы будете собой гордиться, что наконец-то справляетесь с лягушками.',
        'Вам разрешено пропускать текущую задачу — но делайте это как можно реже. Если вы не смогли выполнить задачу и вам пришлось ее перераспределить дважды — она становится лягушкой.',
        'Если текущая задача слишком высокоуровневая, то разбейте ее на список подзадач. Как только вы разбили задачу на подзадачи, она отмечается, как завершенная.',
        'Добавляйте настолько много важной информации в задачи, насколько сможете. Добавляйте ссылки на имейлы (gmail позволяет это делать), вебсайты, заметки (как evernote), документы (например, dropbox), оставляйте телефонные номера или добавляйте любую информацию, которая может быть важной для решения задачи. Тудурант не должен быть главным хранилищем и каталогом ваших данных, но местом, где ссылки на необходимые для задач данные, хранятся сразу с определенными задачами.',
        'Не стесняйтесь присоединяться к нашей <a target="_blank" href="https://tlg.fyi/todorant_feedback">группе</a> в Телеграме для обмена опытом о том, как становиться продуктивнее! Ваши отзывы о работе сервиса — предложения, пожелания и жалобы — крайне приветствуются.',
        'Пользуйтесь режимом редактирования (иконка смены порядка сверху) на странице <b>Планирования</b> для изменения порядка задач. Если вы хотите создать задачу на определенную неделю — просто добавьте ее на понедельник и перераспределите во время планирования утром понедельника.',
        'В Тудуранте нет и никогда не будет автоматически повторяющихся задач — единственное, в чем они помогают — это создание атмосферы страха, накапливаясь невыполненным грузом. Если нужно внести повторяющуюся задачу — внесите ее вручную, ваш мозг скажет вам спасибо за осмысленную задачу.',
        'В Тудуранте нет концепта "Проекты", так как он показал себя демотивирующим, некоторые папки просто никогда не открываются. Проекты "Фитнес" и "Саморазвитие" передают привет. Вместо этого, используйте #хештеги.',
        'Лягушки всегда находятся сверху в списке.',
        'В Тудуранте нет напоминаний о задачах с точным временем. Однако вы можете включить интеграцию с Гугл Календарем, чтобы вам надоедал нотификации Гугл, а не Тудурант.',
      ],
      bonus: {
        title: 'Бонусные функции',
        rules: [
          'Пользуйтесь шорткатами на клавиатуре на десктопе! Вы можете (a) — добавить, (b) — разбить, переключиться на (c) — текущее, пометить как (d) — выполненное и переключиться на (p) — планирование. Чтобы добавить дополнительную задачу, когда добавляете задачи, пользуйтесь Shift+A.',
        ],
      },
    },
    skipped: 'Пропущено',
    merge: {
      title: 'Объединить аккаунты',
      description:
        'Вы можете объединить разные аккаунты (например, Фейсбук, Гугл, Телеграм) здесь. Просто залогиньтесь в аккаунты, используя кнопки ниже и аккаунты будут объединены. Осторожно: это действие нельзя обратить, и списки задач будут также объединены. Возможно, если вы зашли из России без VPN, вы не видите кнопку Телеграма — тогда либо зайдите через VPN, либо обратитесь к <a target="_blank" href="https://tlg.fyi/todorant_bot">@todorant_bot</a> в Телеграме и залогиньтесь через него.',
      done:
        'Отлично! Вы теперь можете заходить в этот аккаунт через Гугл, Фейсбук и Телеграм. Кончились у нас кнопки для вас.',
      confirm: 'Уверены, что хотите добавить {id} в этот аккаунт?',
    },
    subscription: {
      title: 'Подписка',
      statusText: 'Статус подписки: {status}',
      earlyAdopter: 'Ранний адоптер 🦄',
      trial: 'Триал',
      active: 'Активная',
      inactive: 'Неактивная',
      earlyAdopterDescription:
        '👏👏 — это я хлопаю вам стоя; вы — безумцы, которые согласились попробовать инструмент повышения персональной продуктивности Тудурант одними из первых. Можно сказать, вы — золотая тысяча пользователей, на отзывах которых и создавался Тудурант. Вы имеете полное право пользоваться Тудурантом столько, сколько вам угодно — для этого аккаунта никогда не будет введено никаких ограничений, вы заслужили это. Однако если вы заметили, что Тудурант резко изменил вашу жизнь к лучшему — вы все еще можете приобрести подписку, тем самым сказав простое, но очень важное для меня лично: "Спасибо". Вы никогда не потеряете статус "Ранний адоптер 🦄" — а подписку сможете отменить в любой момент. Спасибо большое, что вы продолжаете пользоваться Тудурантом — а я продолжу добавлять приятные функции в этот инструмент, который делает каждого из нас лучше. Удачи!',
      earlyAdopterBonus:
        '🤗 Вот это да! Должно быть, либо Тудурант, либо я лично вам настолько помог, что, даже имея возможность пользоваться Тудурантом бесплатно, вы решили меня поддержать. Я поражен прямо в сердце и с удовольствием попью с вами кофе или просто поболтаю по душам. Пишите либо мне в телеграме (@borodutch), либо на почту — просто нажмите на мое имя ниже. Спасибо вам огромное! Сложно представить, насколько для меня важен ваш вклад!',
      trialDescription:
        '💪 Добро пожаловать в Тудурант! С момента регистрации у вас есть ровно 30 дней для того, чтобы опробовать систему и понять, подходит ли она вам. По истечении 30 дней вы все еще будете иметь доступ к существующим задачам, но не сможете добавлять новые. Если что, то никто не мешает вам оформить подписку до окончания триального периода в 30 дней. Я уверен, что вместе с Тудурантом вы сможете достичь новых высот в собственной продуктивности!',
      activeDescription:
        '🎉 Огромное спасибо за поддержку Тудуранта! Я лично надеюсь, что Тудурант достаточно изменил вашу жизнь и будет помогать ее улучшать изо дня в день в будущем! Ваша поддержка помогает мне заниматься Тудурантом на постоянной основе и добавлять новые функции, упрощающие работу и освобождающие вам время и когнитивные ресурсы. Спасибо вам еще раз!',
      inactiveDescription:
        '🐝 Похоже, ваш триал Тудуранта подошел к концу. Это тот самый неловкий момент, когда вам нужно сделать решение — настолько ли вам помог Тудурант, чтобы начать использовать его на постоянной основе; а мне нужно подтолкнуть вас в сторону правильного решения. Вершина моего счастья — это приносить пользу людям; а если Тудурант и вправду стал неотъемлемой частью вашей жизни, то я буду невероятно благодарен вам, если вы приобретете подписку. Всего $5/месяц — это цена бесконечной продуктивности и свободной головы. Каждый цент, который я получу с Тудуранта, я буду направлять на развитие этого сервиса. Поддержав Тудурант, вы лично поможете независимому разработчику ежедневно улучшать продукт, которым вы пользуетесь на постоянной основе. Заранее благодарю вас!',
      signature: 'Никита Колмогоров, создатель Тудуранта',
      daysLeft: '(осталось дней: {daysLeft})',
      '5dollars': '$5/месяц',
      '50dollars': '$50/год',
      success: 'Подписка приобретена успешно!',
      payment: {
        success:
          '✅ У вас получилось! Наслаждайтесь неограниченным Тудурантом 💪',
        failure: '✋ Ох! Что-то пошло не так. Может, попробуете еще раз? 😳',
        back: 'Вернуться к продуктивности!',
      },
      cancel: 'Отключить подписку',
      cancelConfirm: 'Вы уверены, что хотите отключить подписку?',
    },
    moveUp: 'Перенести на сегодня',
    settings: {
      title: 'Настройки',
      showTodayOnAddTodo:
        'Устанавливать сегодняшнюю дату автоматически при создании задачи',
      firstDayOfWeek: 'Первый день недели',
      newTodosGoFirst: 'Новые задачи добавляются в начало списка',
      preserveOrderByTime: 'Следить за порядком задач с точным временем',
      general: 'Общее',
      integrations: 'Интеграции',
      connected: 'Подключено',
      notConnected: 'Не подключено',
      googleCalendar: 'Google Calendar',
      disconnectConfirm: 'Уверены, что хотите отключить этот сервис?',
      account: 'Аккаунт',
    },
    weekdays: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
  },
  en: {
    encryption: {
      title: 'Encryption',
      info:
        'Use this section with the utmost caution! Encryption will not work unless you add a password. There will be two types of tasks: encrypted and unencrypted. All new tasks will be encrypted. Old todos can be converted to be encrypted with the button below. If you loose the password there will be no way to recover tasks.',
      switch: 'Encrypt todos',
      password: 'Password',
      encryptAllButton: 'Encrypt all',
      decryptAllButton: 'Decrypt all',
      confirm:
        'Are you sure you want to encrypt the todos with this password? You will be able to decrypt todos later with the same password. If you loose the password, you will not be able to decrypt todos!',
      disableConfirm:
        'Are you sure you want to remove the key and disable the encryption? This will not decrypt the tasks that are encrypted.',
      errorDecrypting: 'Wrong decryption password',
    },
    search: 'Search',
    qr: {
      code: 'QR code',
      description:
        'Use this QR code to login on mobile devices. This picture is a password, do not share it with anyone!',
    },
    breakdown: {
      request:
        'Looks like you move this task way too much. Please break it down, you can no longer move it to another date. Believe me, it will help to compele the task!',
      button: 'Breakdown',
    },
    warning: 'Warning',
    hashtags: {
      title: 'Hashtags',
    },
    supportAlert: {
      title: 'Support',
      text:
        'If you have any questions or suggestions, feel free to <a href=mailto:todorant@borodutch.com">send me an email</a>, <a href="https://t.me/borodutch" target="_blank">contact me on Telegram</a> or <a href="https://t.me/todorant_feedback" target="_blank">join our Telegram community group</a>!',
    },
    loginMobile: {
      telegram: {
        headline:
          'Please login with Telegram by entering your Telegram ID in a field below and hitting the "Login" button. You can get your Telegram ID by sending <code>/id</code> to the <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>. Or you can just send <code>/qr</code> to <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a> and scan it in the QR login section!',
        id: '123456789',
        idHint: 'Telegram ID',
        loginButton: 'Login',
        noCredentialsError: 'Please, provide a Telegram ID',
        cannotSendMessageError:
          'Could not send login request to the user. Please make sure that you started @todorant_bot and that the Telegram ID is correct.',
        waiting:
          'Waiting for the response in <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>...',
        notAllowedError: 'Login request was rejected',
      },
      apple: {
        headline: 'Please login with Apple by hitting the button below.',
      },
    },
    noReport: {
      title: 'No data yet',
      text: 'Go on, complete your first todo and come back!',
    },
    report: {
      title: 'Stats',
      tasksCompleted: 'Tasks completed',
      frogsCompleted: 'Frogs completed',
      share: 'Share this report!',
      hashtag: 'Hashtag',
      shareButton: 'Share',
      url: 'Permanent link to this report',
      shareMessage: 'Check out my productivity report from Todorant!',
      call: 'Want to join?',
      callButton: 'Join Todorant',
      startDate: 'Start date',
      endDate: 'End date',
    },
    title: 'Todorant',
    cookie: {
      button: 'Got it!',
      message: 'This website uses cookies.',
    },
    home: {
      texts: {
        level: [
          'I was once like you',
          'I spent hours and hours trying to get stuff done and it looked like nothing could help. New tasks kept coming and old ones kept piling up. There was no escape — none of the task managers worked, the only purpose they served was upsetting me with all these things I forgot and all the tasks I never finished.',
          "While complicated and sophisticated tools with plenty of features can be useful to keep track of some tasks, cognitive psychology tells us that overwhelming our subconsciousness with all the hanging tasks that weren't accounted for can use up a major chunk of our brain that should otherwise be in charge of providing the happiness feeling.",
        ],
        winter: [
          'The winter is coming',
          "Even though the world population is happier than ever, personal productivity has recently taken a hit. If we follow the same trend, we might find ourselves among the grey mass of generic humans who are no longer productive and cannot complete a single more or less difficult and complex task — simply because anxiety won't let us.",
          'The number of people, who forget about important events with their significant others, who promise to do more than they can handle, who keep thinking about "that thing that I should check but I\'m not sure what" instead of getting things done is going to be on a rise very soon. You can also find yourselves among the mindless biological machines that only perform simple low-paid tasks if you don\'t take action.',
        ],
        contact: [
          'Still got questions? Contact me directly at ',
          '. Thank you.',
        ],
        solution: [
          'But you have the solution',
          'After making myself familiar with the books about cognitive science like "Eat That Frog", "Willpower", "Atomic Habits" and "Getting Things Done", I developed a system that boosted my productivity by 10 times. I am now able to complete 10 times more tasks which leads to 10 times more projects launched with this simple system. I\'m sharing this solution with you in order to improve the environment I live in. If people around me thrive — my personal happiness increases as well.',
          'Todorant is a plain vanilla todo list with one single catch. Every action and feature was carefully weighted and tested using cognitive psychology. I have used the decades of studies and packed them into a single simple silver-bullet productivity tool. Todorant tricks your mind into doing more good actions and less bad actions. It builds positive habits and gets rid of bad behaviour. So stop mindlessly writing down your tasks. Start using the system that works.',
        ],
        consequences: {
          title: 'Consequences?',
          points: [
            'Your inbox will always be empty',
            'Unwanted tasks (frogs) will be dealt with',
            'No projects will stagnate',
            'Your brain will naturally crave effectiveness',
            'You will never forget anything',
            'People will start admiring your productivity',
          ],
        },
        deal: [
          "What's the deal?",
          "Todorant is more expensive than other todo solutions, yes. The industry standard is $3/month whereas Todorant has 30 days free trial (no credit card required) and then costs $5/month. Yes, Todorant has fewer features than it's competitors — but it is on purpose.",
          "When others sell you a place to park your todos indefinitely, Todorant sells the methodology and ideology — Todorant sells getting stuff done, not mindlessly writing it down. Todorant isn't for everybody — it is crafted specifically for people who want to free their minds from pressing issues and finally start completing the projects. You can familiarize yourself with the methodology by ",
          'opening the rulebook',
          ' on the top-right corner of this page.',
        ],
        personal: [
          'What would I do?',
          "I tried dozens of different todo list apps. If I had a chance to try Todorant before I implemented it — I would give it a try. It's free for the first 30 days — and it is just enough to try if the system works for me. And, damn, if it works and I get my stuff done — I'd pay whatever price to keep up the productivity streak. There are no strings attached — just log in and try Todorant today. You can find the buttons below. Enough talking — time to boost productivity levels!",
        ],
      },
      youAreRegistered: '(you are already registered)',
      headline: [
        'Never forget a task.',
        'Always get it done.',
        'Live a happy life.',
        'Powered by Todorant.',
      ],
      signIn: 'Sign in',
      lastSignIn: '(alright, this is the last button, sign in already)',
      facebook: 'Login with Facebook',
      google: 'Login with Google',
      privacy: 'Privacy policy',
      appstores: 'Download the app',
      feedback: {
        title: 'What do the users say?',
        reviews: [
          {
            name: 'Sergey Romanov',
            username: 'Gendoor',
            text:
              'Messages in the subscription part are cute :)\n\nThank you for a simple and thriving for the ideal service. Turned out that it not only helps to be productive but also proactive. Little daily improvements confidently enhance life, and the free mind is constantly looking how to fill now emptied todo list so that it could feel the pleasure of completing tasks again and again — and it is a direct route towards improving everything surrounding me.\n\nAll in all, Todorant, no matter how simple at first glance, can become a faithful ally in any business. Thank you, Nikita, for unleashing the aspects of true productivity and sharing them with us in a convenient solution.\n\nThankful Todorant subscriber.',
          },
          {
            name: 'Dinislam Sad',
            username: 'Azerzet',
            text:
              "The main advantages that I, and I'm sure others, liked.\n1. Simple and convenient interface.\n2. Missed tasks automatically become frogs, and an option to make a task a frog initially.\n3. /done command is a must, and thank you for it, Nikita. I used Todoist, Wunderlist, Bitrix24. All of them are overcomplicated.\n4. Telegram bot.",
          },
          {
            name: 'Aleksei Kaut',
            username: 'aleksei_kaut',
            text:
              'After I created the first tasks and switched to the "Current" tab - I was surprised that I had only one task and that I needed to complete it before moving on. This idea with one task and concentration on it struck me, it seems obvious, but I couldn\'t use it before.\n\nI usually tracked tasks and ideas in Notes, what should be done soon, but I did not approach it as a system. I have been using the service for a couple of weeks, not very actively, but I think this is a very strong way to systemize the affairs and tasks.\n\nThank you for your work!',
          },
          {
            name: 'Anton',
            username: 'mas1311',
            text:
              'Tested Todorant. At first, I was skeptic (I tried a lot of planning services already), but I realized that it works effectively and is very easy to use.\n\nPlus, for reasons unknown to me, when all the tasks are completed for the day, strong satisfaction appear, which was absent in other planners (there was something like "well, that was everything... or not?").\n\nThank you for your work!',
          },
          {
            name: 'Willsey Paslen',
            username: 'WillseyPaslen',
            text:
              'Thanks for the great service. Enough time has passed so that I can definitely say — it helps me. Thanks, Nikita 😁 And good luck with the app.',
          },
          {
            name: 'Igor Malinkin',
            username: 'sxe4kilo',
            text:
              'I started to do at least something with Todorant, so my productivity went up from 0.',
          },
          {
            name: 'Vladimir Dubenko',
            username: 'dubenko_v',
            text:
              "Your service is awesome in terms of at least three things:\n1. Convenient — it is minimalistic!\n2. It instills a habit.\n3. Strange as it may seem, it doesn't force you to think rationally.\n\nI'm irrational by nature, I can't just lead 1 project (I burn out quickly). My life is multitasking! 3 projects in parallel are easy, but 3 is not enough... 7 sounds more like it. And your service allows you to achieve this. It is the alternation of tasks that prevents the brain from burning out in one particular direction. And somehow, magically, it alternates tasks from one project to another.",
          },
          {
            name: 'Maksim Alekseyevich',
            username: 'MMAradiology',
            text:
              'I can\'t say that using Todorant changed my life. Can I say that this is a meaningful and very useful application/website? Yes, a thousand times yes.\n\nI like Todorant, it lets me free up my "operating memory" and allows me to think about solving problems, not about remembering them. As Nikita (the creator) correctly wrote — with constant and correct use, tasks that used to cast true biblical fear will stop appearing. And this will not happen because the complex tasks will stop coming. It will become clear to you (and to me, and everyone) that "the road will be overpowered by those walking", "the way to the thousand miles begins with one step".',
          },
          {
            name: 'Kiku Reise',
            username: 'Kiku_Reise',
            text:
              "I've arranged my work, programming and hobby tasks. Even this review was written thanks to Todorant. Just one task, no complications. That's the whole point of the app — it helped me to concentrate without constantly shuffling my todos.\n\nOf course, you can set tasks and forget about them, but for me it's easier to go back to a minimalistic application with one task, rather than to spend half a day looking for what task to work on now out of a hundred planned in Telegram or Notion.\n\nI was especially pleased with the update with hashtags — now all stats are on the palm of my hand, I can track and share with friends how many tasks I have completed this month.\n\nThank you a lot for Todorant!",
          },
        ],
      },
    },
    menu: {
      darkMode: {
        on: 'Dark mode: on',
        off: 'Dark mode: off',
      },
      merge: 'Merge accounts',
      logout: 'Logout',
    },
    support:
      'Something isn\'t clear? Contact me at <a target="_blank" href="mailto:n@borodutch.com">n@borodutch.com</a>',
    errors: {
      login: {
        facebook: 'Could not login with Facebook',
        google: 'Could not login with Google',
        telegram: 'Could not login with Telegram',
        apple: 'Could not login with Apple',
      },
      internal: 'Internal server error',
      loadTodos: 'Could not fetch todos',
      todo: {
        textLenght: 'Todos should have text',
        dateOrMonth: 'Todos should have either date or month set',
      },
      invalidForm: 'Please, fill in the required fields',
      report: 'Could not load report',
      addTodoOld: 'Cannot add todo in the past',
      appleFirefox:
        'Unfortunately, there is <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1628361">a bug</a> with Apple signin on Firefox. Until it is resolved, please, use other web browsers to login with Apple — and then merge it with other social accounts on Todorant. Sorry for the inconvenience.',
    },
    close: 'Close',
    notFound: 'Page not found',
    todo: {
      create: {
        title: 'Add todos',
        text: 'Text of the todo',
        textHint: 'You can add a link to an email or a website',
        placeholder: 'Todo',
        frog: "It's a frog!",
        completed: 'Completed',
        date: 'Exact day',
        month: 'Or month',
        tooltip:
          'Tasks should always be: actionable ("Find best flights to Mexico" vs "Go to Mexico"); as small and exact as possible ("Dust the displays" vs "Clean the house").',
        goFirst: 'Add on the top',
        time: 'Exact time',
      },
      list: {
        completed: 'Show completed',
      },
      edit: {
        title: 'Edit',
      },
      planning:
        'Looks like you have some planning to do! Please, redistribute the outstanding tasks below to unlock the "Current" tab and to keep being productive. Cheers!',
    },
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    deleteHeadline: 'Are you sure you want to delete "{name}"?',
    current: 'Current',
    planning: 'Planning',
    underDevelopment: 'This part is under development',
    created: 'Created',
    breakdownInfo: 'Use breakdown when the current task is too broad',
    skipInfo:
      "Use skip when you don't want to work on the current task. You can skip once a day, up to three times a week. Frogs cannot be skipped. A task skipped twice becomes a frog.",
    clear: {
      congratulations: 'Congratulations!',
      text:
        '🥳 You did it! All the tasks for today are done, go get rest or maybe dance a little 💃',
    },
    empty: {
      action: 'To infinity!',
      text:
        "You don't have any todos for today. If you want to work — add a new todo for today or take the todos from future days.",
    },
    howto: {
      title: 'How to use Todorant?',
      premise:
        'Below are the main principles that you should follow to productively exploit all the features provided by Todorant. It is easy as 1-2-3, just with a few more steps.',
      rules: [
        'As soon as you get an actionable task (receive an email, phonecall, text, or if you see anything of interest that has to be put on your todo list) — create a todo for it right away. <b>Do not wait</b>, you <b>will</b> forget about it if you do not take it down. You can use <a target="_blank" href="https://tlg.fyi/todorant_bot">@todorant_bot</a> on Telegram to create todos quicker.',
        'Todos should <b>always</b> be actionable and as explicit as possible. If a task takes <b>less than 2 minutes</b>, then do it right away and record it as completed.',
        'You either add a specific date or select a month while creating a todo. You cannot pick current month without selecting a specific date. This is done to relax your mind. If you trust the system and put everything that needs to be done on the correct date — you will encounter it at the right time. Huge amount of willpower is wasted on being constantly stressed about "that other thing that I need to deal with but I am not quite sure what it was". Learn to trust and relax.',
        'First thing you do each month is planning ahead. You take all the tasks assigned to the current month and you sort them in the correct dates. It allows you to filter out outdated tasks and keep your mind in peace with, knowing exactly what you need to do this month.',
        'First thing you do in the morning is planning your day. Have a glance at your <b>Planning</b> section. Can you handle everything? Distribute tasks that cannot be dealt with today. Redistribute any tasks left undone from the previous days.',
        'Unless it is an emergency, <b>do not</b> look at the planning section after you have finished planning. It will be way better psychologically if you only focus on one task, so keep your eyes on the <b>Current</b> section. Trust the system, it remembers eveyrthing. Do your job and relax your mind.',
        '<b>Current</b> section contains only one task that you need to focus on — nothing else. You can have more than one task a day, the amount of tasks as well as progress bar is displayed for your convenience. You are not allowed to jump between tasks — you should deal with every task linearly, one by one.',
        'Frogs are special types of tasks you generally do not want to deal with. Usually they are the tasks left behind for months and even years. Todorant ensures that you handle frogs first thing every day. In the morning your willpower reserve is large enough to handle even the most outrageous tasks. And after you finally deal with a frog — you receive just enough happiness to be smiling throughout the whole day. You feel proud of yourself when you deal with frogs.',
        'You are allowed to skip current task — but try to do so as rarely as possible. You cannot skip a frog. If you failed to complete a task and had to redistribute it twice, it becomes a frog.',
        'If the current task is too high level, then break it down to a list of subtasks. As soon as you break it down, the task is marked as completed.',
        'Add as much relevant information about the todo as possible. Add links to specific emails (gmail on web allows you to do this), websites, notes (like evernote), documents (like dropbox), leave phone numbers or add any information you might need to complete the task. Todorant is not meant to be a point of reference for you — instead it should act as a catalogue of links to the reference information relevant to specific todos.',
        'Feel free to join our multi-language <a target="_blank" href="https://tlg.fyi/todorant_feedback">group</a> on Telegram to share experience and tricks on how to be more productive! Your feedback about the service — suggestions, wishes and complaints — are highly welcome.',
        'Use the edit mode (the list order icon on top) on the <b>Planning</b> page to change the task order. If you want to assign a task to a specific week, just assign it to Monday and reassign it during the planning phase on Monday morning.',
        'Todorant does not have and will never have repeating tasks — the only thing they do well causing anxiety by hanging over you as unfinished tasks. If you need to complete repeating tasks — add all of them manually, your brain will thank you for conscious tasks.',
        'Todorant does not have the concept of "Projects" as it has proven itself to be demotivating, some of the "folder" never get open. Projects "Fitness" and "Self-improvement" send their regards. Instead, use #hashtags.',
        'Frogs will always appear on the top of the list.',
        'Todorant does not have notifications about the upcoming tasks with the exact time set. However, feel free to use Google Calendar integration so that Google can annoy you with notifications, not Todorant.',
      ],
      bonus: {
        title: 'Bonus features',
        rules: [
          'User keyboard shortcuts when on desktop! You can (a)dd, (b)reakdown, switch to (c)urrent, mark as (d)one and switch to (p)lanning. To add an additional task slot while adding tasks, you can use Shift+A.',
        ],
      },
    },
    skipped: 'Skipped',
    merge: {
      title: 'Merge accounts',
      description:
        'You can merge multiple accounts (e.g. Facebook, Google, Telegram) here. Just login to the accounts with the buttons below and the accounts will be merged. Careful: it cannot be undonde and your account will receive all the todos from both accounts.',
      done:
        'All done! You can login though Google, Facebook and Telegram to this account. No more buttons left for you.',
      confirm: 'Are you sure you want to merge {id} into this account?',
    },
    subscription: {
      title: 'Subscription',
      statusText: 'Subscription status: {status}',
      earlyAdopter: 'Early adopter 🦄',
      trial: 'Trial',
      active: 'Active',
      inactive: 'Inactive',
      earlyAdopterDescription:
        '👏👏 — this is me applauding you; you — the crazy ones who agreed to try out the instrument of ever increasing productivity, Todorant, among the first. One can say that you are the golden thousand, feedback of whom was shaping the Todorant from the very beginning. You have all the rights to use Todorant as much as you wish — you will never experience any limits, you have earned it. However, if you noticed that Todorant has drastically improved your life — you can still buy the subscription thus saying the best kind of "Thank you". You will never loose the "Early adopter 🦄" status — but will always be able to cancel the subscription. Thank you a lot for still using Todorant — and I will keep adding new features improving the product that positively affects all of us. Good luck!',
      earlyAdopterBonus:
        '🤗 Holy &*%$! Looks like either Todorant or I personally helped you enough that you purchased subscription even though you could use Todorant for free forever. I am deeply touched and happy to have a cup of coffee with you or just to chat a little. Feel free to reach me on Telegram (@borodutch) or by email — just click my name below. Thank you a lot! It is hard to imagine how important your contribution is!',
      trialDescription:
        '💪 Welcome to Todorant! You have 30 days after the registration to figure out whether Todorant works well for you. After 30 days will pass, you will still have access to the old tasks but will not be able to add new ones. It is perfectly fine to purchase subscription before 30 days end. I believe that using Todorant will bring you new heights in the personal productivity!',
      activeDescription:
        '🎉 Thank you a lot for supporting Todorant! I personally hope that Todorant has improved your life already and will keep making it better in future! You support allows me to work on Todorant daily and to add new features simplifying the work and freeing your time and your cognitive resources. Thank you a lot, again!',
      inactiveDescription:
        '🐝 It looks like your Todorant trial has come to the end. This is the awkward moment when you have to decide — whether Todorant has improved your life enough to spend money on it — and I have to navigate you towards the right decision. I am at the peak of my happines when I am able to bring value to the people; and if Todorant was able to make your life better, I will be more than thankful if you buy the subscription. It is just $5/month for the unlimited productivity and free mind. Every cent I earn on Todorant will be spent on improving the service. By supporting Todorant — you allow me, independent developer, to keep improving the product that benefits us all from day to day. Thank you a lot in advance!',
      signature: 'Nikita Kolmogorov, Todorant creator',
      daysLeft: '(days left: {daysLeft})',
      '5dollars': '$5/month',
      '50dollars': '$50/year',
      success: 'You have successfuly subscribed!',
      payment: {
        success: '✅ You are all done! Enjoy unlimited Todorant experience 💪',
        failure: '✋ Wait, something went wrong. Maybe you could retry? 😳',
        back: 'Head back to productivity!',
      },
      cancel: 'Cancel subscription',
      cancelConfirm: 'Are you sure you want to cancel your subscription?',
    },
    moveUp: 'Move to today',
    settings: {
      title: 'Settings',
      showTodayOnAddTodo: 'Default to today when creating a todo',
      firstDayOfWeek: 'First day of the week',
      newTodosGoFirst: 'New todos are added on top of the list',
      preserveOrderByTime: 'Preserve exact time order',
      general: 'General',
      integrations: 'Integrations',
      connected: 'Connected',
      notConnected: 'Not connected',
      googleCalendar: 'Google Calendar',
      disconnectConfirm: 'Are you sure you want to disconnect this service?',
      account: 'Account',
    },
    weekdays: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  },
  ua: {
    encryption: {
      title: 'Шифрування',
      info:
        'Використовуйте цю секцію з максимальною обережністю! Шифрування не працюватиме, якщо ви не введете пароль. Далі буде два типи задач: зашифровані та незашифровані. Всі нові задачі будуть зашифрованими. Старі задачі можна буде зашифрувати, натиснувши на кнопку нижче. Якщо ви втратите пароль, відновити задачі буде неможливо.',
      switch: 'Шифрувати завдання',
      password: 'Пароль',
      encryptAllButton: 'Зашифрувати всі',
      decryptAllButton: 'Розшифрувати всі',
      confirm:
        'Впевнені, що хочете шифрувати всі задачі паролем? Ви зможете розшифрувати задачі цим же паролем. Якщо ви втратите пароль, у вас не вийде розшифрувати задачі!',
      disableConfirm:
        'Впевнені, що хочете прибрати пароль і вимкнути шифрування? Це дія не розшифрує зашифровані задачі.',
      errorDecrypting: 'Неправильний пароль розшифровки',
    },
    search: 'Пошук',
    qr: {
      code: 'QR код',
      description:
        'Використовуйте цей QR код, щоб увійти до вашого профілю на мобільних пристроях. Це зображення — пароль, нікому його не передавайте!',
    },
    breakdown: {
      request:
        'Схоже, ви занадто часто переміщуєте цю задачу. Будь ласка, розбийте її на дрібніші підзадачі, ви більше не можете переміщувати цю задачу на іншу дату. Повірте, це допоможе виконати завдання!',
      button: 'Розбити',
    },
    warning: 'Увага',
    hashtags: {
      title: 'Хештеги',
    },
    supportAlert: {
      title: 'Підтримка',
      text:
        'Якщо у вас є якісь питання або пропозиції, <a href=mailto:todorant@borodutch.com">напишіть мені на імейл</a>, <a href="https://t.me/borodutch" target="_blank">в Телеграм</a> або <a href="https://t.me/todorant_feedback" target="_blank">приєднуйтесь до нашої групи в Телеграмі</a>!',
    },
    loginMobile: {
      telegram: {
        headline:
          'Для входу через Telegram введіть свій Telegram ID та натисніть "Увійти". Ви можете дізнатись свій Telegram ID, написавши <code>/id</code> до <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>. Або можете відправити <code>/qr</code> до <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a> та відсканувати його в секції QR Вхід!',
        id: '123456789',
        idHint: 'Телеграм ID',
        loginButton: 'Увійти',
        noCredentialsError: 'Будь ласка, вкажіть Телеграм ID',
        cannotSendMessageError:
          'Не вийшло відправити запит на логін користувачу. Будь ласка, впевніться, що ви розпочали чат з @todorant_bot і що Телеграм ID правильний',
        waiting:
          'Чекаю відповіді від <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>...',
        notAllowedError: 'Запит на вхід було відхилено',
      },
      apple: {
        headline: 'Будь ласка, увійдіть через Apple, натиснувши кнопку нижче.',
      },
    },
    noReport: {
      title: 'Дані ще відсутні',
      text: 'Мерщій виконувати свою першу задачу і повертайтесь сюди!',
    },
    report: {
      title: 'Звіт',
      tasksCompleted: 'Задач завершено',
      frogsCompleted: 'Жаб завершено',
      share: 'Поділіться цим звітом!',
      hashtag: 'Хештег',
      shareButton: 'Поділитися',
      url: 'Постійне посилання на цей звіт',
      shareMessage: 'Перегляньте мій звіт продуктивності від Тудуранта!',
      call: 'Бажаєте приєднатись?',
      callButton: 'Приєднатися до Тудуранту',
      startDate: 'Дата початку',
      endDate: 'Дата закінчення',
    },
    title: 'Тудурант',
    cookie: {
      button: 'Зрозуміло!',
      message: 'Цей вебсайт використовує кукіз.',
    },
    home: {
      texts: {
        level: [
          'Колись я був такий як ви',
          'Я годинами намагався завершити завдання, але нічого все одно не виходило. Нові завдання з`являлися нізвідки, а старі продовжували наповнювати собою нескінченні списки. Не було ніякого виходу із ситуації — жоден з менеджерів завдань не зміг мені допомогти, вони лише чинили психологічний тиск усіма речами, про які я забув, та всіма завданнями, які я так і не закінчив.',
          'У той час як складні інструменти з безліччю функцій досить добре справляються із записом деяких задач, когнітивна психологія говорить, що перевантаження підсвідомості усіма підвішеними задачами, які ми не записуємо, може займати велику частину мозку, відповідальну за відчуття щастя.',
        ],
        winter: [
          'Зима близько',
          'Незважаючи на те, що людство сьогодні щасливіше, ніж будь-коли, особиста продуктивність погіршується. Якщо ми нічого не змінимо, ми можемо опинитися в ситуації серед сірої маси середніх людей, які нічого не знають про продуктивність і не можуть закінчити навіть одну заледве складну і комплексну задачу — лише через те, що на них тисне психологічна тривога.',
          'Кількість людей, які забувають про важливі події з їхніми дружинами і партнерами, які обіцяють зробити більше, ніж насправді можуть, які постійно думають про "ту рiч, яку мені потрібно перевірити, але я точно не пам\'ятаю, яку" - скоро зашкалить. Є ймовірність, що ви самі станете звичайною бездушною біологічною машиною, яка зможе виконувати тільки прості низькооплачувані завдання, якщо ви не почнете діяти.',
        ],
        contact: [
          'Залишились запитання? Напишіть мені за адресою ',
          '. Дякую.',
        ],
        solution: [
          'Але у вас є рішення',
          'Після того, як я ознайомився з працями поведінкової психології на кшталт "Залиште Гидливість, З\'їжте Жабу!", "Сила Волі", "Атомарні Звички" та "Як Привести Справи До Ладу", я розробив власну систему, яка підняла мою продуктивність в 10 разів. Тепер я виконую в 10 разів більше завдань і доводжу в 10 разів більше проектів до запуску. Я ділюся цим рішенням з Вами, щоб поліпшити власне оточення. Якщо люди навколо мене розвиваються — мій рівень щастя піднімається пропорційно.',
          'Тудурант — це найпростіший список задач з єдиною особливістю. Кожна дія і кожна функція були кропітливо зважені і протестовані з точки зору когнітивної психології. Я скористався десятиліттями досліджень та спакував їх в один простий, але дієвий інструмент. Тудурант вводить ваш мозок в оману, щоб ви робили більше правильних — і менше неправильних — дій. Він допомагає розвивати хороші звички і позбуватися шкідливих. Так що досить бездумно записувати свої завдання. Прийшов час почати використовувати систему, яка працює.',
        ],
        consequences: {
          title: 'Наслідки використання?',
          points: [
            'Папка "Вхідні" завжди буде порожня',
            'Неприємні задачі (жаби) завжди виконуються',
            'Всі проекти розвиваються',
            'Ваш мозок сам захоче бути ефективним',
            'Ви ніколи нічого не забудете',
            'Люди будуть у захваті від вашої продуктивності',
          ],
        },
        deal: [
          'Які умови?',
          'Тудурант дорожче інших менеджерів завдань, так. Взагалі, стандартна ціна в галузі — $3/місяць, коли у Тудуранта 30 днів безкоштовного використання, опісля ціна в $ 5/місяць. Так, у Тудуранта менше функцій, ніж у конкурентів — але це зроблено навмисно.',
          'Коли інші просто надають вам місце, куди ви можете занотувати свої задачі і забути про них, Тудурант дає вам силу ідеології і методології — Тудурант змушує вас завершувати завдання, а не просто бездумно їх занотовувати. Тудурант не для всіх — він спеціально створений для людей, які хочуть звільнити свою голову від задач, що постійно набридають, і які хочуть нарешті вже почати завершувати проекти. Ви можете ознайомитися з методологією, відкривши',
          'список правил',
          'в правому верхньому кутку цієї сторінки.',
        ],
        personal: [
          'Що б я зробив?',
          'Я випробував десятки різних менеджерів задач. Якби я міг спробувати Тудурант до того, як я його розробив — то я б точно дав йому шанс. Він безкоштовний перші 30 днів — і цього часу досить щоб зрозуміти, чи працює ця система для мене. І якщо, у біса, ця система працює і я завершую усі мої задачі — я б заплатив будь-яку ціну, аби продовжити цей потік продуктивності. Перші 30 днів від користувачів нічого не вимагається — лише потрібно увійти та почати користуватися. Можете знайти кнопки нижче. Досить базікати —  час розігнати продуктивність!',
        ],
      },
      youAreRegistered: '(вже є обліковий запис)',
      headline: [
        'Не забувайте задачі.',
        'Завжди їх виконуйте.',
        'Живіть щасливим життям.',
        'Завдяки Тудуранту.',
      ],
      signIn: 'Увійти',
      lastSignIn: '(добре, це остання кнопка, увійдіть нарешті)',
      facebook: 'Увійти через Facebook',
      google: 'Увійти через Google',
      privacy: 'Політика конфіденційності',
      appstores: 'Завантажити додаток',
      feedback: {
        title: 'Що кажуть користувачі?',
        reviews: [
          {
            name: 'Sergey Romanov',
            username: 'Gendoor',
            text:
              "Милі повідомлення у розділі підписки Тудуранту :) Дякую за простий сервіс, що прагне до ідеалу. Виявилося, що він допомагає бути не тільки продуктивним, але й проактивним. Маленькі покращення кожен день впевнено підтягують за собою відстаючі ланки, а вільний від задач розум постійно шукає, чим заповнити спорожнілий список задач, щоб знов і знов отримувати задоволення від їх виконання і пов'язаних з цим змін — і це прямий шлях до покращення всього, що мене оточує. Загалом, Тудурант, яким би простим він не здавався на перший погляд, здатен стати вірним соратником у будь-яких справах. Дякую, Микито, що усвідомив аспекти істинної продуктивності та поділився ними із нами у зручному рішенні. Вдячний підписник Тудуранту.",
          },
          {
            name: 'Dinislam Sad',
            username: 'Azerzet',
            text:
              'Головні плюси, які особисто мені, та і впевнений, іншим також сподобалися.\n1. Простий і зручний інтерфейс.\n2. Пропущені завдання автоматично стають жабами, а також можливість спочатку відмітити завдання "жабою".\n3. Категорія /done це просто необхідність, і дякую за це, Микито. Я юзав Тудуіст, Вундерліст, Мої Справи. Всі ці програми занадто перевантажені.\n4. Телеграм-бот.',
          },
          {
            name: 'Aleksei Kaut',
            username: 'aleksei_kaut',
            text:
              'Після того, як створив свої перші завдання і переключився на вкладку "Поточні" — офігів від того, що переді мною тільки одне завдання і що необхідно завершити його перед тим, як іти далі. Ця ідея з єдиним завданням і концентрацією на ньому мене вразила, здавалося б очевидно, але раніше так не міг.\n\nЯ зазвичай писав в Notes завдання та ідеї, що потрібно зробити найближчим часом, але не підходив до цього як до системи. Користуюся сервісом кілька тижнів і не дуже активно, але думаю, що це дуже сильний підхід до систематизації справ і завдань.\n\nДякую за твою роботу!',
          },
          {
            name: 'Anton',
            username: 'mas1311',
            text:
              'Протестував Тудурант. Спочатку був скепсів (дуже вже багато перепробував сервісів з планування), але зрозумів, що дійсно ефективно працює і дуже простий у використанні.\n\nПлюс, за невідомою мені причини, коли виконуються всі завдання на день і з\'являється потужна гордість і задоволення, що було відсутньо у інших сервісах планування (там було щось у форматі "ну здається все.. чи ні?").\n\nДякую за твої роботи!',
          },
          {
            name: 'Willsey Paslen',
            username: 'WillseyPaslen',
            text:
              'Дякую за чудовий сервіс. Пройшло достатньо часу, щоб можна було точно сказати — мені від допомагає. Дякую, Микито😁. І удачі з додатком.',
          },
          {
            name: 'Ігор Малінкін',
            username: 'sxe4kilo',
            text:
              'З Тудурантом я почав хоч щось робити, так що моя продуктивність піднялася з 0.',
          },
          {
            name: 'Володимир Дубенко',
            username: 'dubenko_v',
            text:
              'Твій сервіс приголомшливий у плані, як мінімум, трьох речей:\n1. Зручний — от взагалі нічого зайвого!\n2. Прищеплює звичку, як ти там писав у якомусь з постів, прям з язику зняв у той момент: ми — це набір звичок.\n3. Як не дивно, змушує раціонально мислити.\n\nЯ за своєю натурою ірраціональний, я не можу просто вести 1 проект (я швидко вигоряю). Я живу тільки багатозадачністю! 3 проекти паралельно — легко, але мало... 7 — ось це вже цікавіше. І твій сервіс дозволяє цього досягати. Саме чергування завдань не дозволяє мозку вигоряти у одному конкретному напрямку. А якимось магічним чином чергує завдання з одного проекту на інший.',
          },
          {
            name: 'Maksim Alekseyevich',
            username: 'MMAradiology',
            text:
              'Сказати, що використання Тудуранту змінило моє життя, я не можу. Сказати, що це дуже значимий і корисний додаток/сайт? Так, хоч тисячу разів.\n\nМені Тудурант подобається, і він дозволяє звільнити свою "операційну пам\'ять", дозволити собі мислити над вирішенням проблеми, а не над її запам\'ятовуванням. Як правильно писав Микита (творець) — при при постійному і правильному використанні перестануть з\'являтися завдання, які раніше вселяли воістину біблійський страх. І це буде відбуватися не через те, що перестають поступати складні завдання. Тобі (і мені, і всім) стане зрозуміло — "дорогу здолає той, хто йде", "шлях в тисячу лі починається одного кроку".',
          },
          {
            name: 'Kiku Reise',
            username: 'Kiku_Reise',
            text:
              'Я розвантажив свої завдання по роботі, програмування та хобі. Навіть цей відгук написав завдяки фокусу від Тудуранту. Всього одне завдання, та ніяких ускладнюючих пріоритетів. У цьому вся фішка сервісу — він допоміг мені сконцентруватися, та не розпорошуючись по черзі виконати таски.\n\nЗвичайно, можна проставити завдання й забити, але мені простіше повертатися до мінімалістичного додатка з однією задачею, ніж пів дня шукати в Телеграмi або Notion щоб виконакти одне завдання із сотні запланованих.\n\nОсобливо сподобалося оновлення з хештегами — тепер вся статистика як на долоні, можу трекать та ділитися з друзями скільки завдань з розробки я виконав у цьому місяці.\n\nЩиро дякую за Тудурант!',
          },
        ],
      },
    },
    menu: {
      darkMode: {
        on: 'Темна тема: увімк.',
        off: 'Темна тема: вимк.',
      },
      merge: "Об'єднати акаунти",
      logout: 'Вийти',
    },
    support:
      'Щось незрозуміло? Пишіть мені на <a target="_blank" href="mailto:n@borodutch.com">n@borodutch.com</a>',
    errors: {
      login: {
        facebook: 'Не вдалося зайти через Facebook',
        google: 'Не вдалося зайти через Google',
        telegram: 'Не вдалося зайти через Telegram',
        apple: 'Не вдалося зайти через Apple',
      },
      internal: 'Внутрішня помилка серверу',
      loadTodos: 'Не вдалося завантажити задачі',
      todo: {
        textLenght: 'Задачі повинні мати текст',
        dateOrMonth: 'Задачам необхідно виставляти або точний день, або місяць',
      },
      invalidForm: 'Будь ласка, заповніть необхідні поля',
      report: 'Не вдалося завантажити звіт',
      addTodoOld: 'Неможливо додати задачу у минулому',
      appleFirefox:
        'Нажаль, це помилка входу <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1628361">a bug</a> у Apple через браузер Firefox. Доки це не виправлять, будь ласка, використовуйте інший браузер для входу через Apple, а після цього об\'єднайте акаунт з іншими соціальними аккаунтами в Тудуранті. Вибачте за незручності.',
    },
    close: 'Закрити',
    notFound: 'Сторінку не знайдено',
    todo: {
      create: {
        title: 'Додати задачі',
        text: 'Текст задачі',
        textHint: 'Сюди можна додати посилання на email або вебсайт',
        placeholder: 'Задача',
        frog: 'Це жаба!',
        completed: 'Зроблено',
        date: 'Точний день',
        month: 'Або місяць',
        tooltip:
          'Задачі завжди мають бути: такими, які можна виконати ("Знайти найкращі квитки у Мексику на агрегаторі квитків", а не "Полетіти у Мексику"); щонайменшими і зрозумілими ("Протерти дісплей", а не "Прибратися вдома").',
        goFirst: 'Додати зверху',
        time: 'Точний час',
      },
      list: {
        completed: 'Показати завершені',
      },
      edit: {
        title: 'Редагування',
      },
      planning:
        'Схоже, вам треба зайнятись плануванням! Будь ласка, перерозподіліть невирішені задачі, щоб розблокувати розділ "Поточне" і для того, щоб залишатися продуктивними. Наснаги!',
    },
    cancel: 'Скасувати',
    save: 'Зберегти',
    delete: 'Видалити',
    deleteHeadline: 'Ви впевнені, що бажаєте видалити "{name}"?',
    current: 'Поточне',
    planning: 'Планування',
    underDevelopment: 'Розділ у розробці',
    created: 'Створено',
    breakdownInfo:
      "Використовуйте розбивку, якщо поточна задача занадто об'ємна",
    skipInfo:
      'Використовуйте пропуск, коли не бажаєте займатися поточною задачею. Пропускати можна максимум раз на день, максимум три рази на тиждень. Жаб пропускати не можна. Задача, пропущена двічі, стає жабою.',
    clear: {
      congratulations: 'Вітаємо!',
      text:
        '🥳 Ви це зробили! Усі задачі на сьогодні виконані, йдіть відпочиньте — ну або трохи потанцюйте 💃',
    },
    empty: {
      action: 'Уперед!',
      text:
        'На сьогодні у вас немає задач. Бажаєте попрацювати — додайте нові задачі на сьогодні або заберіть задачі з інших днів.',
    },
    howto: {
      title: 'Як користуватися Тудурантом?',
      premise:
        'Нижче описані основні принципи, яких ви повинні дотримуватися, щоб максимально продуктивно користуватися усіма функціями Тудуранту. Це просто, як 1-2-3, але на декілька кроків більше.',
      rules: [
        'Як тільки у вас з\'являється завдання (отримуєте email, дзвінок, повідомлення чи просто бачите щось цікаве, що необхідно додати до вашого списку завдань) — одразу ж створюйте завдання. <b>Не чекайте</b>, ви <b>забудете</b> про це завдання, якщо його не запишите. Користуйтеся Telegram-ботом <a target="_blank" href="https://tlg.fyi/todorant_bot">@todorant_bot</a> для швидкого створення завдань.',
        'Завдання <b>завжди</b> повинні бути закликом до дії і як можна зрозумілішим. Якщо завдання займає <b>менше двох хвилин</b> — зробіть його одразу ж і додайте до списку завдань, як виконане.',
        'Під час створення завдання ви вказуєте або точну дату, або місяць. Ви не можете обрати поточний місяць без визначеної дати. Це зроблено для того, щоб розслабити ваш мозок. Якщо ви довіряєте системі та додаєте до неї все, що необхідно, на правильні дати, то ви будете зустрічатися з завданнями у правильний час. Величезна кількість сили волі витрачається даремно на постійний стрес на кшталт "тієї речі, яку мені необхідно зробити, але я не пам\'ятаю точно, що це за річ". Навчіться довіряти і розслаблятися.',
        'Перша річ, яку вам необхідно буде зробити на початку кожного місяцю — це планування. Ви берете всі завдання на поточний місяць і розподіляєте їх на необхідні дати. Це дозволяє вам відфільтрувати завдання, які більше не є актуальними і допомагає залишитися вам у повному спокої, чітко розуміючи, що вам необхідно буде зробити у цьому місяці.',
        'Першою справою кожного ранку ви будете планувати. Подивіться на секцію <b>Планування</b>. Ви зможете все це виконати? Розкидайте завдання, з якими ви сьогодні не впораєтеся, на інші дні. Розкидайте також завдання, які залишилися невиконаними з попередніх днів.',
        "Окрім надзвичайних випадків, <b>ніколи</b> не дивіться на секцію планування після завершення процесу планування. Вам психологічно буде значно простіше, якщо ви будете сфокусовані тільки на одному завданні за раз, так що дивіться тільки на секцію <b>Поточне</b>. Довіряйте системі, вона пам'ятає все. Працюйте і розслабляйте свій мозок.",
        'У секції <b>Поточне</b> завжди є максимум одне завдання, на якому ви повинні сфокусуватися — більше нічого. У вас може бути більше одного завдання на день, кількість завдань та прогрес показано для вашої зручності. Вам не можна стрибати між завданнями — ви повинні працювати лінійно, виконуючи одне завдання за раз.',
        'Жаби — це особливий тип завдань, які ви не бажаєте робити. Зазвичай, це завдання, яких ви не робите місяцями чи навіть роками. Тудурант змушує вас розбиратися з жабами першою справою кождного дня. Зранку ваші резерви сили волі достатньо великі, щоб впоратися навіть з найнеприємнішими завданнями. А після перемоги над жабою ви отримаєте достаній заряд щастя, щоб сяяти посмішкою увесь день. Ви будете пишатися собою, що нарешті здатні впоратися з жабами.',
        'Вам дозволено пропускати поточне завдання — але робіть це якомога рідше. Якщо ви не впоралися з поточним завданням і вам довелося перерозподіляти його двічі — воно стає жабою.',
        'Якщо поточне завдання занадто високорівневе, то розбийте його на список підзавдань. Як тільки ви розбили завдання на підзавдання, закінчите поточне завдання.',
        'Додавайте настільки багато важливої інформації, наскільки можете. Додавайте посилання на email (Gmail дозволяє це зробити), вебсайти, нотатки (як Evernote), документи (наприклад, Dropbox), залишайте телефонні номери або додавайте будь-яку інформацію, яка може бути важливою для вирішення завдання. Тудурант не повинен бути головним сховищем ваших даних, але місцем, де посилання на необхідні для завдань дані, зберігаються одразу з визначеними завданнями.',
        'Не соромтеся приєднуватися до нашої <a target="_blank" href="https://tlg.fyi/todorant_feedback">групи</a> у Telegram для обміну досвідом про те, як ставати продуктивніше! Ваші відгуки про роботу сервісу, пропозиції і скарги вкрай вітаються.',
        'У Тудуранті не можна зберегти завдання на визначений час — так і повинно бути. Замість цього, використовуйте режим редагування (іконка зміни порядку зверху) на сторінці <b>Планування</b> для зміни порядку списку завдань. Якщо ви бажаєте створити завдання на визначений тиждень — просто додайте її на понеділок і перерозподілить під час планування ранком понеділка.',
        'У Тудуранті немає і ніколи не буде автоматично повторюваних завдань — єдине, у чому вони допомагають — це створення атмосфери страху, накопичуючись невиконаним вантажем. Якщо необхідно внести повторюване завдання — внесіть його вручну, ваш мозок подякує вам за осмислине завдання.',
        'У Тудуранті немає концепту "Проекти", так як він показав себе демотивуючим, деякі теки ніколи не відкриваються. Проекти "Фітнес" і "Саморозвиток" передають привіт. Замість цього використовуйте #хетшеги.',
        'Жаби завжди з’являються у верхній частині списку.',
        'У Тудуранте немає нагадувань про завдання з точним часом. Однак ви можете включити інтеграцію з Гугл Календарем, щоб вам набридав нотифікації Гугл, а не Тудурант.',
      ],
      bonus: {
        title: 'Бонусні функції',
        rules: [
          'Користуйтеся клавіатурними скороченнями на десктопі! Ви можете (a) — додати, (b) — розбити, перемкнутися на (c) — поточне, відмітити як (d) — виконане і переключитися на (p) — планування.',
        ],
      },
    },
    skipped: 'Пропущено',
    merge: {
      title: "Об'єднати акаунти",
      description:
        'Ви можете об\'єднати різні акаунти (наприклад, Facebook, Google, Telegam) тут. Просто залогиньтеся у акаунти, використовуйте кнопки нижче і акаунти буде об\'єднано. Обережно: це незворотня дія, і списки завдань також буде об\'єднано. Можливо, якщо ви зайшли з Росії без VPN, ви не бачите кнопку Telegram — тоді або зайдіть через VPN, або зверніться до <a target="_blank" href="https://tlg.fyi/todorant_bot">@todorant_bot</a> у Телеграмі й залогиньтеся через нього.',
      done:
        'Чудово! Тепер ви можете заходити у цей акаунт через Google, Facebook і Telegram. Закінчилися у нас кнопки для вас.',
      confirm: 'Впевнені, що бажаєте додати {id} у цей акаунт?',
    },
    subscription: {
      title: 'Підписка',
      statusText: 'Статус підписки: {status}',
      earlyAdopter: 'Ранній адоптер 🦄',
      trial: 'Тріал',
      active: 'Активна',
      inactive: 'Неактивна',
      earlyAdopterDescription:
        '👏👏 — це я хлопаю вам стоячи; ви — безумці, які зголосилися опробувати інструмент підвищення персональної продуктиності Тудурант одними з перших. Можна сказати, вы — золота тисяча користувачів, на відгуках яких і створювався Тудурант. Ви маєте повне право користуватися Тудурантом стільки, скільки вам завгодно — для цього акаунту ніколи не буде введено ніяких обмежень, ви на це заслужили. Однак, якщо ви помітили, що Тудурант різко змінив ваше життя на краще — ви все ще можете придбати підписку, тим самим сказав просте, але дуже важливе особисто для мене "Дякую". Ви ніколи не втратите статусу "Ранній адоптер 🦄" — а підписку зможете скасувати у будь-який момент. Велике дякую, що ви продовжуєте користуватися Тудурантом — я продовжу додавати приємні функції у цей інструмент, який робить кожного з нас краще. Удачі!',
      earlyAdopterBonus:
        "🤗 Ось це так! Напевно, або Тудурант, або особисто я вам настільки допоміг, що, навіть маючи можливість користуватися Тудурантом безкоштовно, ви вирішили мене підтримати. Я вражений прямо у серце і з задоволенням вип'ю з вами кави або просто поболтаю по душах. Пишіть мені або у Telegram (@borodutch), або на пошту — просто натисність на моє им'я нижче. Велике вам дякую! Важко уявити, наскільки для мене важливий ваш вклад!",
      trialDescription:
        '💪 Вітаю у Тудуранті! Від моменту реєстрації у вас є рівно 30 днів для того, щоб опробувати систему і зрозуміти, чи підходить вона вам. Через 30 днів ви все ще матимете доступ до існуючих завдань, але не зможете додавати нові. Якщо що, то ніхто не заважає вам оформити підписку до закінчення тріального періоду у 30 днів. Я впевнений, що разом з Тудурантом ви зможете досягнути нових висот у власній продуктивності!',
      activeDescription:
        '🎉 Велике вам дякую за підтримку Тудуранту! Я особисто сподіваюся, що Тудурант достатньо змінив ваше життя і буде допомагати його покращувати зо дня у день в майбутньому! Ваша підтримка допомагає мені займатися Тудурантом на постійній основі та додавати нові функції, які спрощують роботу і вивільняють вам час і когнітивні ресурси. Дякую вам ще раз!',
      inactiveDescription:
        "🐝 Схоже, ваш тріал Тудуранту підійшов до кінця. Це той самий незручний момент, коли вам потрібно прийняти рішення — чи достатньо допоміг вам Тудурант, щоб почати використовувати його на постійній основі; а мені потрібно підштовхнути вас до правильного рішення. Вершина мого щастя — це приносити користь людям; а якщо Тудурант дійсно став невід'ємною частиною вашого життя, то я буду неймовірно вам вдячний, якщо ви придбаєте підписку. Усього $5/місяць — ось ціна безкінечної продуктивності та вільної голови. Кожен цент, який я отримаю з Тудуранту, я буду направляти на розвиток цього сервісу. Підтримавши Тудурант, ви особисто допоможете незалежному розробнику щоденно покращувати продукт, яким ви користуєтеся на постійній основі. Заздалегідь дякую вам!",
      signature: 'Никита Колмогоров, творець Тудуранту',
      daysLeft: '(Залишилося днів: {daysLeft})',
      '5dollars': '$5/місяць',
      '50dollars': '$50/рік',
      success: 'Підписку придбано успішно!',
      payment: {
        success: '✅ Вам вдалося! Насолоджуйтеся необмеженим Тудурантом 💪',
        failure: '✋ Йой! Щось пішло не так. Може, спопробуєте ще раз? 😳',
        back: 'Повернутися до продуктивності!',
      },
      cancel: 'Скасувати підписку',
      cancelConfirm: 'Ви впевнені, що бажаєте скасувати підписку?',
    },
    moveUp: 'Перенести на сьогодні',
    settings: {
      title: 'Налаштування',
      showTodayOnAddTodo:
        'Встановлювати сьогоднішню дату автоматично при створенні завдань',
      firstDayOfWeek: 'Перший день тижня',
      newTodosGoFirst: 'Нові завдання додаються на початок списку',
      preserveOrderByTime: 'Зберегти точний порядок часу',
      general: 'Загальне',
      integrations: 'Iнтеграції',
      connected: "З'єднано",
      notConnected: "Не з'єднано",
      googleCalendar: 'Google Calendar',
      disconnectConfirm: 'Впевнені, що хочете відключити цей сервіс?',
      account: 'Обліковий запис',
    },
    weekdays: [
      'Неділя',
      'Понеділок',
      'Вівторок',
      'Середа',
      'Четвер',
      "П'ятниця",
      'Субота',
    ],
  },
  es: {
    breakdown: {
      request:
        'Parece que has pospuesto demasiado esta tarea. Por favor desglósala, ya no puedes posponerla a otra fecha. ¡Creéme, te ayudará a completarla!',
      button: 'Desglosar',
    },
    warning: 'Advertencia',
    hashtags: {
      title: 'Hashtags',
    },
    supportAlert: {
      title: 'Soporte',
      text:
        'Si tienes dudas o sugerencias, siéntete libre de <a href=mailto:todorant@borodutch.com">enviarme un email</a>, <a href="https://t.me/borodutch" target="_blank">contactarme en Telegram</a> o <a href="https://t.me/todorant_feedback" target="_blank">unirte a nuestra comunidad en Telegram</a>.',
    },
    loginMobile: {
      telegram: {
        headline:
          'Por favor inicia sesión con Telegram introduciendo tu ID de Telegram en el campo que se encuentra debajo y haciendo clic en el botón de "Iniciar sesión". Puedes obtener tu ID de Telegram enviando <code>/id</code> al bot <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>.',
        id: '123456789',
        idHint: 'ID de Telegram',
        loginButton: 'Iniciar sesión',
        noCredentialsError: 'Por favor, introduce una ID de Telegram',
        cannotSendMessageError:
          'No se pudo enviar la solicitud de inicio de sesión al usuario. Asegúrate de haber iniciado @todorant_bot y de que la ID de Telegram sea correcta.',
        waiting:
          'Esperando la respuesta en <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>...',
        notAllowedError: 'El inicio de sesión fue rechazado',
      },
      apple: {
        headline:
          'Por favor inicia sesión con Apple haciendo clic en el botón de debajo.',
      },
    },
    noReport: {
      title: 'Sin datos todavía',
      text: 'Vamos, ¡completa tu primer tarea y vuelve!',
    },
    report: {
      title: 'Estadísticas',
      tasksCompleted: 'Tareas completadas',
      frogsCompleted: 'Sapos completados',
      share: '¡Compartir este reporte!',
      hashtag: 'Hashtag',
      shareButton: 'Compartir',
      url: 'Enlace permanente a este reporte',
      shareMessage:
        '¡Echa un vistazo a mi reporte de productividad en Todorant!',
      call: '¿Deseas unirte?',
      callButton: 'Unirse a Todorant',
      startDate: 'Fecha de inicio',
      endDate: 'Fecha de finalización',
    },
    title: 'Todorant',
    cookie: {
      button: '¡Entendido!',
      message: 'Este sitio web utiliza cookies.',
    },
    home: {
      texts: {
        level: [
          'Alguna vez fui como tú',
          'Pasé horas y horas tratando de hacer las cosas y parecía que nada podría ayudar. Nuevas tareas seguían llegando y las viejas seguían acumulándose. No había escapatoria: ninguno de las apps administradoras de tareas funcionó, lo único que lograron fue molestarme con todas las cosas que olvidé y todas las tareas que nunca terminé.',
          'Si bien las herramientas complicadas y sofisticadas con muchas funciones pueden ser útiles para realizar un seguimiento de algunas tareas, la psicología cognitiva nos dice que abrumar nuestra subconsciencia con todas las tareas que no se completaron puede usar una gran parte de nuestro cerebro que de lo contrario podría estar a cargo de proporcionar el sentimiento de felicidad.',
        ],
        winter: [
          'El invierno está llegando',
          'A pesar de que la población mundial es más feliz que nunca, la productividad personal se ha visto afectada recientemente. Si seguimos la misma tendencia, podríamos encontrarnos entre la masa gris de humanos genéricos que ya no son productivos y no pueden completar una sola tarea más o menos difícil y compleja, simplemente porque la ansiedad no nos deja.',
          'El número de personas que se olvidan de los eventos importantes con sus seres queridos, que prometen hacer más de lo que pueden manejar, que siguen pensando en "lo que debería verificar pero no estoy seguro de qué" en lugar de hacer las cosas, va a estar en aumento muy pronto. También puedes encontrarte entre las máquinas biológicas inconscientes que sólo realizan tareas simples con salarios bajos si no tomas medidas.',
        ],
        contact: [
          '¿Sigues teniendo preguntas? Contáctame directamente en ',
          '. Gracias.',
        ],
        solution: [
          'Pero tú tienes la solución',
          'Después de familiarizarme con libros acerca de ciencia cognitiva como "Eat That Frog", "Willpower", "Atomic Habits" y "Getting Things Done", desarrollé un sistema que impulsó mi productividad 10 veces. Ahora soy capaz de completar 10 veces más tareas que llevan a 10 veces más proyectos lanzados con este simple sistema. Comparto esta solución contigo para mejorar el entorno en el que vivo. Si las personas a mi alrededor prosperan, mi felicidad personal también aumenta.',
          'Todorant es una simple lista de tareas con una sola captura. Cada acción y característica fue cuidadosamente ponderada y probada usando psicología cognitiva. He usado décadas de estudios y los he empaquetado en una única y simple herramienta de productividad. Todorant engaña a tu mente para que haga más acciones buenas y menos acciones malas. Desarrolla hábitos positivos y elimina hábitos negativos. Así que deja de escribir tus tareas sin pensar. Comienza a usar el sistema que funciona.',
        ],
        consequences: {
          title: '¿Consecuencias?',
          points: [
            'Tu bandeja de entrada siempre estará vacía',
            'Completarás las tareas fastidiosas (sapos)',
            'Ningún proyecto se estancará',
            'Tu cerebro anhelará la efectividad de manera natural',
            'Nunca olvidarás nada',
            'La gente comenzará a admirar tu productividad',
          ],
        },
        deal: [
          '¿Cuál es el trato?',
          'Todorant es más caro que otras soluciones de gestión de tareas, sí. El estándar de la industria es de $3/mes mientras que Todorant tiene 30 días de prueba gratis (no se requiere tarjeta de crrédito) y después cuesta $5/mes. Sí, Todorant tiene menos funcionalidades que sus competidores: es a propósito.',
          'Mientras otros te venden un lugar donde estacionar indefinidamente tus tareas, Todorant te ofrece la metodología y la ideología: Todorant ofrece conseguir hacer las cosas, no solo escribirlas inconscientemente. Todorant no es para todos: está diseñado específicamente para aquellas personas que quieren liberar su mente de las presiones y finalmente empezar a completar sus proyectos. Puedes familiarizarte con la metodologíaYou can familiarize yourself with the methodology ',
          'abriendo el libro de reglas',
          ' en la esquina superior derecha de esta página.',
        ],
        personal: [
          '¿Qué debería hacer?',
          'Probé docenas de apps para gestión de tareas diferentes. Si tuviera la oportunidad de probar Todorant antes de implementarlo, lo probaría. Es gratis durante los primeros 30 días, y es suficiente para probar si el sistema funciona para mí. Y, maldita sea, si funciona y logro hacer mis cosas, pagaría cualquier precio para mantener la racha de productividad. No hay condiciones, solo inicia sesión y prueba Todorant hoy. Puedes encontrar los botones a continuación. Basta de hablar: ¡es hora de aumentar los niveles de productividad!',
        ],
      },
      youAreRegistered: '(ya estás registrado)',
      headline: [
        'Nunca olvides una tarea.',
        'Siempre consigue completarla.',
        'Vive una vida feliz.',
        'Impulsado por Todorant.',
      ],
      signIn: 'Registrarse',
      lastSignIn: '(de acuerdo, este es el último botón, regístrate ya)',
      facebook: 'Registrarse con Facebook',
      google: 'Registrarse con Google',
      privacy: 'Política de privacidad',
      appstores: 'Descargar la app',
      feedback: {
        title: '¿Qué dicen los usuarios?',
        reviews: [
          {
            name: 'Sergey Romanov',
            username: 'Gendoor',
            text:
              'Los mensajes en la parte de la suscripción son lindos :)\n\nGracias por un servicio simple y próspero por el servicio ideal. Resultó que no sólo ayuda a ser productivo sino también proactivo. Pequeñas mejoras diarias mejoran la vida con confianza, y la mente libre está constantemente buscando cómo llenar la lista de tareas vacía para que pueda sentir el placer de completar tareas una y otra vez, y es una ruta directa hacia la mejora de todo lo que me rodea.\n\nCon todo, no importa cuán simple sea a primera vista Todorant, puede convertirse en un aliado fiel en cualquier negocio. Gracias, Nikita, por desatar los aspectos de la verdadera productividad y compartirlos con nosotros en una solución conveniente.\n\nUn agradecido suscriptor de Todorant.',
          },
          {
            name: 'Dinislam Sad',
            username: 'Azerzet',
            text:
              'Las principales ventajas que a mí (y estoy seguro que también a otros) me gustaron.\n1. Interfaz simple y conveniente.\n2. Las tareas pospuestas se vuelven sapos automáticamente y existe la opción de marcar una tarea como sapo desde el inicio.\n3. El comando /done era algo obligado, y gracias por ello, Nikita. Yo usé Todoist, Wunderlist, Bitrix24. Todos eran demasiado complicados.\n4. Bot de Telegram.',
          },
          {
            name: 'Aleksei Kaut',
            username: 'aleksei_kaut',
            text:
              'Después de que creé las primeras tareas y cambié a la pestaña "Actual" me sorprendí de que tenía solamente una tarea y de que necesitaba completarla antes de continuar. Esta idea de una sola tarea a la vez y plena concentración en ella me pareció sorprendente, parece obvio, pero no podía usarla antes.\n\nUsualmente rastreaba tareas e ideas en Notas, lo que debería hacerse pronto, pero no lo enfoqué como un sistema. He estado utilizando el servicio durante un par de semanas, no de manera muy activa, pero creo que esta es una forma muy sólida de sistematizar los asuntos y las tareas.\n\n¡Gracias por tu trabajo!',
          },
          {
            name: 'Anton',
            username: 'mas1311',
            text:
              'Probé Todorant. Al inicio estaba escéptico (ya he probado muchos servicios de planeación de tareas), pero me di cuenta de que trabaja muy efectivamente y de que es muy fácil de usar.\n\nAdemás, por razones desconocidas para mí, cuando todas las tareas del día están completadas aparece una fuerte satisfacción, la cual estaba ausente en otros planificadores (había una sensación como de "bueno, eso fue todo... ¿o no?").\n\n¡Gracias por tu trabajo!',
          },
          {
            name: 'Willsey Paslen',
            username: 'WillseyPaslen',
            text:
              'Gracias por el estupendo servicio. Suficiente tiempo ha pasado, así que ahora puedo decir definitivamente: me funciona. Gracias, Nikita 😁 y buena suerte con la app.',
          },
          {
            name: 'Igor Malinkin',
            username: 'sxe4kilo',
            text:
              'Comencé al fin a hacer algo con Todorant, así que mi productividad subió desde 0.',
          },
          {
            name: 'Vladimir Dubenko',
            username: 'dubenko_v',
            text:
              'Tu servicio es increíble en términos de al menos tres cosas:\n1. Conveniente:¡es minimalista!\n2. Inculca un hábito.\n3. Aunque parezca extraño, no te obliga a pensar racionalmente.\n\nSoy irracional por naturaleza, Simplemente no puedo dirigir un proyecto (me agoto rápidamente). ¡Mi vida es la multitarea! 3 proyectos al mismo tiempo son fáciles, pero 3 no es suficiente... 7 suena mucho mejor. Y tu servicio permite conseguir esto. Es la alternancia de tareas la que previene que el cerebro se fatigue en una dirección particular. Y, de alguna manera mágica, alterna tareas de un proyecto y otro.',
          },
          {
            name: 'Maksim Alekseyevich',
            username: 'MMAradiology',
            text:
              'No puedo decir que mi vida haya cambiado usando Todorant. ¿Puedo decir que esta es una aplicación/página web significativa y muy útil? Sí, mil veces sí.\n\nMe gusta Todorant, me permite liberar mi "memoria de operación" y me permite concentrarme en resolver problemas, no en recordarlos. Como dijo correctamente Nikita (el creador): con uso constante y correcto, las tareas que solían causar verdadero terror bíblico dejarán de aparecer. Y esto no sucederá porque las tareas complejas dejen de llegar. Será claro para ti (y para mí, y para todos) que "el camino será dominado por aquellos caminando", "el camino de las mil millas comienza con un paso".',
          },
          {
            name: 'Kiku Reise',
            username: 'Kiku_Reise',
            text:
              'He ordenado mis tareas del trabajo, de programación y de mis pasatiempos. Incluso esta opinión fue escrita gracias a Todorant. Solamente una tarea, sin complicaciones. Ese es todo el punto de la app: me ayudó a concentrarme sin tener que estar evadiendo mis tareas constantemente. \n\nPor supuesto, puedes definir tareas y olvidarte de ellas, pero para mí es más simple abrir de nuevo una aplicación minimalista con una sola tarea que gastar medio día buscando en qué tarea trabajar ahora de cientos planeadas en Telegram o Notion.\n\nEstuve especialmente complacido con la actualización que trajo los hashtags: ahora todas las estadísticas están en la palma de mi mano, puedo rastrear y compartir con mis amigos cuántas tareas he completado este mes.\n\n¡Muchas gracias por!',
          },
        ],
      },
    },
    menu: {
      darkMode: {
        on: 'Modo oscuro: encendido',
        off: 'Modo oscuro: apagado',
      },
      merge: 'Combinar cuentas',
      logout: 'Cerrar sesión',
    },
    support:
      '¿Algo no está claro? Contáctame en <a target="_blank" href="mailto:n@borodutch.com">n@borodutch.com</a>',
    errors: {
      login: {
        facebook: 'No se pudo iniciar sesión con Facebook',
        google: 'No se pudo iniciar sesión con Google',
        telegram: 'No se pudo iniciar sesión con Telegram',
        apple: 'No se pudo iniciar sesión con Apple',
      },
      internal: 'Error interno del servidor',
      loadTodos: 'No se pudo extraer las tareas',
      todo: {
        textLenght: 'Las tareas deberían tener texto',
        dateOrMonth:
          'Las tareas deben estar asignadas a una fecha o mes específico',
      },
      invalidForm: 'Por favor, completa los campos requeridos',
      report: 'No se pudo cargar el reporte',
      addTodoOld: 'No se puede agregar una tarea al pasado',
      appleFirefox:
        'Desafortunadamente hay <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1628361">un bug</a> con el inicio de sesión en Apple desde Firefox. Hasta que lo solucionen, por favor, usa otro navegador para iniciar sesión con Apple, y después une tu sesión con otras cuentas sociales en Todorant. Una disculpa por la inconveniencia.',
    },
    close: 'Cerrar',
    notFound: 'Página no encontrada',
    todo: {
      create: {
        title: 'Agregar tareas',
        text: 'Texto de la tarea',
        textHint: 'Puedes agregar un enlace a un email o a un sitio web',
        placeholder: 'Tarea',
        frog: '¡Es un sapo!',
        completed: 'Completada',
        date: 'Día exacto',
        month: 'O mes',
        tooltip:
          'Las tareas siempre deberían ser: accionables ("Encontrar los mejores vuelos a México" en vez de  "Ir a México"); tan pequeñas y tan exactas como sea posible ("Desempolvar el monitor" en vez de "Limpiar la casa").',
        goFirst: 'Agregar hasta arriba',
        time: 'Tiempo exacto',
      },
      list: {
        completed: 'Mostrar completadas',
      },
      edit: {
        title: 'Editar',
      },
      planning:
        '¡Parece que tienes un poco de planeación que hacer! Por favor, redistribuye las tareas de abajo para desbloquear la pestaña "Actual" y para seguir siendo productivo. ¡Ánimo!',
    },
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Borrar',
    deleteHeadline: '¿Estás seguro de que quieres borrar "{name}"?',
    current: 'Actual',
    planning: 'Planeación',
    underDevelopment: 'Esta sección está bajo desarrollo',
    created: 'Creada',
    breakdownInfo:
      'Usa el desglose cuando la tarea actual es demasiado amplia. Después de que agregues todas las subtareas, siéntete libre de completar esta tarea, te lo mereces.',
    skipInfo:
      'Usa posponer cuando no quieras trabajar en la tarea actual. Puedes posponer una vez al día, hasta tres veces en una semana. Los sapos no se pueden posponer. Una tarea pospuesta dos veces se convierte en un sapo.',
    clear: {
      congratulations: '¡Felicidades!',
      text:
        '🥳 ¡Lo hiciste! Todas las tareas de hoy están terminadas, ve a descansar o quizás a bailar un poco 💃',
    },
    empty: {
      action: '¡Al infinito!',
      text:
        'No tienes ninguna tarea para hoy. Si quieres trabajar, agrega una nueva tarea para hoy o adelanta las tareas planeadas para días futuros.',
    },
    howto: {
      title: '¿Cómo usar Todorant?',
      premise:
        'Debajo se encuentran los principios básicos que deberías seguir para explotar productivamente todas las características proporcionadas por Todorant. Es tan fácil como contar 1-2-3, solamente con unos pocos pasos más.',
      rules: [
        'Tan pronto como recibas una tarea accionable (recibir un email, llamada de teléfono, mensaje de texto, o si ves algo interesante que tenga que estar en tu lista de tareas), crea una tarea para ello en ese instante. <b>No esperes</b>, en caso contrario <b>te olvidarás</b> de ello. Puedes usar el bot <a target="_blank" href="https://tlg.fyi/todorant_bot">@todorant_bot</a> en Telegram para crear tareas rápidamente.',
        'Las tareas deberían <b>siempre</b> ser accionables y tan explícitas como sea posible. Si una tarea toma <b>menos de 2 minutos</b>, entonces hazla de inmediato y regístrala como completada.',
        'Cuando crees una tarea asígnale una fecha específica o un mes específico. No puedes elegir el mes actual sin elegir una fecha específica. Esto se hace así para relajar tu mente. Si confías en el sistema y pones todas tus tareas en la fecha correcta, te las encontrarás después en el momento adecuado. Una enorme cantidad de fuerza de voluntad se desperdicia en estar constantemente estresado acerca de "esa otra cosa que tenía que hacer, pero que no estoy seguro de qué era". Aprende a confiar y relajarte.',
        'Lo primero que debes hacer cada mes es planear por adelantado. Toma todas las tareas asignadas al mes actual y ordénalas en las fechas correctas. Esto te permite filtrar las tareas desactualizadas y mantener tu mente en paz, sabiendo exactamente lo que necesitas hacer este mes.',
        'Lo primero que debes hacer cada mañana es planificar tu día. Echa un vistazo a la sección de <b>Planificación</b>. ¿Puedes ocuparte de todo? Distribuye las tareas que no puedan ser completadas hoy. Redistribuye cualquier tarea que haya quedado pendiente de días pasados.',
        'A no ser que se trate de una emergencia, <b>no</b> mires la sección de planeación después de que hayas terminado de planificar. Es mucho mejor psicológicamente si te concentras únicamente en una tarea, así que mantén tus ojos en la sección <b>Actual</b>. Confía en el sistema, él recuerda todo. Haz tu trabajo y relaja tu mente.',
        'La sección <b>Actual</b> contiene solamente una tarea: en la que tienes que concentrarte, nada más. Puedes tener más de una tarea al día, la cantidad total de tareas y una barra de progreso se muestran para tu conveniencia. No tienes permitido brincar entre tareas: deberías ocuparte de cada tarea linealmente, una por una.',
        'Los sapos son un tipo especial de tareas: aquellas de las que no te quieres ocupar. Usualmente son las tareas que se posponen durante meses e incluso años. Todorant se asegura de que te ocupes de los sapos a primera hora del día. En las mañanas tu reserva de fuerza de voluntad es lo suficientemente grande para que te ocupes de incluso las tareas más fastidiosas. Y cuando finalmente te ocupaste de un sapo recibes justo la cantidad de felicidad necesaria para estar sonriendo durante todo el día. Te sientes orgulloso de ti mismo cuando te ocupas de los sapos.',
        'Tienes permitido posponer la tarea actual, pero trata de hacerlo lo más raramente posible. No puedes posponer un sapo. Si fallaste en completar una tarea y tuviste que posponerla en dos ocasiones, se convierte en un sapo.',
        'Si la tarea actual es demasiado complicada, entonces desglósala en una lista de subtareas. En cuanto la desgloses, la tarea será marcada como completada.',
        'Agrega toda la información relevante acerca de la tarea como sea posible. Agrega enlaces a emails específicos (Gmail en la web permite hacer esto), sitios web, notas (como Evernote), documentos (como Dropbox), anota números de teléfono o añade tanta información como necesites para completar la tarea. Todorant no está pensado para ser un punto de referencia para ti: debería actuar como un catalogo de enlaces a la información relevante para tareas específicas.',
        'Siéntete libre de unirte a nuestro <a target="_blank" href="https://tlg.fyi/todorant_feedback">grupo</a> multilingüe en Telegram para compartir experiencia y trucos sobre cómo ser más productivo. Tus comentarios sobre el servicio: sugerencias, deseos y quejas son muy bienvenidos.',
        'Usa el modo de edición (el ícono de orden de lista en la parte superior) en la página de <b>Planificación</b> para cambiar el orden de las tareas. Si deseas asignar una tarea a una semana específica, simplemente asígnala al lunes correspondiente y reasígnala durante la fase de planificación ese lunes por la mañana.',
        'Todorant no tiene y nunca tendrá la función de programar tareas repetitivas, lo único que hacen bien es causar ansiedad al colgarse de ti como tareas inacabadas. Si necesitas completar tareas repetitivas, agrégalas manualmente, tu cerebro te agradecerá el trabajo consciente.',
        'Todorant no tiene el concepto de "Proyectos", ya que ha demostrado ser desmotivador, algunas de las "carpetas" nunca se abren. Los proyectos "Hacer ejercicio" y "Superación personal" envían sus saludos. En su lugar, usa #hashtags.',
        'Las tareas pospuestas siempre aparecerán al final de la lista, los sapos siempre aparecerán en la parte superior de la lista. Puedes cambiar el orden entre los sapos, entre las tareas regulares o entre las pospuestas, pero nunca entre grupos.',
      ],
      bonus: {
        title: 'Características adicionales',
        rules: [
          '¡Usa atajos de teclado cuando estés en pc! Puedes agregar (a), desglosar (b), cambiar a la pestaña Actual (c), marcar como completada (d) y cambiar a la pestaña Planeación (p). Para agregar un espacio de tarea adicional mientras agregas tareas, puedes usar Shift + A.',
        ],
      },
    },
    skipped: 'Pospuesta',
    merge: {
      title: 'Combinar cuentas',
      description:
        'Puedes combinar múltiples cuentas (por ejemplo: Facebook, Google, Telegram) aquí. Simplemente inicia sesión en cada cuenta con los botones de debajo y se combinarán. Ten cuidado: esta acción no se puede deshacer y tu cuenta recibirá todas las tareas de ambas cuentas.',
      done:
        '¡Todo listo! Puedes iniciar sesión a través de Google, Facebook y Telegram en esta cuenta. No quedan más botones para ti.',
      confirm: '¿Estás seguro de que deseas combinar {id} con esta cuenta?',
    },
    subscription: {
      title: 'Suscripción',
      statusText: 'Estatus de la suscripción: {status}',
      earlyAdopter: 'Primer adoptante 🦄',
      trial: 'Prueba',
      active: 'Activa',
      inactive: 'Inactiva',
      earlyAdopterDescription:
        '👏👏 — este soy yo aplaudiéndoles; ustedes — los locos que aceptaron probar el instrumento de productividad cada vez mayor, Todorant, entre los primeros. Se puede decir que ustedes son el millar dorado, de quienes su retroalimentación ha estado formando Todorant desde el principio. Tienen todos los derechos para usar Todorant tanto como lo deseen: nunca experimentarán ningún límite, se lo han ganado. Sin embargo, si notaron que Todorant ha mejorado drásticamente su vida, aún pueden comprar la suscripción y decir el mejor tipo de "Gracias". Nunca perderán el estado  "Primer adoptante 🦄 ", pero siempre podrán cancelar la suscripción. Muchas gracias por seguir usando Todorant, seguiré agregando nuevas funciones para mejorar el producto que nos afecta positivamente a todos. ¡Buena suerte!',
      earlyAdopterBonus:
        '🤗 ¡Diablos! Parece que o Todorant o yo personalmente te hemos ayudado lo suficiente como para que hayas comprado la suscripción, aunque puedas usar Todorant de forma gratuita para siempre. Estoy profundamente conmovido y feliz de tomar una taza de café contigo o simplemente de conversar un poco. No dudes en comunicarte conmigo por Telegram (@borodutch) o por correo electrónico; simplemente haz clic en mi nombre a continuación. ¡Muchas gracias! ¡Es difícil imaginar cuán importante es tu contribución!',
      trialDescription:
        '💪 ¡Bienvenido a Todorant! Tienes 30 días después del registro para decidir si Todorant funciona bien para ti. Después de que pasen 30 días, aún tendrás acceso a las tareas anteriores, pero no podrás agregar otras nuevas. Está perfectamente bien comprar una suscripción antes de que finalicen los 30 días. ¡Creo que usar Todorant te traerá a nuevas alturas en la productividad personal!',
      activeDescription:
        '🎉 ¡Muchas gracias por apoyar Todorant! ¡Personalmente espero que Todorant haya mejorado tu vida y que la siga mejorando en el futuro! Tu apoyo me permite trabajar en Todorant diariamente y agregar nuevas funciones que simplifican el trabajo y liberan tu tiempo y tus recursos cognitivos. De nuevo, ¡muchas gracias!',
      inactiveDescription:
        '🐝 Parece que tu prueba de Todorant ha llegado al final. Este es el momento incómodo en el que tienes que decidir si Todorant ha mejorado tu vida lo suficiente como para invertir dinero en el sistema, y yo tengo que guiarte hacia la decisión correcta. Estoy en la cima de la felicidad cuando puedo aportar valor a la gente; y si Todorant pudo mejorar tu vida, estaré más que agradecido si compras la suscripción. La productividad ilimitada y la mente libre solo cuestan $5/mes. Cada centavo que gane en Todorant se gastará en mejorar el servicio. Al apoyar a Todorant usted me permite a mí, un desarrollador independiente, seguir mejorando el producto que nos beneficia a todos día a día. ¡Muchas gracias por adelantado!',
      signature: 'Nikita Kolmogorov, creador de Todorant',
      daysLeft: '(días restantes: {daysLeft})',
      '5dollars': '$5/mes',
      '50dollars': '$50/año',
      success: '¡Te has suscrito exitosamente!',
      payment: {
        success:
          '✅ ¡Eso es todo! Disfruta de la experiencia de Todorant ilimitada 💪',
        failure: '✋ Espera, algo salió mal. ¿Puedes reintentarlo? 😳',
        back: '¡De vuelta a la productividad!',
      },
      cancel: 'Cancelar suscripción',
      cancelConfirm: '¿Estás seguro de que quieres cancelar tu suscripción?',
    },
    moveUp: 'Mover al día de hoy',
    settings: {
      title: 'Ajustes',
      showTodayOnAddTodo: 'Establecer el día de hoy como predeterminado',
      firstDayOfWeek: 'Primer día de la semana',
      newTodosGoFirst:
        'Las tareas nuevas se agregan en la parte superior de la lista',
      preserveOrderByTime: 'Conservar el orden exacto por tiempo',
    },
    weekdays: [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ],
  },
}
