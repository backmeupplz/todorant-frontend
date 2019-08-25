export const messages = {
  en: {
    title: 'Todorant',
    cookie: {
      button: 'Got it!',
      message:
        'This website uses cookies. We do not track you. But Facebook might.',
    },
    home: {
      info: 'The only todo manager you need',
      pitch:
        'Hello there! My name is Nikita and I believe I\'ve built the best todo manager based on the knowledge I gained after reading <a target="_blank" href="https://duckduckgo.com/?q=Willpower%3A+Rediscovering+the+Greatest+Human+Strength&atb=v179-1_k&ia=shopping">Willpower</a>, <a target="_blank" href="https://duckduckgo.com/?q=Getting+Things+Done%3A+The+Art+of+Stress-Free+Productivity&atb=v179-1_k&ia=shopping">Getting Things Done</a> and <a target="_blank" href="https://duckduckgo.com/?q=Eat+that+frog&atb=v179-1_k&ia=shopping">Eat That Frog</a> books. I\'ve understood the outlined ideas, simplified them, tested on my personal experience and implemented this simple software solution based on the ideas formulated below. Give it a try and your productivite will rise — or money back guaranteed.',
      ideas: {
        1: '🥰 Clean mind — your inbox is empty and you only ever work at one task at a time',
        2: "🐸 Eat your frogs first thing in the morning — it's the best time to work on unwanted tasks",
        3: '💃 Skip the current tasks — but only 3 times a week, 1 time a day',
        4: "🐸 Skip a task twice — and it's a frog",
        5: '☁ Task too high level? Break it down with one click',
        6: "👀 No lost todo's — you always attach a day or a month to a created todo",
        7: '1️⃣ First day of a month? Plan before you start working',
        8: '⏳ Task takes less then 2 minutes? Do it now and record',
      },
      action:
        'Ready to boost your productivity? 💪 Click a button bellow to start using Todorant!',
      facebook: 'Login with Facebook',
      google: 'Login with Google',
      privacy: 'Privacy policy',
    },
    support:
      'Something isn\'t clear? Contact me at <a href="mailto:n@borodutch.com">n@borodutch.com</a>',
    errors: {
      login: {
        facebook: 'Could not login with Facebook',
        google: 'Could not login with Google',
        telegram: 'Could not login with Telegram',
      },
      internal: 'Internal server error',
      loadTodos: 'Could not fetch todos',
      todo: {
        textLenght: 'Todos should have text',
        dateOrMonth: 'Todos should have either date or month set',
      },
      invalidForm: 'Please, fill in the required fields',
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
      },
      list: {
        completed: 'Show completed',
      },
      edit: {
        title: 'Edit',
      },
      planning:
        'Looks like you have some planning to do! Please, redistribute the outstanding tasks below to unlock the "Current" tab and to to keep being productive. Cheers!',
    },
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    deleteHeadline: 'Are you sure you want to delete "{name}"?',
    current: 'Current',
    planning: 'Planning',
    underDevelopment: 'This part is under development',
    created: 'Created',
    breakdownInfo:
      'Use breakdown when the current task is too broad. After you add all the subtasks, feel free to complete this task, you deserve it.',
    skipInfo:
      "Use skip when you don't want to work on the current task. Yo ucan skip once a day, up to three times a week. Frogs cannot be skipped. A task skipped twice becomes a frog.",
    clear: {
      congratulations: 'Congratulations!',
      text:
        '🥳You did it! All the tasks for today are done, go get rest or maybe dance a little 💃',
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
      rules: {
        0: 'As soon as you get an actionable task (receive an email, phonecall, text, or if you see anything of interest that has to be put on your todo list) — create a todo for it right away. <b>Do not wait</b>, you <b>will</b> forget about it if you do not take it down. You can use <a href="https://t.me/todorant_bot">@todorant_bot</a> on Telegram to create todos quicker.',
        1: 'Todos should <b>always</b> be actionable and as explicit as possible. If a task takes <b>less than 2 minutes</b>, then do it right away and record it as completed.',
        2: 'You either add a specific date or select a month while creating a todo. You cannot pick current month without selecting a specific date. This is done to relax your mind. If you trust the system and put everything that needs to be done on the correct date — you will encounter it at the right time. Huge amount of willpower is wasted on being constantly stressed about "that other thing that I need to deal with but I am not quite sure what it was". Learn to trust and relax.',
        3: 'First thing you do each month is planning ahead. You take all the tasks assigned to the current month and you sort them in the correct dates. It allows you to filter out outdated tasks and keep your mind in peace with, knowing exactly what you need to do this month.',
        4: 'First thing you do in the morning is planning your day. Have a glance at your <b>Planning</b> section. Can you handle everything? Distribute tasks that cannot be dealt with today. Redistribute any tasks left undone from the previous days.',
        5: 'Unless it is an emergency, <b>do not</b> look at the planning section after you have finished planning. It will be way better psychologically if you only focus on one task, so keep your eyes on the <b>Current</b> section. Trust the system, it remembers eveyrthing. Do your job and relax your mind.',
        6: '<b>Current</b> section contains only one task that you need to focus on — nothing else. You can have more than one task a day, the amount of tasks as well as progress bar is displayed for your convenience. You are not allowed to jump between tasks — you should deal with every task linearly, one by one.',
        7: 'Frogs are special types of tasks you generally do not want to deal with. Usually they are the tasks left behind for months and even years. Todorant ensures that you handle frogs first thing every day. In the morning your willpower reserve is large enough to handle even the most outrageous tasks. And after you finally deal with a frog — you receive just enough happiness to be smiling throughout the whole day. You feel proud of yourself when you deal with frogs.',
        8: 'You are allowed to skip current task — but only 1 time a day, 3 times a week. You cannot skip a frog. If you skip a task twice, it becomes a frog. If you failed to complete a task and had to redistribute it twice, it becomes a frog.',
        9: 'If the current task is too high level, then break it down to a list of subtasks. As soon as you break it down, mark the task as completed.',
        10: 'Add as much relevant information about the todo as possible. Add links to specific emails (gmail on web allows you to do this), websites, notes (like evernote), documents (like dropbox), leave phone numbers or add any information you might need to complete the task. Todorant is not meant to be a point of reference for you — instead it should act as a catalogue of links to the reference information relevant to specific todos.',
      },
    },
  },
  ru: {
    title: 'Todorant',
    cookie: {
      button: 'Понятненько!',
      message:
        'Этот вебсайт использует печеньки. Мы не следим за вами. Но Фейсбук, возможно, следит.',
    },
    home: {
      info: 'Единственный менеджер задач, который вам нужен',

      pitch:
        'Привет! Меня зовут Никита, и я, похоже, создал лучший менеджер задач на основе знаний, которые я почерпнул из книг <a htarget="_blank" ref="https://duckduckgo.com/?q=%D0%A1%D0%B8%D0%BB%D0%B0+%D0%B2%D0%BE%D0%BB%D0%B8.+%D0%92%D0%BE%D0%B7%D1%8C%D0%BC%D0%B8+%D1%81%D0%B2%D0%BE%D1%8E+%D0%B6%D0%B8%D0%B7%D0%BD%D1%8C+%D0%BF%D0%BE%D0%B4+%D0%BA%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D1%8C&atb=v179-1_k&ia=web">Willpower</a>, <a target="_blank" href="https://duckduckgo.com/?q=%D0%9A%D0%B0%D0%BA+%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%B2%D0%B0%D1%82%D1%8C+%D0%B4%D0%B5%D0%BB%D0%B0+%D0%B2+%D0%BF%D0%BE%D1%80%D1%8F%D0%B4%D0%BA%D0%B5.+%D0%9F%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF%D1%8B+%D0%BF%D0%BE%D0%BB%D0%BD%D0%BE%D1%86%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9+%D0%B6%D0%B8%D0%B7%D0%BD%D0%B8+%D0%B1%D0%B5%D0%B7+%D1%81%D1%82%D1%80%D0%B5%D1%81%D1%81%D0%B0&atb=v179-1_k&ia=web">Getting Things Done</a> и <a target="_blank" href="https://duckduckgo.com/?q=%D0%9E%D1%81%D1%82%D0%B0%D0%B2%D1%8C%D1%82%D0%B5+%D0%B1%D1%80%D0%B5%D0%B7%D0%B3%D0%BB%D0%B8%D0%B2%D0%BE%D1%81%D1%82%D1%8C%2C+%D1%81%D1%8A%D0%B5%D1%88%D1%8C%D1%82%D0%B5+%D0%BB%D1%8F%D0%B3%D1%83%D1%88%D0%BA%D1%83&atb=v179-1_k">Eat That Frog</a>. Я разобрался в представленных идеях, упростил их, попробовал на себе и разработал этот вебсайт, основываясь на постулатах ниже. Попробуйте, и ваша продуктивность взлетит до небес — ну или я просто верну вам деньги.',
      ideas: {
        1: '🥰 Чистая голова — список входящих пуст, а вы работаете только над одной задачей за раз',
        2: '🐸 Ешьте лягушек первым делом утром — это лучшее время для работы над неприятными задачами',
        3: '💃 Пропускайте текущую задачу — но только 3 раза в неделю, 1 раз в день',
        4: '🐸 Пропустите задачу дважды — и это лягушка',
        5: '☁ Слишком широкая задача? Разбейте ее на подзадачи одним кликом',
        6: '👀 Нет забытых задач — вы всегда добавляете день или месяц при создании задачи',
        7: '1️⃣ Первый день месяца? Планируйте перед началом работы',
        8: '⏳Задача занимает меньше 2 минут? Сделайте ее и запишите',
      },
      action:
        'Готовы взорвать свою продуктивность? 💪 Жмите кнопку ниже, чтобы начать пользоваться Todorant!',
      facebook: 'Войти через Фейсбук',
      google: 'Войти через Гугл',
      privacy: 'Политика конфиденциальности',
    },
    support:
      'Что-то непонятно? Пишите мне на <a href="mailto:n@borodutch.com">n@borodutch.com</a>',
    errors: {
      login: {
        facebook: 'Не получилось зайти через Фейсбук',
        google: 'Не получилось зайти через Гугл',
        telegram: 'Не получилось зайти через Телеграм',
      },
      internal: 'Внутренняя ошибка сервера',
      loadTodos: 'Не получилось загрузить задачи',
      todo: {
        textLenght: 'Задачи должны иметь текст',
        dateOrMonth: 'Задачам нужно выставлять либо точную дату, либо месяц',
      },
      invalidForm: 'Пожалуйста, заполните необходимые поля',
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
          'Задачи должны быть: указывающими на следующее действие ("Найти лучшие билеты в Мексику на аггрегаторе билетов", а не "Полететь в Мексику"); наиболее маленькими и понятными ("Протереть дисплей", а не "Прибраться дома").',
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
    breakdownInfo:
      'Используйте разбивку, если текущая задача слишком широкая. После добавления всех подзадач, отметьте текущую задачу, как выполненную, вы это заслужили.',
    skipInfo:
      'Используйте пропуск, когда не хотите заниматься текущей задачей. Пропускать можно максимум раз в день, максимум три раза в неделю. Лягушек пропускать нельзя. Задача, пропущенная дважды, становится лягушкой.',
    clear: {
      congratulations: 'Поздравляем!',
      text:
        '🥳Вы это сделали! Все задачи на сегодня выполнены, идите отдохните — ну или потанцуйте немного 💃',
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
      rules: {
        0: 'Как только у вас появляется задача (получаете имеил, звонок, сообщение или просто видите что-то интересное что нужно добавить в ваш список задач) — сразу же создавайте задачу. <b>Не ждите</b>, вы <b>забудете</b> про эту задачу, если ее не запишите. Пользуйтесь Телеграм ботом <a href="https://t.me/todorant_bot">@todorant_bot</a> для быстрого создания задач.',
        1: 'Задачи <b>всегда</b> должны быть призывом к действию и как можно более понятными. Если задача займет <b>меньше двух минут</b> — сделайте ее сразу и создайте в списке задач, как выполненную.',
        2: 'Во время создания задачи вы либо указываете точную дату, либо месяц. Вы не можете выбрать текущий месяц без определенной даты. Это сделано для того, чтобы расслабить вам мозг. Если вы доверяете системе и добавляете в нее все, что нужно, на правильные даты — то вы будете встречаться с задачами в правильное время. Огромное количество силы воли тратится зря на постоянный стресс в роде "той вещи, которую мне нужно сделать, но я точно не помню, что это за вещь". Научитесь доверять и расслабляться.',
        3: 'Первая вещь, которую вам нужно будет сделать в начале каждого месяца — это планирование. Вы берете все задачи на текущий месяц и расфасовываете их в нужные данные. Это позволяет вам отфильтровать задачи, которые более не актуальны и помогает вам оставаться в полном спокойствии, четко осознавая, что вам нужно будет делать в этом месяце.',
        4: 'Первым делом каждым утром вы будете планировать. Посмотрите на секцию <b>Планирование</b>. Вы сможете все это сделать? Раскидайте задачи, с которыми сегодня не справитесь, на другие дни. Раскидайте так же и задачи, которые остались незаконченными с предыдущих дней.',
        5: 'Кроме чрезвычайных случаев, <b>никогда</b> не смотрите на секцию планирования после окончания процесса планирования. Вам психологически будет гораздо проще, если вы будете сфокусированны только на одной задаче за раз, так что смотрите только на секцию <b>Текущее</b>. Доверяйте системе, она помнит все. Работайте и расслабляйте свой мозг.',
        6: 'В секции <b>Текущее</b> всегда есть максимум одна задача, на которой вы должны фокусироваться — больше ничего. У вас может быть больше одной задачи в день, количество задач и прогресс показан для вашего удобства. Вам нельзя прыгать между задачами — вы должны работать линейно, выполняя одну задачу за раз.',
        7: 'Лягушки — это особый тип задач, которые вы не хотите делать. Обычно, это задачи, которые вы не делаете месяцами и даже годами. Тудурант заставляет вас разбираться с лягушками первым делом каждый день. Утром ваши резервы силы воли достаточно большие, чтобы справиться даже с самыми неприятными задачами. А после победы над лягушкой вы получите достаточный заряд счастья, чтобы сиять улыбкой весь день. Вы будете собой гордиться, что наконец-то справляетесь с лягушками.',
        8: 'Вам разрешено пропускать текущую задачу — но только 1 раз в день, 3 раза в неделю. Пропустите задачу дважды, и она становится лягушкой. Если вы не смогли выполнить задачу и вам пришлось ее перераспределить дважды — она становится лягушкой.',
        9: 'Если текущая задача слишком высокоуровневая, то разбейте ее на список подзадач. Как только вы разбили задачу на подзадачи, завершите текущую задачу.',
        10: 'Добавляйте настолько много важной информации в задачи, насколько сможете. Добавляйте ссылки на имейлы (gmail позволяет это делать), вебсайты, заметки (как evernote), документы (например, dropbox), оставляйте телефонные номера или добавляйте любую информацию, которая может быть важной для решения задачи. Тудурант не должен быть главным хранилищем и каталогом ваших данных, но местом, где ссылки на необходимые для задач данные, хранятся сразу с определенными задачами.',
      },
    },
  },
}
