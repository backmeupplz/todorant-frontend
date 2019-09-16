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
        'Hello there! My name is Nikita and I believe I\'ve built the best todo manager based on the knowledge I gained after reading <a target="_blank" href="https://duckduckgo.com/?q=Willpower%3A+Rediscovering+the+Greatest+Human+Strength&atb=v179-1_k&ia=shopping">Willpower</a>, <a target="_blank" href="https://duckduckgo.com/?q=Getting+Things+Done%3A+The+Art+of+Stress-Free+Productivity&atb=v179-1_k&ia=shopping">Getting Things Done</a> and <a target="_blank" href="https://duckduckgo.com/?q=Eat+that+frog&atb=v179-1_k&ia=shopping">Eat That Frog</a> books. I\'ve understood the outlined ideas, simplified them, tested on my personal experience and implemented this simple software solution based on the ideas formulated below. Give it a try and your productivity will rise — or money back guaranteed.',
      ideas: {
        1: '🥰 Clean mind — your inbox is empty and you only ever work on one task at a time',
        2: "🐸 Eat your frogs first thing in the morning — it's the best time to work on unwanted tasks",
        3: '💃 Skip the current task when you need it',
        4: "🐸 Fail to complete a task twice — and it's a frog",
        5: '☁ Task too high level? Break it down with one click',
        6: "👀 No lost todo's — you always attach a day or a month to a created todo",
        7: '1️⃣ First day of a month? Plan before you start working',
        8: '⏳ Task takes less then 2 minutes? Do it now and record',
        9: '💰 Pricing is simple: first month for free and then $5/month for infinite productivity!',
      },
      action:
        'Ready to boost your productivity? 💪 Click a button bellow to start using Todorant!',
      facebook: 'Login with Facebook',
      google: 'Login with Google',
      privacy: 'Privacy policy',
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
      rules: {
        0: 'As soon as you get an actionable task (receive an email, phonecall, text, or if you see anything of interest that has to be put on your todo list) — create a todo for it right away. <b>Do not wait</b>, you <b>will</b> forget about it if you do not take it down. You can use <a target="_blank" href="https://t.me/todorant_bot">@todorant_bot</a> on Telegram to create todos quicker.',
        1: 'Todos should <b>always</b> be actionable and as explicit as possible. If a task takes <b>less than 2 minutes</b>, then do it right away and record it as completed.',
        2: 'You either add a specific date or select a month while creating a todo. You cannot pick current month without selecting a specific date. This is done to relax your mind. If you trust the system and put everything that needs to be done on the correct date — you will encounter it at the right time. Huge amount of willpower is wasted on being constantly stressed about "that other thing that I need to deal with but I am not quite sure what it was". Learn to trust and relax.',
        3: 'First thing you do each month is planning ahead. You take all the tasks assigned to the current month and you sort them in the correct dates. It allows you to filter out outdated tasks and keep your mind in peace with, knowing exactly what you need to do this month.',
        4: 'First thing you do in the morning is planning your day. Have a glance at your <b>Planning</b> section. Can you handle everything? Distribute tasks that cannot be dealt with today. Redistribute any tasks left undone from the previous days.',
        5: 'Unless it is an emergency, <b>do not</b> look at the planning section after you have finished planning. It will be way better psychologically if you only focus on one task, so keep your eyes on the <b>Current</b> section. Trust the system, it remembers eveyrthing. Do your job and relax your mind.',
        6: '<b>Current</b> section contains only one task that you need to focus on — nothing else. You can have more than one task a day, the amount of tasks as well as progress bar is displayed for your convenience. You are not allowed to jump between tasks — you should deal with every task linearly, one by one.',
        7: 'Frogs are special types of tasks you generally do not want to deal with. Usually they are the tasks left behind for months and even years. Todorant ensures that you handle frogs first thing every day. In the morning your willpower reserve is large enough to handle even the most outrageous tasks. And after you finally deal with a frog — you receive just enough happiness to be smiling throughout the whole day. You feel proud of yourself when you deal with frogs.',
        8: 'You are allowed to skip current task — but try to do so as rarely as possible. You cannot skip a frog. If you failed to complete a task and had to redistribute it twice, it becomes a frog.',
        9: 'If the current task is too high level, then break it down to a list of subtasks. As soon as you break it down, mark the task as completed.',
        10: 'Add as much relevant information about the todo as possible. Add links to specific emails (gmail on web allows you to do this), websites, notes (like evernote), documents (like dropbox), leave phone numbers or add any information you might need to complete the task. Todorant is not meant to be a point of reference for you — instead it should act as a catalogue of links to the reference information relevant to specific todos.',
        11: 'Feel free to join our multi-language <a target="_blank" href="https://t.me/todorant_feedback">group</a> on Telegram to share experience and tricks on how to be more productive! Your feedback about the service — suggestions, wishes and complaints — are highly welcome.',
        12: 'Todorant does not have an option to assign specific time to a task — it is on purpose. Use the edit mode (a pencil icon on top) on the <b>Planning</b> page to change the task order instead. If you want to assign a task to a specific week, just assign it to Monday and reassign it during the planning phase on Monday morning.',
      },
      bonus: {
        title: 'Bonus features',
        0: 'User keyboard shortcuts when on desktop! You can (a)dd, (b)reakdown, switch to (c)urrent, mark as (d)one and switch to (p)lanning.',
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
      5: '$5/month',
      50: '$50/year',
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
        'Привет! Меня зовут Никита, и я, похоже, создал лучший менеджер задач на основе знаний, которые я почерпнул из книг <a htarget="_blank" href="https://duckduckgo.com/?q=%D0%A1%D0%B8%D0%BB%D0%B0+%D0%B2%D0%BE%D0%BB%D0%B8.+%D0%92%D0%BE%D0%B7%D1%8C%D0%BC%D0%B8+%D1%81%D0%B2%D0%BE%D1%8E+%D0%B6%D0%B8%D0%B7%D0%BD%D1%8C+%D0%BF%D0%BE%D0%B4+%D0%BA%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D1%8C&atb=v179-1_k&ia=web">Willpower</a>, <a target="_blank" href="https://duckduckgo.com/?q=%D0%9A%D0%B0%D0%BA+%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%B2%D0%B0%D1%82%D1%8C+%D0%B4%D0%B5%D0%BB%D0%B0+%D0%B2+%D0%BF%D0%BE%D1%80%D1%8F%D0%B4%D0%BA%D0%B5.+%D0%9F%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF%D1%8B+%D0%BF%D0%BE%D0%BB%D0%BD%D0%BE%D1%86%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9+%D0%B6%D0%B8%D0%B7%D0%BD%D0%B8+%D0%B1%D0%B5%D0%B7+%D1%81%D1%82%D1%80%D0%B5%D1%81%D1%81%D0%B0&atb=v179-1_k&ia=web">Getting Things Done</a> и <a target="_blank" href="https://duckduckgo.com/?q=%D0%9E%D1%81%D1%82%D0%B0%D0%B2%D1%8C%D1%82%D0%B5+%D0%B1%D1%80%D0%B5%D0%B7%D0%B3%D0%BB%D0%B8%D0%B2%D0%BE%D1%81%D1%82%D1%8C%2C+%D1%81%D1%8A%D0%B5%D1%88%D1%8C%D1%82%D0%B5+%D0%BB%D1%8F%D0%B3%D1%83%D1%88%D0%BA%D1%83&atb=v179-1_k">Eat That Frog</a>. Я разобрался в представленных идеях, упростил их, попробовал на себе и разработал этот вебсайт, основываясь на постулатах ниже. Попробуйте, и ваша продуктивность взлетит до небес — ну или я просто верну вам деньги.',
      ideas: {
        1: '🥰 Чистая голова — список входящих пуст, а вы работаете только над одной задачей за раз',
        2: '🐸 Ешьте лягушек первым делом утром — это лучшее время для работы над неприятными задачами',
        3: '💃 Пропускайте текущую задачу, когда необходимо',
        4: '🐸 Провалите задачу дважды — и это лягушка',
        5: '☁ Слишком широкая задача? Разбейте ее на подзадачи одним кликом',
        6: '👀 Нет забытых задач — вы всегда добавляете день или месяц при создании задачи',
        7: '1️⃣ Первый день месяца? Планируйте перед началом работы',
        8: '⏳ Задача занимает меньше 2 минут? Сделайте ее и запишите',
        9: '💰 Цена простая: первый месяц бесплатно, а дальше $5/месяц за бесконечную продуктивность!',
      },
      action:
        'Готовы взорвать свою продуктивность? 💪 Жмите кнопку ниже, чтобы начать пользоваться Todorant!',
      facebook: 'Войти через Фейсбук',
      google: 'Войти через Гугл',
      privacy: 'Политика конфиденциальности',
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
          'Задачи должны быть: указывающими на следующее действие ("Найти лучшие билеты в Мексику на агрегаторе билетов", а не "Полететь в Мексику"); наиболее маленькими и понятными ("Протереть дисплей", а не "Прибраться дома").',
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
      rules: {
        0: 'Как только у вас появляется задача (получаете имеил, звонок, сообщение или просто видите что-то интересное что нужно добавить в ваш список задач) — сразу же создавайте задачу. <b>Не ждите</b>, вы <b>забудете</b> про эту задачу, если ее не запишите. Пользуйтесь Телеграм ботом <a target="_blank" href="https://t.me/todorant_bot">@todorant_bot</a> для быстрого создания задач.',
        1: 'Задачи <b>всегда</b> должны быть призывом к действию и как можно более понятными. Если задача займет <b>меньше двух минут</b> — сделайте ее сразу и создайте в списке задач, как выполненную.',
        2: 'Во время создания задачи вы либо указываете точную дату, либо месяц. Вы не можете выбрать текущий месяц без определенной даты. Это сделано для того, чтобы расслабить вам мозг. Если вы доверяете системе и добавляете в нее все, что нужно, на правильные даты — то вы будете встречаться с задачами в правильное время. Огромное количество силы воли тратится зря на постоянный стресс в роде "той вещи, которую мне нужно сделать, но я точно не помню, что это за вещь". Научитесь доверять и расслабляться.',
        3: 'Первая вещь, которую вам нужно будет сделать в начале каждого месяца — это планирование. Вы берете все задачи на текущий месяц и расфасовываете их в нужные даты. Это позволяет вам отфильтровать задачи, которые более не актуальны и помогает вам оставаться в полном спокойствии, четко осознавая, что вам нужно будет делать в этом месяце.',
        4: 'Первым делом каждым утром вы будете планировать. Посмотрите на секцию <b>Планирование</b>. Вы сможете все это сделать? Раскидайте задачи, с которыми сегодня не справитесь, на другие дни. Раскидайте так же и задачи, которые остались незаконченными с предыдущих дней.',
        5: 'Кроме чрезвычайных случаев, <b>никогда</b> не смотрите на секцию планирования после окончания процесса планирования. Вам психологически будет гораздо проще, если вы будете сфокусированны только на одной задаче за раз, так что смотрите только на секцию <b>Текущее</b>. Доверяйте системе, она помнит все. Работайте и расслабляйте свой мозг.',
        6: 'В секции <b>Текущее</b> всегда есть максимум одна задача, на которой вы должны фокусироваться — больше ничего. У вас может быть больше одной задачи в день, количество задач и прогресс показан для вашего удобства. Вам нельзя прыгать между задачами — вы должны работать линейно, выполняя одну задачу за раз.',
        7: 'Лягушки — это особый тип задач, которые вы не хотите делать. Обычно, это задачи, которые вы не делаете месяцами и даже годами. Тудурант заставляет вас разбираться с лягушками первым делом каждый день. Утром ваши резервы силы воли достаточно большие, чтобы справиться даже с самыми неприятными задачами. А после победы над лягушкой вы получите достаточный заряд счастья, чтобы сиять улыбкой весь день. Вы будете собой гордиться, что наконец-то справляетесь с лягушками.',
        8: 'Вам разрешено пропускать текущую задачу — но делайте это как можно реже. Если вы не смогли выполнить задачу и вам пришлось ее перераспределить дважды — она становится лягушкой.',
        9: 'Если текущая задача слишком высокоуровневая, то разбейте ее на список подзадач. Как только вы разбили задачу на подзадачи, завершите текущую задачу.',
        10: 'Добавляйте настолько много важной информации в задачи, насколько сможете. Добавляйте ссылки на имейлы (gmail позволяет это делать), вебсайты, заметки (как evernote), документы (например, dropbox), оставляйте телефонные номера или добавляйте любую информацию, которая может быть важной для решения задачи. Тудурант не должен быть главным хранилищем и каталогом ваших данных, но местом, где ссылки на необходимые для задач данные, хранятся сразу с определенными задачами.',
        11: 'Не стесняйтесь присоединяться к нашей <a target="_blank" href="https://t.me/todorant_feedback">группе</a> в Телеграме для обмена опытом о том, как становиться продуктивнее! Ваши отзывы о работе сервиса — предложения, пожелания и жалобы — крайне приветствуются.',
        12: 'В Тудуранте нельзя создать задачу на определенное время — так и должно быть. Вместо этого, пользуйтесь режимом редактирования (иконка карандаша сверху) на странице <b>Планирования</b> для изменения порядка задач. Если вы хотите создать задачу на определенную неделю — просто добавьте ее на понедельник и перераспределите во время планирования утром понедельника.',
      },
      bonus: {
        title: 'Бонусные функции',
        0: 'Пользуйтесь шорткатами на клавиатуре на десктопе! Вы можете (a) — добавить, (b) — разбить, переключиться на (c) — текущее, пометить как (d) — выполненное и переключиться на (p) — планирование.',
      },
    },
    skipped: 'Пропущено',
    merge: {
      title: 'Объединить аккаунты',
      description:
        'Вы можете объединить разные аккаунты (например, Фейсбук, Гугл, Телеграм) здесь. Просто залогиньтесь в аккаунты, используя кнопки ниже и аккаунты будут объединены. Осторожно: это действие нельзя обратить, и списки задач будут также объединены. Возможно, если вы зашли из России без VPN, вы не видите кнопку Телеграма — тогда либо зайдите через VPN, либо обратитесь к <a target="_blank" href="https://t.me/todorant_bot">@todorant_bot</a> в Телеграме и залогиньтесь через него.',
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
      5: '$5/месяц',
      50: '$50/год',
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
  },
}
