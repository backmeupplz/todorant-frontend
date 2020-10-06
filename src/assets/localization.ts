export const messages = {
  en: {
    encryption: {
      info:
        'Use this section with the utmost caution! Encryption will not work unless you add a password. There will be two types of tasks: encrypted and unencrypted. All new tasks will be encrypted. Old todos can be converted to be encrypted with the button below. If you lose the password there will be no way to recover tasks.',
      switch: 'Encrypt todos',
      password: 'Password',
      encryptAllButton: 'Encrypt all',
      decryptAllButton: 'Decrypt all',
      confirm:
        'Are you sure you want to encrypt the todos with this password? You will be able to decrypt todos later with the same password. If you lose the password, you will not be able to decrypt todos!',
      disableConfirm:
        'Are you sure you want to remove the key and disable the encryption? This will not decrypt the tasks that are encrypted.',
      errorDecrypting: 'Wrong decryption password',
      repeatPassword: 'Repeat password',
      title: 'Encryption',
    },
    search: 'Search',
    qr: {
      code: 'QR code',
      description:
        'Use this QR code to login on mobile devices. This picture is a password, do not share it with anyone!',
    },
    breakdown: {
      request:
        'Looks like you move this task way too much. Please break it down, you can no longer move it to another date. Believe me, it will help to complete the task!',
      button: 'Breakdown',
    },
    warning: 'Warning',
    hashtags: {
      title: 'Hashtags',
    },
    supportAlert: {
      title: 'Support',
      text:
        'If you have any questions or suggestions, feel free to <a href="mailto:todorant@borodutch.com">send me an email</a>, <a href="https://t.me/borodutch" target="_blank">contact me on Telegram</a> or <a href="https://t.me/todorant_feedback" target="_blank">join our Telegram community group</a>!',
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
          'Could not send a login request to the user. Please make sure that you started @todorant_bot and that the Telegram ID is correct.',
        waiting:
          'Waiting for the response in <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>...',
        notAllowedError: 'Login request was rejected',
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
      message: '🍪 This website uses cookies.',
    },
    home: {
      texts: {
        contact: [
          'Still got questions? Contact me directly at ',
          '. Thank you.',
        ],
      },
      signIn: 'Sign in',
      facebook: 'Login with Facebook',
      google: 'Login with Google',
      privacy: 'Privacy policy',
      feedback: {
        title: 'What do the users say?',
        reviews: [
          {
            name: 'Sergey Romanov',
            username: 'Gendoor',
            text:
              'Messages in the subscription part are cute :)\n\nThank you for the simple service thriving for the ideal. Turned out that it not only helps to be productive but also proactive. Little daily improvements confidently enhance life, and the free mind is constantly looking how to fill now emptied todo list so that it could feel the pleasure of completing tasks again and again — and it is a direct route towards improving everything surrounding me.\n\nAll in all, Todorant, no matter how simple at first glance, can become a faithful ally in any business. Thank you, Nikita, for unleashing the aspects of true productivity and sharing them with us in a convenient solution.\n\nThankful Todorant subscriber.',
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
              'After I created the first tasks and switched to the "Current" tab — I was surprised that I had only one task and that I needed to complete it before moving on. This idea with one task and concentration on it struck me, it seems obvious, but I couldn\'t use it before.\n\nI usually tracked tasks and ideas in Notes, which should be done soon, but I did not approach it as a system. I have been using the service for a couple of weeks, not very actively, but I think this is a very strong way to systemize the affairs and tasks.\n\nThank you for your work!',
          },
          {
            name: 'Anton',
            username: 'mas1311',
            text:
              'Tested Todorant. At first, I was skeptical (I tried a lot of planning services already), but I realized that it works effectively and is very easy to use.\n\nPlus, for reasons unknown to me, when all the tasks are completed for the day, strong satisfaction appears, which was absent in other planners (there was something like "well, that was everything... or not?").\n\nThank you for your work!',
          },
          {
            name: 'Willsey Paslen',
            username: 'WillseyPaslen',
            text:
              'Thanks for the great service. Enough time has passed so that I can say — it helps me. Thanks, Nikita 😁 And good luck with the app.',
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
              'I can\'t say that using Todorant changed my life. Can I say that this is a meaningful and very useful application/website? Yes, thousand times yes.\n\nI like Todorant, it lets me free up my "operating memory" and allows me to think about solving problems, not about remembering them. As Nikita (the creator) correctly wrote — with constant and correct use, tasks that used to cast true biblical fear will stop appearing. And this will not happen because the complex tasks will stop coming. It will become clear to you (and to me, and everyone) that "the road will be overpowered by those walking", "the way to the thousand miles begins with one step".',
          },
          {
            name: 'Kiku Reise',
            username: 'Kiku_Reise',
            text:
              "I've arranged my work, programming and hobby tasks. Even this review was written thanks to Todorant. Just one task, no complications. That's the whole point of the app — it helped me to concentrate without constantly shuffling my todos.\n\nOf course, you can set tasks and forget about them, but for me, it's easier to go back to a minimalistic application with one task, rather than to spend half a day looking for what task to work on now out of a hundred planned in Telegram or Notion.\n\nI was especially pleased with the update with hashtags — now all stats are on the palm of my hand, I can track and share with friends how many tasks I have completed this month.\n\nThank you a lot for Todorant!",
          },
        ],
      },
      act: 'Act!',
      apple: 'Login with Apple',
      crossplatform: {
        title: 'Truly cross-platform',
      },
    },
    menu: {
      darkMode: {
        on: 'Dark mode: on',
        off: 'Dark mode: off',
      },
      logout: 'Logout',
    },
    support:
      'Something isn\'t clear? Contact me at <a target="_blank" href="mailto:n@borodutch.com">n@borodutch.com</a>',
    errors: {
      login: {
        facebook: 'Could not log in with Facebook',
        google: 'Could not log in with Google',
        telegram: 'Could not log in with Telegram',
        apple: 'Could not log in with Apple',
      },
      internal: 'Internal server error',
      loadTodos: 'Could not fetch todos',
      todo: {
        textLenght: 'Todos should have text',
        dateOrMonth: 'Todos should have either date or month set',
        more1500: "Todos can't have more than 1500 characters.",
      },
      invalidForm: 'Please, fill in the required fields',
      report: 'Could not load report',
      appleFirefox:
        'Unfortunately, there is <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1628361">a bug</a> with Apple sign-in on Firefox. Until it is resolved, please, use other web browsers to login with Apple — and then merge it with other social accounts on Todorant. Sorry for the inconvenience.',
      delegate: {
        invalidToken: 'Invite link is no longer valid',
      },
      epic: {
        numberError: 'Should be a number',
      },
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
        date: 'Exact day',
        month: 'Or month',
        tooltip:
          'Tasks should always be: actionable ("Find best flights to Mexico" vs "Go to Mexico"); as small and exact as possible ("Dust the displays" vs "Clean the house").',
        goFirst: 'Add on the top',
      },
      list: {
        completed: 'Show completed',
      },
      edit: {
        title: 'Edit',
      },
    },
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    deleteHeadline: 'Are you sure you want to delete "{name}"?',
    current: 'Current',
    planning: 'Planning',
    created: 'Created',
    breakdownInfo: 'Use breakdown when the current task is too broad',
    howto: {
      title: 'How to use Todorant?',
      premise:
        'Below are the main principles that you should follow to productively exploit all the features provided by Todorant. It is easy as 1-2-3, just with a few more steps.',
      bonus: {
        title: 'Bonus features',
        rules: [
          'User keyboard shortcuts when on desktop! You can (a)dd, (b)reakdown, switch to (c)urrent, mark as (d)one and switch to (p)lanning. To add an additional task slot while adding tasks, you can use Ctrl+Shift+A.',
        ],
      },
    },
    skipped: 'Skipped',
    subscription: {
      title: 'Subscription',
      statusText: 'Subscription status: {status}',
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
      manage: 'Manage subscription',
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
      duplicateTagInBreakdown: 'Copy hashtags during a breakdown',
      export: 'Export data',
      hotkeys: 'Hotkeys',
      startTimeOfDay: 'Start of the day',
      username: 'Name',
      telegram: 'Telegram',
      swipeActions: 'Swipe actions',
    },
    allDoneTitle: 'Congratulations!',
    allDoneText:
      '🥳 You did it! All the tasks for today are done, go get rest or maybe dance a little 💃',
    noTodosTitle: 'To infinity!',
    noTodosText:
      "You don't have any todos for today. If you want to work — add a new todo for today or take the todos from future days.",
    addTodoTime: 'Exact time',
    completed: 'Completed',
    planningText:
      'Looks like you have some planning to do! Please, redistribute the outstanding tasks below to unlock the "Current" tab and to keep being productive. Cheers!',
    activeText:
      '🎉 Thank you a lot for supporting Todorant! I personally hope that Todorant has improved your life already and will keep making it better in future! You support allows me to work on Todorant daily and to add new features simplifying the work and freeing your time and your cognitive resources. Thank you a lot, again!',
    inactiveText:
      '🐝 It looks like your Todorant trial has come to the end. This is the awkward moment when you have to decide — whether Todorant has improved your life enough to spend money on it — and I have to navigate you towards the right decision. I am at the peak of my happines when I am able to bring value to the people; and if Todorant was able to make your life better, I will be more than thankful if you buy the subscription. It is just $5/month for the unlimited productivity and free mind. Every cent I earn on Todorant will be spent on improving the service. By supporting Todorant — you allow me, independent developer, to keep improving the product that benefits us all from day to day. Thank you a lot in advance!',
    earlyAdopterText:
      '👏👏 — this is me applauding you; you — the crazy ones who agreed to try out the instrument of ever increasing productivity, Todorant, among the first. One can say that you are the golden thousand, feedback of whom was shaping the Todorant from the very beginning. You have all the rights to use Todorant as much as you wish — you will never experience any limits, you have earned it. However, if you noticed that Todorant has drastically improved your life — you can still buy the subscription thus saying the best kind of "Thank you". You will never loose the "Early adopter 🦄" status — but will always be able to cancel the subscription. Thank you a lot for still using Todorant — and I will keep adding new features improving the product that positively affects all of us. Good luck!',
    earlyAdopterTextBonus:
      '🤗 Holy +*%$! Looks like either Todorant or I personally helped you enough that you purchased subscription even though you could use Todorant for free forever. I am deeply touched and happy to have a cup of coffee with you or just to chat a little. Feel free to reach me on Telegram (@borodutch) or by email — just click my name below. Thank you a lot! It is hard to imagine how important your contribution is!',
    trialText:
      '💪 Welcome to Todorant! You have 30 days after the registration to figure out whether Todorant works well for you. After 30 days will pass, you will still have access to the old tasks but will not be able to add new ones. It is perfectly fine to purchase subscription before 30 days end. I believe that using Todorant will bring you new heights in the personal productivity!',
    rules: [
      'As soon as you get an actionable task (receive an email, phonecall, text, or if you see anything of interest that has to be put on your todo list) — create a todo for it right away. Do not wait, you will forget about it if you do not take it down.',
      'Todos should always be actionable and as explicit as possible. If a task takes less than 2 minutes, then do it right away and record it as completed.',
      'You either add a specific date or select a month while creating a todo. You cannot pick current month without selecting a specific date. This is done to relax your mind. If you trust the system and put everything that needs to be done on the correct date — you will encounter it at the right time. Huge amount of willpower is wasted on being constantly stressed about "that other thing that I need to deal with but I am not quite sure what it was". Learn to trust and relax.',
      'First thing you do each month is planning ahead. You take all the tasks assigned to the current month and you sort them in the correct dates. It allows you to filter out outdated tasks and keep your mind in peace with, knowing exactly what you need to do this month.',
      'First thing you do in the morning is planning your day. Have a glance at your Planning section. Can you handle everything? Distribute tasks that cannot be dealt with today. Redistribute any tasks left undone from the previous days.',
      'Unless it is an emergency, do not look at the planning section after you have finished planning. It will be way better psychologically if you only focus on one task, so keep your eyes on the Current section. Trust the system, it remembers everything. Do your job and relax your mind.',
      'Current section contains only one task that you need to focus on — nothing else. You can have more than one task a day, the amount of tasks as well as progress bar is displayed for your convenience. You are not allowed to jump between tasks — you should deal with every task linearly, one by one.',
      'Frogs are special types of tasks you generally do not want to deal with. Usually they are the tasks left behind for months and even years. Todorant ensures that you handle frogs first thing every day. In the morning your willpower reserve is large enough to handle even the most outrageous tasks. And after you finally deal with a frog — you receive just enough happiness to be smiling throughout the whole day. You feel proud of yourself when you deal with frogs.',
      'You are allowed to skip current task — but try to do so as rarely as possible. You cannot skip a frog. If you failed to complete a task and had to redistribute it twice, it becomes a frog.',
      'If the current task is too high level, then break it down to a list of subtasks. As soon as you break it down, the task is marked as completed.',
      'Add as much relevant information about the todo as possible. Add links to specific emails (gmail on web allows you to do this), websites, notes (like evernote), documents (like dropbox), leave phone numbers or add any information you might need to complete the task. Todorant is not meant to be a point of reference for you — instead it should act as a catalogue of links to the reference information relevant to specific todos.',
      'Feel free to join our multi-language group on Telegram to share experience and tricks on how to be more productive — @todorant_feedback! Your feedback about the service — suggestions, wishes and complaints — are highly welcome.',
      'Use the edit mode (the list order icon on top) on the Planning page to change the task order. If you want to assign a task to a specific week, just assign it to Monday and reassign it during the planning phase on Monday morning.',
      'Todorant does not have and will never have repeating tasks — the only thing they do well causing anxiety by hanging over you as unfinished tasks. If you need to complete repeating tasks — add all of them manually, your brain will thank you for conscious tasks.',
      'Todorant does not have the concept of "Projects" as it has proven itself to be demotivating, some of the "folder" never get open. Projects "Fitness" and "Self-improvement" send their regards. Instead, use #hashtags.',
      'Frogs will always appear on the top of the list.',
      'Todorant does not have notifications about the upcoming tasks with the exact time set. However, feel free to use Google Calendar integration so that Google can annoy you with notifications, not Todorant.',
    ],
    earlyAdopter: 'Early adopter 🦄',
    active: 'Active',
    inactive: 'Inactive',
    trial: 'Trial',
    weekday1: 'Monday',
    weekday2: 'Tuesday',
    weekday3: 'Wednesday',
    weekday4: 'Thursday',
    weekday5: 'Friday',
    weekday6: 'Saturday',
    weekday0: 'Sunday',
    introTitle: 'Welcome!',
    introButton: 'Intro message',
    intro1:
      "Let's keep it short: you want to improve your productivity. Todorant can help you. But Todorant is not another task list — it is a system that needs to be followed, it is a lifestyle, it is a habit.",
    intro2:
      'Reading through the "How to use Todorant" section in the settings will help you to get the most out of Todorant, but it is not necessary. Todorant will help you by limiting your actions — it will train your brain to get satisfaction from completing the tasks.',
    intro3:
      'If you have questions about something on a screen, first tap the "i" button on the top right of the screen. Not sure what a button does? Tap "i"!',
    intro4:
      "Todorant is free for the first 30 days and then $5/month. The reason it may appear a bit pricy is that you are not paying for a yet another todo app, you are purchasing productivity — the whole system that doesn't make you sink in settings and functions, but makes you complete the tasks! After all, try Todorant for 30 days for free and upgrade if you get more than $5 of value from it.",
    intro5:
      'I welcome you to the productivity journey, let the new era of your life begin!',
    introBack: "Let's go!",
    soundEffects: 'Sound effects',
    emptyHashtags:
      'Hashtag list is empty for now. Create your first task with a #hashtag to add the first hashtag here!',
    refreshRequest:
      'There is a new version of Todorant available. Please refresh the page to get the new shiny stuff 🦄',
    refresh: 'Refresh',
    heroProfileTitle: 'Hero profile',
    infoHero:
      "This is the profile page of you — the hero! Complete tasks and earn points to achieve higher and higher ranks!\n\nYou won't know the whole list of ranks until you achieve the highest! Remember: the only way to get to the top is through the everyday sequence of small steps.",
    rank: '🔥 Your rank 🔥',
    'rank-1Title': 'Dark matter infinity being 😈',
    'rank-1Description':
      "You have achieved the rank no human was able to achieve before! Congratulations, here is your pie: 🍰. It's not a lie this time.",
    rank0Title: 'Subzero −273.15 °C 🥶',
    rank0Description: "It'd be a lot cooler if it could.",
    rank5Title: 'V is for Vroductivive 👺',
    rank5Description:
      'Remember kids, if you drop productivity for less than 5 seconds and pick it up, you are safe!',
    rank13Title: 'Happy Freddy 😱',
    rank13Description:
      'You know what day it is. It is the day Jason bakes a cake for you. Every day is this day now.',
    rank42Title: 'Fisher 🐬',
    rank42Description: 'So long! And thanks for all the fish!',
    rank69Title: 'Nice master! 😝',
    rank69Description: 'The nicest rank there is. Period.',
    rank85Title: 'Mark-85 🦄',
    rank85Description: 'One can say your productivity is made of Iron.',
    rank100Title: '100% force user ⚡️',
    rank100Description:
      '100 done, infinity to go! Keep going every day, it is worth it!',
    rank221Title: 'Sherlock 😎',
    rank221Description: 'You solved the productivity, well, good for you!',
    rank256Title: 'Happy plumber 👾',
    rank256Description:
      '8 bits of productivity later you still think of good old games.',
    rank300Title: 'Spartan 💪',
    rank300Description:
      'Clear your mind, simplify the routines, spend the next 100 points as a true Spartan!',
    rank404Title: '❓❓❓',
    rank404Description: 'Rank not found.',
    rank777Title: 'Lucky grandmaster! 🍀',
    rank777Description:
      'This rank only lasts 23 points. Make it count, it is your lucky day!',
    rank800Title: 'T-800 🤖',
    rank800Description:
      'You are the terminator of dreadful frogs. Go terminate a few!',
    rank1337Title: '3L1T3 🧑‍💻',
    rank1337Description: 'Productivity hacking is initiated... Hacking...',
    rank1338Title: '3L1T3 (Hacked) 🧑‍💻',
    rank1338Description: 'Hacked productivity successfully!',
    rank2048Title: 'Chess master ♔',
    rank2048Description:
      'You prefer productivity over endless pointless time-killing games, right? RIGHT?',
    rank9000Title: 'Over 9000 power user 🏋️',
    rank9000Description: 'You lift the tasks like they are nothing!',
    rank12800Title: 'Doctor Manhattan ⚛',
    rank12800Description:
      'You breakdown the tasks like you split the atoms. Keep up the good work!',
    homeShort: {
      headline: 'Productivity systems fail.',
      headline2: 'Todorant works.',
      feature1: 'Focus on one task at a time',
      feature2: 'Always add a date or a month to a task',
      feature3: 'Complete unpleasant tasks (frogs) first',
      feature4: 'Keep your inbox empty',
      differenceTitle: "What's the difference?",
      differenceText1:
        'All other productivity apps focus on storing, organizing and automating endless lists of tasks. Todorant focuses on the only thing that matters: it makes you complete the tasks.',
      differenceText2:
        'Todorant uses a carefully crafted set of limits and praise to punish bad behaviour and support good habits. It affects the primitive part of the brain to make it crave completing todos like people crave sugar.',
      differenceText3:
        "I've read and tried 20+ productivity books and methodologies. When all of them failed one by one I combined their components and simplified the result. This is how Todorant was created.",
      dealTitle: "What's the deal?",
      dealText1:
        "Todorant is free for the first 30 days and then it is $5/month. It is more expensive than competitors because it works. If you don't get $5 worth of productivity in the first 30 days of the free trial, you are welcome not to continue to use Todorant.",
      dealText2:
        "No strings attached. You don't need to give us any information like a credit card at all before your trial ends. You don't even need an account if you install the mobile apps!",
      dealText3:
        'The only exception is if you signup on iOS, Apple has forced us to make you commit to a free trial before you can use the app. The way to avoid this limit is to create an account here, on the website, and then log in on the iOS app.',
    },
    googleCalendarDisableSuccess: 'Google Calendar disabled',
    googleCalendarEnableSuccess: 'Google Calendar enabled',
    spread: {
      hint:
        'Choose tasks to spread, choose dates to spread over, press a button and see how selected tasks spread evenly between the selected dates',
      spreading: 'Spreading',
      chooseTasks: 'Click on the tasks to spread',
      between: 'between',
      chooseDates: 'Click on the dates to spread over',
    },
    level: 'Level',
    points: 'points',
    pointsTillNextLevel: 'points to unlock the next level',
    accept: 'Accept',
    delegate: {
      title: 'Delegation',
      noDelegators:
        "You don't have any delegators yet. Share the link above with the people who you want to make delegators",
      noDelegates:
        "You don't have any delegates yet. Ask for an invite link to become someone's delegator.",
      noDelegatedTasks: "You don't have any more newly delegated tasks.",
      link: 'Delegate invite link',
      linkDescription:
        'Share this link only with the people you trust. People can become your delegators by following this link. Delegators will only see the tasks that they delegated to you.',
      resetConfirmation:
        "Are you sure that you want to reset the link? The current link won't work anymore!",
      delegators: 'Delegators',
      delegates: 'Delegates',
      inviteSuccess: 'Success! Now you can delegate tasks to this user.',
      inviteConfirm:
        'Are you sure you want to become a delegator to this user?',
      deleteDelegateConfirmation:
        'Are you sure you want to delete this delegate? You will no longer be able to delegate tasks to this delegate.',
      deleteDelegatorConfirmation:
        'Are you sure you want to delete this delegator? This delegator will no longer be able to delegate tasks to you.',
      pickDelegateField: 'Delegate',
      noDelegatorsShort: "You don't have any delegators yet",
    },
    epic: {
      intoEpic: 'Make an Epic',
      epicGoal: 'Epic goal',
    },
    success: 'Success!',
    notLogginedBody: 'Please, login at ',
  },
  ru: {
    encryption: {
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
      repeatPassword: 'Повторите пароль',
      title: 'Шифрование',
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
        'Если у вас есть какие-либо вопросы или предложения, <a href="mailto:todorant@borodutch.com">напишите мне имеил</a>, <a href="https://t.me/borodutch" target="_blank">в Телеграм</a> или <a href="https://t.me/todorant_feedback" target="_blank">присоединитесь к нашей групе сообщества в Телеграме</a>!',
    },
    loginMobile: {
      telegram: {
        headline:
          'Пожалуйста, зайдите через Телеграм, введя свой Телеграм ID в поле ниже и нажав "Войти". Вы можете узнать свой Телеграм ID, отправив <code>/id</code> в <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>. Или вы можете отправить команду <code>/qr</code> в <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a> и просканировать его в секции логина через QR код!',
        idHint: 'Телеграм ID',
        loginButton: 'Войти',
        noCredentialsError: 'Пожалуйста, укажите Телеграм ID',
        cannotSendMessageError:
          'Не получилось отправить запрос на логин пользователю. Пожалуйста, убедитесь, что вы начали чат с @todorant_bot и что Телеграм ID правильный.',
        waiting:
          'Ожидаем ответа в <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>...',
        notAllowedError: 'Запрос на вход был отвергнут',
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
      message: '🍪 Этот веб сайт использует печеньки.',
    },
    home: {
      texts: {
        contact: ['Остались вопросы? Напишите мне на ', '. Спасибо.'],
      },
      signIn: 'Войти',
      facebook: 'Войти через Фейсбук',
      google: 'Войти через Гугл',
      privacy: 'Политика конфиденциальности',
      feedback: {
        title: 'Что говорят пользователи?',
        reviews: [
          {
            name: 'Sergey Romanov',
            text:
              'Милые сообщения в разделе подписки Тудуранта :)\n\nБлагодарю за простой и стремящийся к идеальному сервис. Оказалось, что он помогает быть не только продуктивным, но и проактивным. Маленькие улучшения каждый день уверенно подтягивают за собой отстающие звенья, а свободный от задач разум постоянно ищет, чем бы заполнить опустевший список задач, чтобы снова и снова получать удовольствие от их выполнения и связанных с этим перемен — и это прямой путь к улучшению всего, что меня окружает.\n\nВ общем, Тудурант, каким бы простым он ни казался на первый взгляд, способен стать верным соратником в любых делах. Спасибо, Никита, что осознал аспекты истинной продуктивности и поделился ими с нами в удобном решении.\n\nБлагодарный подписчик Тудуранта.',
          },
          {
            name: 'Dinislam Sad',
            text:
              'Главные плюсы, которые лично мне да и уверен остальным также понравились.\n1. Простой и удобный интерфейс.\n2. Пропущенные задачи автоматически становятся лягушками, и также возможность изначально отметить задачу "лягушкой".\n3. Категория /done это просто необходимость, и спасибо за это, Никита. Я юзал Тудуист, Вундерлист, Мои Дела. Все эти программы перегруженные слишком.\n4. Телеграм бот.',
          },
          {
            name: 'Aleksei Kaut',
            text:
              'После того как создал первые задачи и переключился на вкладку "Текущие" — офигел от того, что передо мной только одна задача и что надо завершить ее перед тем как идти дальше. Эта идея с одной задачей и концентрацией на ней меня поразила, вроде очевидно, но раньше так не мог.\n\nЯ обычно писал в Notes задачи и идеи, что нужно сделать в ближайшем времени, но не подходил к этому как к системе. Пользуюсь сервисом пару недель и не очень активно, но думаю это очень сильный подход к систематизации дел и задач.\n\nСпасибо за твою работу!',
          },
          {
            name: 'Anton',
            text:
              'Протестировал тудурант. Сначала был скепсис (уж очень много перепробовал сервисов по планированию), но понял, что действительно эффективно работает и очень прост в использовании.\n\nПлюс, по неизвестной мне причине, когда выполняются все задачи на день появляется мощная гордость и удовлетворение, что отсутствовало в других планировщиках (там было что то в формате "ну вроде все.. или нет?").\n\nСпасибо за твои работы!',
          },
          {
            name: 'Willsey Paslen',
            text:
              'Спасибо за отличный сервис. Прошло достаточно времени, чтобы точно можно было сказать — мне он помогает. Спасибо, Никита 😁 И удачи с приложением.',
          },
          {
            name: 'Игорь Малинкин',
            text:
              'с Тударантом я хоть что-то начал делать, так что моя производительность поднялась с 0.',
          },
          {
            name: 'Владимир Дубенко',
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
            text:
              'Я разгрузил свои задачи по работе, программированию и хобби. И даже этот отзыв написал благодаря фокусу от Тудуранта. Всего одна задача, никаких усложняющих приоритетов. В этом вся фишка сервиса — он помог мне сконцентрироваться, и не распыляясь поочередно выполнить таски.\n\nКонечно, можно проставить задачи и забить, но лично мне проще возвращаться к минималистичному приложению с одной задачкой, нежели пол дня искать в сохраненках Телеграма или Notion какую бы задачу сейчас выполнить из сотни запланированных.\n\nОсобенно порадовало обновление с хештегами — теперь вся статистика как на ладони, могу трекать и делиться с друзьями сколько задач по разработке я выполнил в этом месяце.\n\nБольшое спасибо за Тудурант!',
          },
        ],
      },
      act: 'Действуйте!',
      apple: 'Войти через Эппл',
      crossplatform: {
        title: 'По-настоящему кросс-платформенный',
      },
    },
    menu: {
      darkMode: {
        on: 'Темная тема: вкл',
        off: 'Темная тема: выкл',
      },
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
        more1500: 'Задача не может иметь более 1500 символов',
      },
      invalidForm: 'Пожалуйста, заполните необходимые поля',
      report: 'Не получилось загрузить отчет',
      appleFirefox:
        'К сожалению, это <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1628361">баг</a> в Firefox. Пока его не поправят, пожалуйста, используйте другой браузер для логина через Эппл — а после объедините аккаунты с другими соцсетями в Тудуранте. Прошу прощения за неудобства.',
      delegate: {
        invalidToken: 'Ссылка-приглашение больше не работает',
      },
      epic: {
        numberError: 'Должно быть цифрой',
      },
    },
    close: 'Закрыть',
    notFound: 'Страница не найдена',
    todo: {
      create: {
        title: 'Добавить задачи',
        text: 'Текст задачи',
        textHint: 'Сюда можно добавить ссылку на имеил или веб сайт',
        placeholder: 'Задача',
        frog: 'Это лягушка!',
        date: 'Точный день',
        month: 'Или месяц',
        tooltip:
          'Задачи должны быть: указывающими на следующее действие ("Найти лучшие билеты в Мексику на агрегаторе билетов", а не "Полететь в Мексику"); наиболее маленькими и понятными ("Протереть дисплей", а не "Прибраться дома").',
        goFirst: 'Добавить наверх',
      },
      list: {
        completed: 'Показать завершенные',
      },
      edit: {
        title: 'Редактирование',
      },
    },
    cancel: 'Отменить',
    save: 'Сохранить',
    delete: 'Удалить',
    deleteHeadline: 'Вы уверены, что хотите удалить "{name}"?',
    current: 'Текущее',
    planning: 'Планирование',
    created: 'Создано',
    breakdownInfo: 'Используйте разбивку, если текущая задача слишком широкая',
    howto: {
      title: 'Как пользоваться Тудурантом?',
      premise:
        'Ниже описаны основные принципы, которых вы должны придерживаться, чтобы максимально продуктивно пользоваться всеми функциями Тудуранта. Это просто, как 1-2-3, просто на несколько шагов побольше.',
      bonus: {
        title: 'Бонусные функции',
        rules: [
          'Пользуйтесь шорткатами на клавиатуре на десктопе! Вы можете (a) — добавить, (b) — разбить, переключиться на (c) — текущее, пометить как (d) — выполненное и переключиться на (p) — планирование. Чтобы добавить дополнительную задачу, когда добавляете задачи, пользуйтесь Ctrl+Shift+A.',
        ],
      },
    },
    skipped: 'Пропущено',
    subscription: {
      title: 'Подписка',
      statusText: 'Статус подписки: {status}',
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
      manage: 'Управление подпиской',
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
      duplicateTagInBreakdown: 'Копировать хештеги при разбивке',
      export: 'Экспорт данных',
      hotkeys: 'Горячие клавиши',
      startTimeOfDay: 'Начало дня',
      username: 'Имя',
      telegram: 'Телеграм',
      swipeActions: 'Действия свайпами',
    },
    allDoneTitle: 'Поздравляем!',
    allDoneText:
      '🥳 Вы это сделали! Все задачи на сегодня выполнены, идите отдохните — ну или потанцуйте немного 💃',
    noTodosTitle: 'Вперед!',
    noTodosText:
      'На сегодня у вас нет задач. Хотите поработать — добавьте новые задачи на сегодня или заберите задачи с других дней.',
    addTodoTime: 'Точное время',
    completed: 'Завершено',
    planningText:
      'Похоже, вам нужно заняться планированием! Пожалуйста, перераспределите оставшиеся задачи ниже для того, чтобы разблокировать секцию "Текущее", и для того, чтобы оставаться продуктивными. Удачи!',
    activeText:
      '🎉 Огромное спасибо за поддержку Тудуранта! Я лично надеюсь, что Тудурант достаточно изменил вашу жизнь и будет помогать ее улучшать изо дня в день в будущем! Ваша поддержка помогает мне заниматься Тудурантом на постоянной основе и добавлять новые функции, упрощающие работу и освобождающие вам время и когнитивные ресурсы. Спасибо вам еще раз!',
    inactiveText:
      '🐝 Похоже, ваш триал Тудуранта подошел к концу. Это тот самый неловкий момент, когда вам нужно сделать решение — настолько ли вам помог Тудурант, чтобы начать использовать его на постоянной основе; а мне нужно подтолкнуть вас в сторону правильного решения. Вершина моего счастья — это приносить пользу людям; а если Тудурант и вправду стал неотъемлемой частью вашей жизни, то я буду невероятно благодарен вам, если вы приобретете подписку. Всего $5/месяц — это цена бесконечной продуктивности и свободной головы. Каждый цент, который я получу с Тудуранта, я буду направлять на развитие этого сервиса. Поддержав Тудурант, вы лично поможете независимому разработчику ежедневно улучшать продукт, которым вы пользуетесь на постоянной основе. Заранее благодарю вас!',
    earlyAdopterText:
      '👏👏 — это я хлопаю вам стоя; вы — безумцы, которые согласились попробовать инструмент повышения персональной продуктивности Тудурант одними из первых. Можно сказать, вы — золотая тысяча пользователей, на отзывах которых и создавался Тудурант. Вы имеете полное право пользоваться Тудурантом столько, сколько вам угодно — для этого аккаунта никогда не будет введено никаких ограничений, вы заслужили это. Однако если вы заметили, что Тудурант резко изменил вашу жизнь к лучшему — вы все еще можете приобрести подписку, тем самым сказав простое, но очень важное для меня лично: "Спасибо". Вы никогда не потеряете статус "Ранний адоптер 🦄" — а подписку сможете отменить в любой момент. Спасибо большое, что вы продолжаете пользоваться Тудурантом — а я продолжу добавлять приятные функции в этот инструмент, который делает каждого из нас лучше. Удачи!',
    earlyAdopterTextBonus:
      '🤗 Вот это да! Должно быть, либо Тудурант, либо я лично вам настолько помог, что, даже имея возможность пользоваться Тудурантом бесплатно, вы решили меня поддержать. Я поражен прямо в сердце и с удовольствием попью с вами кофе или просто поболтаю по душам. Пишите либо мне в телеграме (@borodutch), либо на почту — просто нажмите на мое имя ниже. Спасибо вам огромное! Сложно представить, насколько для меня важен ваш вклад!',
    trialText:
      '💪 Добро пожаловать в Тудурант! С момента регистрации у вас есть ровно 30 дней для того, чтобы опробовать систему и понять, подходит ли она вам. По истечении 30 дней вы все еще будете иметь доступ к существующим задачам, но не сможете добавлять новые. Если что, то никто не мешает вам оформить подписку до окончания триального периода в 30 дней. Я уверен, что вместе с Тудурантом вы сможете достичь новых высот в собственной продуктивности!',
    rules: [
      'Как только у вас появляется задача (получаете имеил, звонок, сообщение или просто видите что-то интересное что нужно добавить в ваш список задач) — сразу же создавайте задачу. Не ждите, вы забудете про эту задачу, если ее не запишете.',
      'Задачи всегда должны быть призывом к действию и как можно более понятными. Если задача займет меньше двух минут — сделайте ее сразу и создайте в списке задач, как выполненную.',
      'При создании задачи вы указываете точную дату или месяц. Вы не можете выбрать текущий месяц без определенной даты. Это сделано для того, чтобы снять напряжение с мозга. Если вы доверяете системе и добавляете все, что нужно, на правильные даты — то вы будете выполнять задачи в подходящее время. Огромное количество силы воли тратится зря на постоянный стресс вроде "той вещи, которую мне нужно сделать, но я точно не помню, что это за вещь". Научитесь доверять и расслабляться.\n',
      'Первая вещь, которую вам нужно будет сделать в начале каждого месяца — это планирование. Вы берете все задачи на текущий месяц и расфасовываете их в нужные даты. Это позволяет вам отфильтровать задачи, которые более не актуальны и помогает вам оставаться в полном спокойствии, четко осознавая, что вам нужно будет делать в этом месяце.',
      'Первым делом каждым утром вы будете планировать. Посмотрите на секцию "Планирование". Вы сможете все это сделать? Раскидайте задачи, с которыми сегодня не справитесь, на другие дни. Раскидайте также и задачи, которые остались незаконченными с предыдущих дней.',
      'Кроме чрезвычайных случаев, никогда не смотрите на секцию планирования после окончания процесса планирования. Вам психологически будет гораздо проще, если вы будете сфокусированы только на одной задаче за раз, так что смотрите только на секцию "Текущее". Доверяйте системе, она помнит все. Работайте и расслабляйте свой мозг.',
      'В секции "Текущее" всегда есть максимум одна задача, на которой вы должны фокусироваться — больше ничего. У вас может быть больше одной задачи в день, количество задач и прогресс показан для вашего удобства. Вам нельзя прыгать между задачами — вы должны работать линейно, выполняя одну задачу за раз.',
      'Лягушки — это особый тип задач, которые вы не хотите делать. Обычно, это задачи, которые вы не делаете месяцами и даже годами. Тудурант заставляет вас разбираться с лягушками первым делом каждый день. Утром ваши резервы силы воли достаточно большие, чтобы справиться даже с самыми неприятными задачами. А после победы над лягушкой вы получите достаточный заряд счастья, чтобы сиять улыбкой весь день. Вы будете собой гордиться, что наконец-то справляетесь с лягушками.',
      'Вам разрешено пропускать текущую задачу — но делайте это как можно реже. Если вы не смогли выполнить задачу и вам пришлось ее перераспределить дважды — она становится лягушкой.',
      'Если текущая задача слишком высокоуровневая, то разбейте ее на список подзадач. Как только вы разбили задачу на подзадачи, она отмечается, как завершенная.',
      'Добавляйте настолько много важной информации в задачи, насколько сможете. Добавляйте ссылки на имейлы (gmail позволяет это делать), веб сайты, заметки (как evernote), документы (например, dropbox), оставляйте телефонные номера или добавляйте любую информацию, которая может быть важной для решения задачи. Тудурант не должен быть главным хранилищем и каталогом ваших данных, но местом, где ссылки на необходимые для задач данные, хранятся сразу с определенными задачами.',
      'Не стесняйтесь присоединяться к нашей группе в Телеграме для обмена опытом о том, как становиться продуктивнее — @todorant_feedback! Ваши отзывы о работе сервиса — предложения, пожелания и жалобы — крайне приветствуются.',
      'Переносите задачи на странице "Планирования" для изменения порядка. Если вы хотите создать задачу на определенную неделю — просто добавьте ее на понедельник и перераспределите во время планирования утром понедельника.',
      'В Тудуранте нет и никогда не будет автоматически повторяющихся задач — единственное, в чем они помогают — это создание атмосферы страха, накапливаясь невыполненным грузом. Если нужно внести повторяющуюся задачу — внесите ее вручную, ваш мозг скажет вам спасибо за осмысленную задачу.',
      'В Тудуранте нет концепта "Проектов", так как он показал себя демотивирующим, некоторые папки просто никогда не открываются. Проекты "Фитнес" и "Саморазвитие" передают привет. Вместо этого, используйте #хештеги.',
      'Лягушки всегда находятся сверху в списке.',
      'В Тудуранте нет напоминаний о задачах с точным временем. Однако вы можете включить интеграцию с Гугл Календарем, чтобы вам надоедал нотификации Гугл, а не Тудурант.',
    ],
    earlyAdopter: 'Ранний адоптер 🦄',
    active: 'Активная',
    inactive: 'Неактивная',
    trial: 'Триал',
    weekday1: 'Понедельник',
    weekday2: 'Вторник',
    weekday3: 'Среда',
    weekday4: 'Четверг',
    weekday5: 'Пятница',
    weekday6: 'Суббота',
    weekday0: 'Воскресенье',
    introTitle: 'Добро пожаловать!',
    introButton: 'Вступительное сообщение',
    intro1:
      'Буду краток: вы хотите улучшить вашу продуктивность. Тудурант поможет вам с этим. Но учтите, что Тудурант — это не очередной список задач — это система, которой нужно следовать, это стиль жизни, это привычка.',
    intro2:
      'Прочтение пункта "Как использовать Тудурант" в настройках может помочь, но это совсем необязательно. Тудурант поможет вам, ограничив ваши действия — он заставит ваш мозг получать удовольствие от завершения задач.',
    intro3:
      'Если у вас появятся какие-либо вопросы о функциях на каком-либо экране, сначала нажмите на кнопку "i" справа вверху. Не знаете, что делает какая-либо кнопка? Жмите "i"!',
    intro4:
      'Тудурант бесплатен первый месяц, а потом стоит примерно $5/месяц. Причина, по которой Тудурант может выглядеть дорогим — это то, что вы не покупаете очередной менеджер задач, а подписываетесь на систему, которая заставляет вас наконец-то эти задачи выполнять. Другие приложения закидывают вас функциями и настройками — Тудурант же заставляет вас наконец-то начать выполнять задачи и добиваться целей! В конце концов, попробуйте Тудурант первые 30 дней и оплатите подписку, если вы получите больше $5 пользы.',
    intro5:
      'Я приветствую вас на вашем пути продуктивности, да начнется же новая эра вашей жизни!',
    introBack: 'Поехали!',
    soundEffects: 'Звуковые эффекты',
    emptyHashtags:
      'Список хештегов пока что пуст. Добавьте свою первую задачу с #хештегом, чтобы добавить сюда первую позицию!',
    refreshRequest:
      'Доступна новая версия Тудуранта. Пожалуйста, обновите страницу, чтобы получить новые блестящие функции 🦄',
    refresh: 'Обновить',
    heroProfileTitle: 'Профиль героя',
    infoHero:
      'Это ваш профиль — профиль героя! Завершайте задачи и зарабатывайте очки, чтобы выбивать все более и более высокие ранги!\n\nВы не увидите полный список рангов, пока не добьетесь самого высокого! Помните: единственный способ добраться до самого верхнего ранга — это ежедневная цепочка из маленьких шажков.',
    rank: '🔥 Ваш ранг 🔥',
    'rank-1Title': 'Существо бесконечности темной материи 😈',
    'rank-1Description':
      'Вы достигли ранга, которого ни один смертный еще не достигал! Поздравляю, вот ваш тортик: 🍰. В этот раз, это не ложь.',
    rank0Title: 'Сабзиро −273.15 °C 🥶',
    rank0Description: 'Было бы еще холоднее, если бы могло.',
    rank5Title: 'В значит Вродуктивность 👺',
    rank5Description:
      'Помните дети, если вы уронили продуктивность на пол менее, чем на 5 секунд, то все должно быть нормально!',
    rank13Title: 'Веселый Фредди 😱',
    rank13Description:
      'Вы знаете, что сегодня за день. Сегодня Джейсон печет вам торт. Такой день теперь каждый день.',
    rank42Title: 'Рыбак 🐬',
    rank42Description: 'Всего хорошего, и спасибо за рыбу!',
    rank69Title: 'Найс мастер! 😝',
    rank69Description: 'Самое клевое число из чисел. Точка.',
    rank85Title: 'Марк-85 🦄',
    rank85Description: 'Можно сказать, ваша продуктивность сделана из железа.',
    rank100Title: '100% пользователь силы ⚡️',
    rank100Description:
      '100 за спиной, бесконечность впереди! Выполняйте задачи каждый день, это того стоит!',
    rank221Title: 'Шерлок 😎',
    rank221Description: 'Вы разгадали секрет продуктивности. Молодец!',
    rank256Title: 'Счастливый сантехник 👾',
    rank256Description:
      '8 бит продуктивности спустя вы все еще вспоминаете теплые и ламповые игры на Денди.',
    rank300Title: 'Спартанец 💪',
    rank300Description:
      'Очистите ваши мысли, упростите свои рутины, проведите следующие 100 очков как настоящий спартанец!',
    rank404Title: '❓❓❓',
    rank404Description: 'Ранг не найден.',
    rank777Title: 'Удачливый грандмастер! 🍀',
    rank777Description:
      'На этом ранге вы будете всего лишь 23 очка. Сделайте так, чтобы вами можно было гордиться. Сегодня ваш счастливый день!',
    rank800Title: 'T-800 🤖',
    rank800Description:
      'Вы просто терминатор мерзких лягух. Идите, уничтожьте пару!',
    rank1337Title: '3L1T3 🧑‍💻',
    rank1337Description:
      'Хакинг продуктивности начат... Хакирование в процессе...',
    rank1338Title: '3L1T3 (хакнуто) 🧑‍💻',
    rank1338Description: 'Продуктивность хакнута успешно!',
    rank2048Title: 'Мастер шахмат ♔',
    rank2048Description:
      'Вы предпочитаете продуктивность разным бессмысленным играм, которые просто убивают время, правда? ПРАВДА?',
    rank9000Title: 'Овер 9000 силы 🏋️',
    rank9000Description: 'Вы поднимаете задачи, как будто они ничего не весят!',
    rank12800Title: 'Доктор Манхэттен ⚛',
    rank12800Description:
      'Вы разбиваете задачи, как будто расщипляете атомы. Продолжайте быть офигенными!',
    homeShort: {
      headline: 'Системы продуктивности не работают.',
      headline2: 'Тудурант работает.',
      feature1: 'Фокусируйтесь на одной задаче за раз',
      feature2: 'Добавляйте дату или месяц каждой задаче',
      feature3: 'Делайте неприятные задачи (лягушки) в начале дня',
      feature4: 'Держите папку "входящие" пустой',
      differenceTitle: 'В чем отличие Тудуранта?',
      differenceText1:
        'Все остальные инструменты продуктивности фокусируются на хранении, организации и автоматизации бесконечных списков задач. Тудурант фокусируется на том, что важно: он заставляет вас завершать задачи.',
      differenceText2:
        'Тудурант использует тактики наказаний и похвалы для поддержания хороших привычек и отказа от плохого поведения. Он воздействует на примитивную часть мозга и прививает зависимость к выполнению задач по тем же принципам, по которым работает привыкание к сахару.',
      differenceText3:
        'Я прочитал более 20 книг про продуктивность и попробовал все методологии из них. Когда я провалил буквально каждую из систем продуктивности, я разбил их на составляющие, собрал из разбитых частей одну большую методологию и упростил результат. Это то, как был создан Тудурант.',
      dealTitle: 'Что требуется от вас?',
      dealText1:
        'Тудурант бесплатен первые 30 дней использования, после — примерно $5 в месяц. Это дороже, чем у конкурентов, потому что Тудурант реально работает. Если вы не получите $5 в эквиваленте продуктивности за первые 30 дней — ничего страшного, просто перестаньте пользоваться Тудурантом.',
      dealText2:
        'Вам нужно лишь начать пользоваться Тудурантом. Вам не нужно давать никакую информацию типа номера кредитной карты до окончания бесплатного периода пользования. Вам даже не нужно создавать аккаунт, если вы начнете пользоваться мобильными приложениями!',
      dealText3:
        'Единственное исключение — это если вы создадите аккаунт с девайса от Apple. Apple заставили Тудурант просить пользователей начать бесплатную подписку на iOS до того, как люди могут начать пользоваться сервисом. Чтобы обойти это ограничение, сначала создайте аккаунт здесь, на сайте — а потом зайдите в этот аккаунт через iOS приложение.',
    },
    googleCalendarDisableSuccess: 'Гугл Календарь успешно отключен',
    googleCalendarEnableSuccess: 'Гугл Календарь успешно подключен',
    spread: {
      hint:
        'Выберите задачи для распределения, выберите дни для распределения, нажмите на кнопку, и выбранные задачи распределятся ровным слоем по выбранным датам',
      spreading: 'Распределяем',
      chooseTasks: 'Нажмите на задачи для распределения',
      between: 'между',
      chooseDates: 'Нажмите на даты для распределения',
    },
    level: 'Уровень',
    points: 'очков',
    pointsTillNextLevel: 'очков до следующего уровня',
    accept: 'Принять',
    delegate: {
      title: 'Делегирование',
      noDelegators:
        'У вас пока что нет людей, которые могут делегировать вам задачи. Передайте ссылку выше людям, которым доверяете — и они смогут делегировать вам задачи.',
      noDelegates:
        'У вас пока что нет людей, которым вы можете делегировать задачи. Получите ссылку-приглашение от человека, которому хотите начать делегировать задачи.',
      noDelegatedTasks:
        'Пока что у вас нет новых задач, которые вам делегировали.',
      link: 'Ссылка-приглашение',
      linkDescription:
        'Делитесь этой ссылкой только с людьми, которым вы доверяете. Пройдя по этой ссылке, человек сможет начать делегировать вам задачи. Этот человек не сможет увидеть никакие задачи, кроме тех, которые делегировал вам.',
      resetConfirmation:
        'Уверены, что хотите сбросить ссылку-приглашение? Существующая ссылка больше не будет работать!',
      delegators: 'Пользователи, которые делегируют вам задачи',
      delegates: 'Пользователи, которым вы делегируете задачи',
      inviteSuccess:
        'Получилось! Теперь вы можете делегировать задачи этому пользователю.',
      inviteConfirm:
        'Вы точно хотите стать делегатором этому пользователю и получить возможность делегировать задачи?',
      deleteDelegateConfirmation:
        'Вы точно хотите убрать этого делегата из списка? Вы больше не сможете делегировать задачи этому пользователю.',
      deleteDelegatorConfirmation:
        'Вы точно хотите убрать этого делегатора из списка? Этот пользователь больше не сможет делегировать вам задачи.',
      pickDelegateField: 'Делегировать',
      noDelegatorsShort:
        'У вас пока что нет людей, которые могут делегировать вам задачи',
    },
    epic: {
      intoEpic: 'Сделать эпиком',
      epicGoal: 'Цель эпика',
    },
    success: 'Успех!',
    notLogginedBody: 'Пожалуйста, войдите в аккаунт на ',
  },
  ua: {
    encryption: {
      info:
        'Використовуйте цю секцію з максимальною обережністю! Шифрування не працюватиме, якщо ви не введете пароль. Далі буде два типи задач: зашифровані та незашифровані. Всі нові задачі будуть зашифрованими. Старі задачі можна буде зашифрувати, натиснувши на кнопку нижче. Якщо ви втратите пароль, відновити задачі буде неможливо.',
      switch: 'Шифрувати задачi',
      password: 'Пароль',
      encryptAllButton: 'Зашифрувати всі',
      decryptAllButton: 'Розшифрувати всі',
      confirm:
        'Впевнені, що хочете шифрувати всі задачі паролем? Ви зможете розшифрувати задачі цим же паролем. Якщо ви втратите пароль, у вас не вийде розшифрувати задачі!',
      disableConfirm:
        'Впевнені, що хочете прибрати пароль і вимкнути шифрування? Це дія не розшифрує зашифровані задачі.',
      errorDecrypting: 'Неправильний пароль розшифровки',
      repeatPassword: 'Повторіть пароль',
      title: 'Шифрування',
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
        'Якщо у вас є якісь питання або пропозиції, <a href="mailto:todorant@borodutch.com">напишіть мені на імейл</a>, <a href="https://t.me/borodutch" target="_blank">в Телеграм</a> або <a href="https://t.me/todorant_feedback" target="_blank">приєднуйтесь до нашої групи в Телеграмі</a>!',
    },
    loginMobile: {
      telegram: {
        headline:
          'Для входу через Telegram введіть свій Telegram ID та натисніть "Увійти". Ви можете дізнатись свій Telegram ID, написавши <code>/id</code> до <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>. Або можете відправити <code>/qr</code> до <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a> та відсканувати його в секції QR Вхід!',
        idHint: 'Телеграм ID',
        loginButton: 'Увійти',
        noCredentialsError: 'Будь ласка, вкажіть Телеграм ID',
        cannotSendMessageError:
          'Не вийшло відправити запит на логін користувачу. Будь ласка, впевніться, що ви розпочали чат з @todorant_bot і що Телеграм ID правильний',
        waiting:
          'Чекаю відповіді від <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>...',
        notAllowedError: 'Запит на вхід було відхилено',
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
      message: '🍪 Цей вебсайт використовує кукіз.',
    },
    home: {
      texts: {
        contact: [
          'Залишились запитання? Напишіть мені за адресою ',
          '. Дякую.',
        ],
      },
      signIn: 'Увійти',
      facebook: 'Увійти через Facebook',
      google: 'Увійти через Google',
      privacy: 'Політика конфіденційності',
      feedback: {
        title: 'Що кажуть користувачі?',
        reviews: [
          {
            name: 'Sergey Romanov',
            text:
              "Милі повідомлення у розділі підписки Тудуранту :) Дякую за простий сервіс, що прагне до ідеалу. Виявилося, що він допомагає бути не тільки продуктивним, але й проактивним. Маленькі покращення кожен день впевнено підтягують за собою відстаючі ланки, а вільний від задач розум постійно шукає, чим заповнити спорожнілий список задач, щоб знов і знов отримувати задоволення від їх виконання і пов'язаних з цим змін — і це прямий шлях до покращення всього, що мене оточує. Загалом, Тудурант, яким би простим він не здавався на перший погляд, здатен стати вірним соратником у будь-яких справах. Дякую, Микито, що усвідомив аспекти істинної продуктивності та поділився ними із нами у зручному рішенні. Вдячний підписник Тудуранту.",
          },
          {
            name: 'Dinislam Sad',
            text:
              'Головні плюси, які особисто мені, та і впевнений, іншим також сподобалися.\n1. Простий і зручний інтерфейс.\n2. Пропущені завдання автоматично стають жабами, а також можливість спочатку відмітити завдання "жабою".\n3. Категорія /done це просто необхідність, і дякую за це, Микито. Я юзав Тудуіст, Вундерліст, Мої Справи. Всі ці програми занадто перевантажені.\n4. Телеграм-бот.',
          },
          {
            name: 'Aleksei Kaut',
            text:
              'Після того, як створив свої перші завдання і переключився на вкладку "Поточні" — офігів від того, що переді мною тільки одне завдання і що необхідно завершити його перед тим, як іти далі. Ця ідея з єдиним завданням і концентрацією на ньому мене вразила, здавалося б очевидно, але раніше так не міг.\n\nЯ зазвичай писав в Notes завдання та ідеї, що потрібно зробити найближчим часом, але не підходив до цього як до системи. Користуюся сервісом кілька тижнів і не дуже активно, але думаю, що це дуже сильний підхід до систематизації справ і завдань.\n\nДякую за твою роботу!',
          },
          {
            name: 'Anton',
            text:
              'Протестував Тудурант. Спочатку був скепсів (дуже вже багато перепробував сервісів з планування), але зрозумів, що дійсно ефективно працює і дуже простий у використанні.\n\nПлюс, за невідомою мені причини, коли виконуються всі завдання на день і з\'являється потужна гордість і задоволення, що було відсутньо у інших сервісах планування (там було щось у форматі "ну здається все.. чи ні?").\n\nДякую за твої роботи!',
          },
          {
            name: 'Willsey Paslen',
            text:
              'Дякую за чудовий сервіс. Пройшло достатньо часу, щоб можна було точно сказати — мені від допомагає. Дякую, Микито😁. І удачі з додатком.',
          },
          {
            name: 'Ігор Малінкін',
            text:
              'З Тудурантом я почав хоч щось робити, так що моя продуктивність піднялася з 0.',
          },
          {
            name: 'Володимир Дубенко',
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
            text:
              'Я розвантажив свої завдання по роботі, програмування та хобі. Навіть цей відгук написав завдяки фокусу від Тудуранту. Всього одне завдання, та ніяких ускладнюючих пріоритетів. У цьому вся фішка сервісу — він допоміг мені сконцентруватися, та не розпорошуючись по черзі виконати таски.\n\nЗвичайно, можна проставити завдання й забити, але мені простіше повертатися до мінімалістичного додатка з однією задачею, ніж пів дня шукати в Телеграмi або Notion щоб виконакти одне завдання із сотні запланованих.\n\nОсобливо сподобалося оновлення з хештегами — тепер вся статистика як на долоні, можу трекать та ділитися з друзями скільки завдань з розробки я виконав у цьому місяці.\n\nЩиро дякую за Тудурант!',
          },
        ],
      },
      act: 'Дійте!',
      apple: 'Увійти через Apple',
      crossplatform: {
        title: 'По-справжньому крос-платформний',
      },
    },
    menu: {
      darkMode: {
        on: 'Темна тема: увімк.',
        off: 'Темна тема: вимк.',
      },
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
        more1500: 'Задачам не може мати більше 1500 символів',
      },
      invalidForm: 'Будь ласка, заповніть необхідні поля',
      report: 'Не вдалося завантажити звіт',
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
        date: 'Точний день',
        month: 'Або місяць',
        tooltip:
          'Задачі завжди мають бути: такими, які можна виконати ("Знайти найкращі квитки у Мексику на агрегаторі квитків", а не "Полетіти у Мексику"); щонайменшими і зрозумілими ("Протерти дісплей", а не "Прибратися вдома").',
        goFirst: 'Додати зверху',
      },
      list: {
        completed: 'Показати завершені',
      },
      edit: {
        title: 'Редагування',
      },
    },
    cancel: 'Скасувати',
    save: 'Зберегти',
    delete: 'Видалити',
    deleteHeadline: 'Ви впевнені, що бажаєте видалити "{name}"?',
    current: 'Поточне',
    planning: 'Планування',
    created: 'Створено',
    breakdownInfo:
      "Використовуйте розбивку, якщо поточна задача занадто об'ємна",
    howto: {
      title: 'Як користуватися Тудурантом?',
      premise:
        'Нижче описані основні принципи, яких ви повинні дотримуватися, щоб максимально продуктивно користуватися усіма функціями Тудуранту. Це просто, як 1-2-3, але на декілька кроків більше.',
      bonus: {
        title: 'Бонусні функції',
        rules: [
          'Користуйтеся клавіатурними скороченнями на десктопі! Ви можете (a) — додати, (b) — розбити, перемкнутися на (c) — поточне, відмітити як (d) — виконане і переключитися на (p) — планування.',
        ],
      },
    },
    skipped: 'Пропущено',
    subscription: {
      title: 'Підписка',
      statusText: 'Статус підписки: {status}',
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
      manage: 'Управління підпискою',
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
      startTimeOfDay: 'Початок дня',
      telegram: 'Телеграм',
    },
    allDoneTitle: 'Вітаємо!',
    allDoneText:
      '🥳 Ви зробили це! Всі завдання на сьогодні зроблено, відпочиньте або трішки потанцюйте 💃',
    noTodosTitle: 'Нумо!',
    noTodosText:
      'У Вас сьогодні немає жодних завдань. Якщо Ви хочете попрацювати—додайте нове завдання на сьогодні або візьміть завдання з майбутнього.',
    addTodoTime: 'Точний час',
    completed: 'Виконано',
    planningText:
      'Схоже, вам треба зайнятись плануванням! Будь-ласка перерозподіліть невирішені завдання, щоб розблокувати розділ "Поточне" і для того, щоб залишатися продуктивними. Удачі!',
    activeText:
      '🎉 Спасибі Вам за підтримку Todorant! Я особисто сподіваюся, що Todorant уже покращив Ваше життя і продовжуватиме його покращувати в майбутньому! Підтримка дозволяє мені щодня працювати над Todorant та додавати нові функції, що спрощують роботу та звільняють Ваш час та Ваші ресурси для чогось корисного. Ще раз дякую!',
    inactiveText:
      '🐝 Схоже, Ваше випробування Todorant закінчилося. Це неприємна мить, коли Ви повинні вирішити — чи Todorant покращив Ваше життя достатньо, щоб витратити на нього гроші, — і я повинен підштовхнути Вас до правильного рішення. Я на піку свого щастя, коли мені вдається принести цінність людям; і якщо Todorant зміг зробити Ваше життя ліпшим, я буду більш ніж вдячний, якщо Ви придбаєте підписку. Це лише 5 доларів на місяць для необмеженої плідності та вільного розуму. Кожен цент, який я заробляю на Todorant, буде витрачений на покращення служби. Підтримуючи Todorant — Ви дозволяєте мені, незалежному розробникові, постійно вдосконалювати виріб, корисний для нас усіх. Наперед дякую!',
    earlyAdopterText:
      '👏👏 — це мої оплески Вам; Ви навіжені, хто погодився випробувати інструмент постійно зростаючої плідності Todorant, серед перших. Можна сказати, що Ви — золота тисяча, відгуки якої формували Todorant із самого початку. У Вас є всі права використовувати Todorant скільки завгодно — Ви ніколи не відчуєте жодних обмежень, Ви заробили це. Однак якщо Ви помітили, що Todorant значно покращив Ваше життя — Ви все одно можете придбати підписку, це найкращий спосіб сказати "Спасибі". Ви ніколи не втратите статус "Ранній користувач 🦄" — але завжди зможете скасувати підписку. Дякую Вам за те, що Ви все ще використовуєте Todorant — я продовжуватиму додавати нові можливості, покращуючи продукт, який позитивно впливає на всіх нас. Щасти!',
    earlyAdopterTextBonus:
      '🤗 Це нереально! Схоже, що або Todorant, або я особисто допоміг Вам достатньо, щоб Ви придбали підписку, хоча Ви можете користуватися Todorant безплатно. Я глибоко зворушений і радий випити з Вами чашку кави або просто трохи поговорити. Не соромтеся зв’язатися зі мною в Telegram (@borodutch) або електронною поштою — просто натисніть моє ім’я нижче. Щиро вдячний! Важко уявити, наскільки важливий Ваш внесок!',
    trialText:
      '💪 Ласкаво просимо до Todorant! У Вас є 30 днів після реєстрації, щоб визначитися, чи добре працює Todorant для Вас. Після того, як мине 30 днів, Ви все одно отримаєте доступ до старих завдань, але не зможете додавати нові. Цілком добре придбати підписку до закінчення 30 днів. Я вірю, що використання Todorant принесе Вам нові висоти в особистій плідності!',
    rules: [
      "Щойно у вас з'являється завдання (отримаєте електронний лист, телефонний дзвінок, текст або якщо Ви побачите щось цікаве, що має бути внесено до Вашого списку завдань) — створіть його зараз. Не чекайте, бо Ви забудете про це, якщо не запишете.",
      'Завдання завжди має бути закликом до дії та щонайточнішим. Якщо завдання займає менше 2 хвилин, виконайте його відразу та позначте як виконане.',
      'Під час створення завдання Ви або вказуєте точну дату, або місяць. Ви не можете обрати поточний місяць без певної дати. Це зроблено для того, щоб розслабити Ваш мозок. Якщо Ви довіряєте системі та додаєте в неї все, що потрібно, на правильні дати — то Ви будете зустрічатися з завданнями в правильний час. Величезна кількість сили волі витрачається даремно на постійне хвилювання на зразок "тієї речі, яку мені потрібно зробити, але я точно не пам\'ятаю, що це за річ". Навчіться довіряти і відпочивати.',
      'Перше, що Ви робите щомісяця — це плануєте заздалегідь. Ви берете усі завдання, призначені на поточний місяць, і впорядковуєте їх у правильні дати. Це дозволяє відпорядкувати застарілі завдання та зберігати спокій у думках, точно знаючи, що Вам потрібно зробити цього місяця.',
      'Перше, що Ви робите вранці — це плануєте свій день. Погляньте на розділ «Планування». Ви можете впоратися з усим? Розподіліть завдання, які сьогодні не вдається виконати. Перерозподіліть будь-які завдання, які не були виконані за попередні дні.',
      "Якщо це не надзвичайна ситуація, не дивіться на розділ планування після того, як закінчили його. Психологічно буде набагато ліпше, якщо Ви зосередитесь лише на одному завданні, тому стежте за розділом «Поточне». Довіряйте системі, вона запам'ятовує все. Робіть свою роботу і розслабте свій розум.",
      'Розділ «Поточне» містить лише одне завдання, на якому потрібно зосередитися — більше нічого. Ви можете мати більше одного завдання на день. Кількість завдань, а також смуга виконання відображаються для Вашої зручності. Вам не дозволяється стрибати між завданнями — Ви повинні виконувати кожне завдання по черзі.',
      'Жаби — це особливий вид завдань, які Ви не хочете робити. Зазвичай, це завдання, які Ви не робите місяцями і навіть роками. Todorant змушує Вас розбиратися насамперед з жабами  кожен день. Вранці ваші запаси сили волі чималі, щоб впоратися навіть з найнеприємнішими завданнями. А після перемоги над жабою Ви отримаєте достатній заряд щастя, щоб сяяти усмішкою весь день. Ви будете собою пишатися, що нарешті справляєтеся з жабами.',
      'Ви можете пропустити поточне завдання — але намагайтеся робити це якомога рідше. Не можна пропустити жабу. Якщо Ви не виконали завдання і довелося перерозподілити його двічі, воно стає жабою.',
      "Якщо поточне завдання занадто високого рівня, то розбийте його на список підзавдань. Тільки-но Ви розіб'єте його, завдання позначається як виконане.",
      'Додайте якомога більше відповідних відомостей про завдання. Додайте посилання на конкретні електронні листи (gmail в Інтернеті дозволяє це зробити), вебсайти, записки (наприклад, evernote), документи (наприклад, DropBox), залишайте номери телефонів або додайте будь-які відомості, які можуть знадобитися для виконання завдання. Todorant не повинен бути головним сховищем і текою Ваших даних, але має бути місцем, де посилання на необхідні для завдань дані зберігаються одразу з певними завданнями.',
      'Не соромтеся приєднатись до нашої багатомовної групи у Telegram, щоб поділитися досвідом та підказками щодо підвищення плідності — @todorant_feedback! Ваші відгуки про сервіс — пропозиції, побажання та скарги — дуже корисні.',
      'Використовуйте режим редагування (значок порядку переліку вгорі) в розділі «Планування», щоб змінити порядок завдання. Якщо Ви хочете призначити завдання певному тижню, просто призначте його на понеділок і перерозподіліть його на етапі планування у вранішній понеділок.',
      'У Todorant немає і ніколи не буде повторюваних завдань — єдине, на що вони добре роблять, так це викликають занепокоєння, навішуючи над Вами невиконані завдання. Якщо Вам потрібно виконати повторювані завдання — додайте їх уручну, Ваш мозок буде вдячний Вам за свідомі завдання.',
      'Todorant не має поняття "Проєкти", бо воно показало себе демотивуючим, деякі з "тек" ніколи не будуть відкриті. Проєктам "Фітнес" та "Самовдосконалення" передаються «вітання». Натомість використовуйте #хештеги.',
      'Жаби завжди з’являються у верхній частині списку.',
      'У Тудуранте немає нагадувань про завдання з точним часом. Однак ви можете включити інтеграцію з Гугл Календарем, щоб вам набридав нотифікації Гугл, а не Тудурант.',
    ],
    earlyAdopter: 'Ранній користувач 🦄',
    active: 'Задіяна',
    inactive: 'Незадіяна',
    trial: 'Випробування',
    weekday1: 'Понеділок',
    weekday2: 'Вівторок',
    weekday3: 'Середа',
    weekday4: 'Четвер',
    weekday5: 'П’ятниця',
    weekday6: 'Субота',
    weekday0: 'Неділя',
    introTitle: 'Ласкаво просимо!',
    introButton: 'Вступне повідомлення',
    intro1:
      'Най буде коротко: Ви хочете підвищити свою плідність. Todorant може вам допомогти. Але Todorant — це не інший список завдань — це система, якої потрібно дотримуватися, це спосіб життя, це звичка.',
    intro2:
      'Прочитавши розділ "Як користуватися Todorant" у налаштуваннях, Ви зможете щонайкраще користуватися Todorant, але це не обов\'язково. Todorant допоможе Вам, обмежуючи Ваші дії — він навчатиме ваш мозок отримувати задоволення від виконання завдань.',
    intro3:
      'Якщо у Вас є питання щодо чогось на екрані, спочатку торкніться кнопки "i" у верхньому правом кутку екрана. Не знаєте, що робить кнопка?',
    intro4:
      'Торкніться "i"! Тудурант безкоштовний перший місяць, а потім коштує приблизно $5/місяць. Причина, через яку Тудурант може виглядати дорогим — це те, що ви не купуєте черговий менеджер завдань, а підписуєтеся на систему, яка змушує вас нарешті ці завдання виконувати. Інші додатки закидають вас функціями та налаштуваннями — Тудурант натомість змушує вас нарешті почати виконувати завдання і досягати цілей! Зрештою, спробуйте Тудурант перші 30 днів та оплатіть підписку, якщо ви отримаєте більше $5 користі.',
    intro5:
      'Я вітаю вас на вашому шляху продуктивності, так почнеться ж нова ера вашому житті!',
    introBack: 'Ходімо!',
    soundEffects: 'Звукові ефекти',
    emptyHashtags:
      'Список хештегів поки що порожній. Додайте свою першу задачу з #хештегом, щоб додати сюди першу позицію!',
    refreshRequest:
      'Доступна нова версія Тудуранта. Будь ласка, поновіть сторінку, щоб отримати нові блискучі функції 🦄',
    refresh: 'Оновити',
    homeShort: {
      headline: 'Системи продуктивності не працюють.',
      headline2: 'Тудурант працює.',
      feature1: 'Фокусуйтеся на одному завданню за раз',
      feature2: 'Додавайте дату або місяць кожного завдання',
      feature3: 'Робіть неприємні завдання (жаби) на початку дня',
      feature4: 'Тримайте папку "вхідні" порожній',
      differenceTitle: 'У чому відмінність Тудуранта?',
      differenceText1:
        'Всі інші інструменти продуктивності фокусуються на зберіганні, організації та автоматизації нескінченних списків завдань. Тудурант фокусується на тому, що важливо: він змушує вас завершувати завдання.',
      differenceText2:
        'Тудурант використовує тактики покарань і похвали для підтримки хороших звичок і відмови від поганої поведінки. Він впливає на примітивну частина мозку і прищеплює залежність до виконання завдань за тими ж принципами, за якими працює звикання до цукру.',
      differenceText3:
        'Я прочитав більше 20 книг про продуктивність і спробував все методології з них. Коли я провалив буквально кожну з систем продуктивності, я розбив їх на складові, зібрав з розбитих частин одну велику методологію і спростив результат. Це те, як був створений Тудурант.',
      dealTitle: 'Що потрібно від вас?',
      dealText1:
        'Тудурант безкоштовний перші 30 днів використання, після — приблизно $5 в місяць. Це дорожче, ніж у конкурентів, тому що Тудурант реально працює. Якщо ви не отримаєте $5 в еквіваленті продуктивності за перші 30 днів — нічого страшного, просто перестаньте користуватися Тудурантом.',
      dealText2:
        'Вам потрібно лише почати користуватися Тудурантом. Вам не потрібно давати жодної інформації типу номера кредитної карти до закінчення безкоштовного періоду користування. Вам навіть не потрібно створювати аккаунт, якщо ви почнете користуватися мобільними додатками!',
      dealText3:
        'Єдиний виняток — це якщо ви створите аккаунт з девайса від Apple. Apple змусили Тудурант просити користувачів почати безкоштовну передплату на iOS до того, як люди можуть почати користуватися сервісом. Щоб обійти це обмеження, спочатку створіть акаунт тут, на сайті — а потім зайдіть в цей акаунт через iOS додаток.',
    },
    googleCalendarDisableSuccess: 'Гугл Календар успішно відключений',
    googleCalendarEnableSuccess: 'Гугл Календар успішно підключений',
  },
  it: {
    encryption: {
      info:
        'Usa questa sezione con la massima cautela! La crittografia non funzionerà se non si aggiunge una password. Esistono due tipi di attività: crittografate e non crittografate. Tutte le nuove attività saranno crittografate. I vecchi compiti possono essere convertiti per essere crittografati con il pulsante in basso. Se perdi la password non ci sarà modo di recuperare le attività.',
      switch: 'Attività criptate',
      password: 'Password',
      encryptAllButton: 'Cripta tutto',
      decryptAllButton: 'Decrepita tutto',
      confirm:
        'Sei sicuro di voler crittografare le attività con questa password? Sarai in grado di decifrare attività in seguito con la stessa password. Se perdi la password, non sarai in grado di decriptare le attività!',
      disableConfirm:
        'Sei sicuro di voler rimuovere la password e disabilitare la crittografia? Questo non decripterà le attività che sono state criptate.',
      errorDecrypting: 'Password di decriptazione errata',
      repeatPassword: 'Ripetere la password',
      title: 'Crittografia',
    },
    search: 'Ricerca',
    qr: {
      code: 'Codice QR',
      description:
        'Usa questo codice QR per accedere sui dispositivi mobili. Questa immagine è una password, non condividerla con nessuno!',
    },
    breakdown: {
      request:
        "Sembra che tu abbia spostato troppo questo compito. Si prega di scomporlo, non è più possibile spostarlo in un'altra data. Credimi, aiuterà a completare l'attività!",
      button: 'Arresto',
    },
    warning: 'Avviso',
    hashtags: {
      title: 'Hashtags',
    },
    supportAlert: {
      title: 'Supporto',
      text:
        'Se hai delle domande o dei suggerimenti, sentiti libero di <a href="mailto:todorant@borodutch.com">mandarmi un\'email</a>, <a href="https://t.me/borodutch" target="_blank">scrivermi su Telegram</a> oppure <a href="https://t.me/todorant_feedback" target="_blank">entrare nel gruppo Telegram della nostra community</a>!',
    },
    loginMobile: {
      telegram: {
        headline:
          'Prego, accedi con Telegram inserendo il tuo ID Telegram e premendo il bottone "Login". Puoi ottenere il tuo ID Telegram inviando <code>/id</code> su <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>. Oppure puoi anche semplicemente inviare <code>/qr</code> a <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a> e scansionare la foto nella sezione login con codice QR!',
        idHint: 'ID Telegram',
        loginButton: 'Login',
        noCredentialsError: 'Per favore, inserisci un ID Telegram',
        cannotSendMessageError:
          "Impossibile inviare la richiesta di accesso all'utente. Assicurati di aver avviato @todorant_bot e che l'ID di Telegram sia corretto.",
        waiting:
          'In attesa della risposta su <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>...',
        notAllowedError: 'Richiesta di login respinta',
      },
    },
    noReport: {
      title: 'Ancora nessun dato',
      text: 'Vai, completa la tua prima attività e torna!',
    },
    report: {
      title: 'Statistiche',
      tasksCompleted: 'Attività completate',
      frogsCompleted: 'Rane completate',
      share: 'Condividi questi dati!',
      hashtag: 'Hashtag',
      shareButton: 'Condividi',
      url: 'Link permanente a questi dati',
      shareMessage: 'Guarda le statistiche della mia produttività da Todorant!',
      call: 'Vuoi iscriverti?',
      callButton: 'Iscriviti a Todorant',
      startDate: "Data d'inizio",
      endDate: 'Data di fine',
    },
    title: 'Todorant',
    cookie: {
      button: 'Ho capito!',
      message: '🍪 Questi sito utilizza cookies.',
    },
    home: {
      texts: {
        contact: [
          'Hai ancora domande? Contattami direttamente a ',
          '. Grazie.',
        ],
      },
      act: 'Agire!',
    },
    todo: {
      create: {
        placeholder: 'Attività',
        frog: 'È una rana!',
      },
    },
    cancel: 'Annulla',
    save: 'Salva',
    delete: 'Elimina',
    current: 'Corrente',
    planning: 'Pianificazione',
    skipped: 'Saltato',
    allDoneTitle: 'Congratulazioni!',
    allDoneText:
      "🥳 Ce l'hai fatta! Le attività di oggi son state completate, riposati o balla un po' 💃",
    noTodosTitle: "Verso l'infinito!",
    noTodosText:
      "Non hai attività per oggi. Se vuoi fare qualcosa aggiungi un'attività per oggi o fai quelle dei prossimi giorni.",
    addTodoTime: 'Ora esatta',
    completed: 'Completato',
    planningText:
      'Sembra che tu abbia qualche programmazione da fare! Per favore, ridistribuisci i compiti in sospeso qui sotto per sbloccare la scheda "Corrente" e continuare ad essere produttivo. Buona fortuna!',
    activeText:
      '🎉 Grazie mille per aver sostenuto Todorant! Personalmente spero che Todorant abbia già migliorato la tua vita e che continui a migliorarla in futuro! Il tuo sostegno mi permette di lavorare quotidianamente su Todorant e di aggiungere nuove funzionalità che semplificano il lavoro e liberano il tuo tempo e le tue risorse cognitive. Grazie mille, ancora una volta!',
    inactiveText:
      "🐝 Sembra che il tuo periodo di prova di Todorant sia giunto al termine. Questo è il momento imbarazzante in cui dovrai decidere — se il Todorant ha migliorato la tua vita abbastanza da permetterti di spendere soldi per questo — e io devo indirizzarti verso la decisione giusta. Sono all'apice della felicità quando sono in grado di portare valore alle persone; e se Todorant è stato in grado di migliorare la vostra vita, vi sarò più che grato se acquisterete l'abbonamento. Sono solo 5 dollari al mese per la produttività illimitata e la mente libera. Ogni centesimo che guadagno su Todorant sarà speso per migliorare il servizio. Sostenendo Todorant — permettete a me, sviluppatore indipendente, di continuare a migliorare il prodotto che ci avvantaggia tutti di giorno in giorno. Grazie mille in anticipo!",
    earlyAdopterText:
      '👏👏 — questo sono io che vi applaudo; voi — i pazzi che hanno accettato di provare lo strumento della produttività sempre crescente, Todorant, tra i primi. Si può dire che voi siete i pionieri, il cui feedback ha plasmato il Todorant fin dall\'inizio. Avete tutti i diritti di usare il Todorant quanto volete: non avrete mai limiti, ve lo siete guadagnato. Tuttavia, se avete notato che il Todorant ha drasticamente migliorato la vostra vita — potete comunque acquistare l\'abbonamento dicendo così il miglior tipo di "Grazie". Non perderete mai lo stato di "Early adopter 🦄" — ma potrete sempre annullare l\'abbonamento. Vi ringrazio molto per l\'utilizzo di Todorant — e continuerò ad aggiungere nuove funzionalità che migliorano il prodotto e che hanno un effetto positivo su tutti noi. Buona fortuna!',
    earlyAdopterTextBonus:
      "🤗 Accidenti! Sembra che io o Todorant vi abbiamo aiutato abbastanza da farvi acquistare l'abbonamento, anche se potreste usare Todorant gratuitamente per sempre. Sono profondamente commosso e felice di prendere una tazza di caffè con voi o di chiacchierare un po'. Sentitevi liberi di contattarmi su Telegram (@borodutch) o via e-mail — basta cliccare sul mio nome qui sotto. Grazie mille! È difficile immaginare quanto sia importante il vostro contributo!",
    trialText:
      "💪 Benvenuti in Todorant! Avete 30 giorni di tempo dopo la registrazione per capire se Todorant funziona bene per voi. Trascorsi i 30 giorni, avrete ancora accesso ai vecchi compiti, ma non potrete aggiungerne di nuovi. Va benissimo acquistare l'abbonamento prima della fine dei 30 giorni. Ritengo che l'utilizzo di Todorant vi porterà nuove vette nella produttività personale!",
    rules: [
      "Non appena ricevi un compito realizzabile (ricevere un'e-mail, una telefonata, un testo o se vedi qualcosa di interessante che deve essere messo nella tua lista delle cose da fare) — crea subito una cosa da fare. Non aspettate, ve ne dimenticherete se non lo togliete.",
      "Le attività dovrebbero essere sempre realizzabili e il più possibile esplicite. Se un'attività richiede meno di 2 minuti, allora fatela subito e registratela come completata.",
      "È possibile aggiungere una data specifica o selezionare un mese durante la creazione di un'attività. Non è possibile scegliere il mese corrente senza selezionare una data specifica. Questo viene fatto per rilassare la mente. Se vi fidate del sistema e mettete tutto ciò che deve essere fatto nella data corretta — lo incontrerete al momento giusto. Si spreca un'enorme quantità di forza di volontà per essere costantemente stressati da \"quell'altra cosa di cui ho bisogno di occuparmi, ma non sono del tutto sicuro di cosa fosse\". Impara a fidarti e a rilassarti.",
      'La prima cosa da fare ogni mese è pianificare in anticipo. Prendete tutti i compiti assegnati al mese in corso e ordinateli nelle date corrette. Questo vi permette di filtrare i compiti obsoleti e di mantenere la mente serena, sapendo esattamente cosa dovete fare questo mese.',
      'La prima cosa da fare la mattina è pianificare la giornata. Guardate la sezione Pianificazione. Siete in grado di gestire tutto? Distribuite i compiti che non possono essere svolti oggi. Ridistribuite tutti i compiti lasciati in sospeso dai giorni precedenti.',
      "A meno che non si tratti di un'emergenza, non guardate la sezione di pianificazione dopo aver finito di pianificare. Sarà molto meglio psicologicamente se vi concentrerete su un solo compito, quindi tenete d'occhio la sezione Corrente. Fidatevi del sistema, ricorda tutto. Fate il vostro lavoro e rilassate la mente.",
      "La sezione corrente contiene un solo compito sul quale è necessario concentrarsi — nient'altro. È possibile avere più di un compito al giorno, la quantità di compiti così come la barra di avanzamento viene visualizzata per comodità. Non è consentito saltare da un compito all'altro: ogni compito deve essere affrontato in modo lineare, uno per uno.",
      'Le rane sono tipi speciali di compiti che in genere non si vogliono affrontare. Di solito sono i compiti lasciati per mesi e persino anni. Todorant fa in modo di gestire le rane come prima cosa ogni giorno. Al mattino la vostra riserva di forza di volontà è abbastanza grande da poter gestire anche i compiti più oltraggiosi. E dopo aver finalmente a che fare con una rana — si riceve la felicità sufficiente per sorridere per tutto il giorno. Vi sentite orgogliosi di voi stessi quando avete a che fare con le rane.',
      "È consentito saltare l'attività corrente — ma cercate di farlo il più raramente possibile. Non si può saltare una rana. Se non riuscite a completare un compito e dovete ridistribuirlo due volte, diventa una rana.",
      "Se l'attività corrente è di livello troppo alto, allora scomporla in una lista di sottoattività. Non appena la si suddivide, l'attività viene contrassegnata come completata.",
      "Aggiungete quante più informazioni rilevanti possibili sulle cose da fare. Aggiungete link a specifiche e-mail (gmail sul web vi permette di farlo), siti web, note (come evernote), documenti (come dropbox), lasciate numeri di telefono o aggiungete tutte le informazioni necessarie per completare l'operazione. Todorant non vuole essere un punto di riferimento per voi, ma dovrebbe agire da catalogo di link alle informazioni di riferimento relative a specifiche attività.",
      'Sentitevi liberi di unirvi al nostro gruppo multilingue su Telegram per condividere esperienze e trucchi su come essere più produttivi — @todorant_feedback! I vostri commenti sul servizio — suggerimenti, desideri e reclami — sono benvenuti.',
      "Utilizzare la modalità di modifica (l'icona dell'ordine di lista in alto) nella pagina di pianificazione per modificare l'ordine delle attività. Se si desidera assegnare un compito ad una settimana specifica, è sufficiente assegnarlo al lunedì e riassegnarlo durante la fase di pianificazione il lunedì mattina.",
      "Todorant non ha e non avrà mai compiti ricorrenti — l'unica cosa che fanno bene è causare ansia che ricade su di voi come compiti incompiuti. Se avete bisogno di completare i compiti ripetuti — aggiungeteli tutti manualmente, il vostro cervello vi ringrazierà per averci pensato.",
      'Todorant non ha il concetto di "Progetti" in quanto ha dimostrato di essere demotivante, alcune delle "cartelle" non si aprono mai. I progetti "Fitness" e "Automiglioramento" mandano i loro saluti. Usa invece gli #hashtag.',
      'Le rane appariranno sempre in cima alla lista.',
      "Todorant non dispone di notifiche sui prossimi compiti con l'ora esatta impostata. Tuttavia, sentitevi liberi di utilizzare l'integrazione di Google Calendar in modo che Google possa infastidirvi con le notifiche, non Todorant.",
    ],
    earlyAdopter: 'Pioniere 🦄',
    active: 'Attivo',
    inactive: 'Inattivo',
    trial: 'Prova',
    weekday1: 'Lunedì',
    weekday2: 'Martedì',
    weekday3: 'Mercoledì',
    weekday4: 'Giovedì',
    weekday5: 'Venerdì',
    weekday6: 'Sabato',
    weekday0: 'Domenica',
    introTitle: 'Benvenuto!',
    introButton: 'Messaggio di benvenuto',
    intro1:
      "Facciamola breve: volete migliorare la vostra produttività. Todorant può aiutarvi. Ma Todorant non è un'altra lista di compiti — è un sistema da seguire, è uno stile di vita, è un'abitudine.",
    intro2:
      'Leggere la sezione "Come usare Todorant" nelle impostazioni vi aiuterà ad ottenere il massimo dal Todorant, ma non è necessario. Todorant vi aiuterà a limitare le vostre azioni — allenerà il vostro cervello per ottenere soddisfazione dal completamento dei compiti.',
    intro3:
      'Se avete domande su qualcosa su una schermata, toccate prima il tasto "i" in alto a sinistra dello schermo. Non siete sicuri di cosa fa un pulsante? Toccate "i"!',
    intro4:
      "Todorant è gratuito per i primi 30 giorni, poi saranno 5 dollari al mese. Il motivo per cui può sembrare un po' caro è che non state pagando per un'altra app da fare, state acquistando la produttività — l'intero sistema che non vi fa sprofondare nelle impostazioni e nelle funzioni, ma vi fa completare i compiti! Dopo tutto, provate Todorant per 30 giorni gratuitamente e aggiornate se ottenete più di 5 dollari di valore dal suo utilizzo.",
    intro5:
      'Vi do il benvenuto nel viaggio della produttività, che la nuova era della vostra vita abbia inizio!',
    introBack: 'Andiamo!',
    soundEffects: 'Effetti sonori',
    emptyHashtags:
      "L'elenco degli hashtag è vuoto per ora. Create il vostro primo compito con un #hashtag per aggiungere il primo hashtag qui!",
    refreshRequest:
      'È disponibile una nuova versione di Todorant. Si prega di aggiornare la pagina per ottenere il nuovo materiale lucido 🦄',
    refresh: 'Aggiorna',
    homeShort: {
      headline: 'I sistemi di produttività falliscono.',
      headline2: 'Todorant funziona.',
      feature1: 'Concentrarsi su un compito alla volta',
      feature2: "Aggiungere sempre una data o un mese a un'attività",
      feature3: 'Completare prima i compiti sgradevoli',
      feature4: 'Tieni vuota la tua casella di posta in arrivo',
      differenceTitle: 'Qual è la differenza?',
      differenceText1:
        "Tutte le altre app per la produttività si concentrano sull'archiviazione, l'organizzazione e l'automazione di liste infinite di attività. Todorant si concentra sull'unica cosa che conta: ti fa completare i compiti.",
      differenceText2:
        'Todorant usa una serie di limiti e di elogi accuratamente studiati per punire i cattivi comportamenti e sostenere le buone abitudini. Colpisce la parte primitiva del cervello per fargli desiderare di completare i todos come le persone desiderano lo zucchero.',
      differenceText3:
        'Ho letto e provato più di 20 libri e metodologie di produttività. Quando tutti hanno fallito uno ad uno ho combinato i loro componenti e semplificato il risultato. È così che è stato creato il Todorant.',
      dealTitle: 'Qual è il motivo?',
      dealText1:
        'Il Todorant è gratuito per i primi 30 giorni e poi è di 5 dollari al mese. È più costoso della concorrenza perché funziona. Se non ottenete 5 dollari di produttività nei primi 30 giorni della prova gratuita, siete invitati a non continuare a usare il Todorant.',
      dealText2:
        'Nessun vincolo. Non è necessario che ci fornisca alcuna informazione, come una carta di credito, prima della fine della prova. Non avete nemmeno bisogno di un account se installate le app mobili!',
      dealText3:
        "L'unica eccezione è che se ti iscrivi su iOS, Apple ci ha obbligato a farti fare una prova gratuita prima che tu possa usare l'app. Il modo per evitare questo limite è quello di creare un account qui, sul sito web, e poi accedere all'app per iOS",
    },
    googleCalendarDisableSuccess: 'Google Calendar disabilitato',
    googleCalendarEnableSuccess: 'Google Calendar abilitato',
  },
  'pt-BR': {
    encryption: {
      info:
        'Use esta seção com o máximo cuidado! A criptografia não funcionará, a menos que você adicione uma senha. Haverá dois tipos de tarefas: criptografadas e não criptografadas. Todas as novas tarefas serão criptografadas. Todos as antigas podem ser convertidas para criptografadas com o botão abaixo. Se você perder a senha, não haverá como recuperar as tarefas.',
      switch: 'Encriptar tarefas',
      password: 'Senha',
      encryptAllButton: 'Encriptar tudo',
      decryptAllButton: 'Descriptografar tudo',
      confirm:
        'Tem certeza de que deseja criptografar as tarefas com esta senha? Você poderá descriptografar todos mais tarde com a mesma senha. Se você perder a senha, não poderá descriptografar as tarefas!',
      disableConfirm:
        'Tem certeza de que deseja remover a chave e desativar a criptografia? Isso não descriptografará as tarefas criptografadas.',
      errorDecrypting: 'Senha de descriptografia incorreta',
      repeatPassword: 'Repita a senha',
      title: 'Criptografia',
    },
    search: 'Procurar',
    qr: {
      code: 'QR code',
      description:
        'Use este QR Code para fazer login em dispositivos móveis. Esta imagem é uma senha, não a compartilhe com ninguém!',
    },
    breakdown: {
      request:
        'Parece que você está movendo muito essa tarefa. Por favor, divida-o, pois você não poderá mais movê-lo para outra data. Acredite, isso ajudará a você concluir a tarefa!',
      button: 'Decompor',
    },
    warning: 'Cuidado',
    hashtags: {
      title: 'Hashtags',
    },
    supportAlert: {
      title: 'Ajuda',
      text:
        'Se você tem qualquer dúvida ou sugestão, sinta-se a vontade para <a href="mailto:todorant@borodutch.com">enviar-me um email</a>, <a href="https://t.me/borodutch" target="_blank">contact me on Telegram</a> ou<a href="https://t.me/todorant_feedback" target="_blank">entrar na nossa comunidade no Telegram</a>!',
    },
    loginMobile: {
      telegram: {
        headline:
          'Faça o login no Telegram digitando seu Telegram ID no campo abaixo e clicando no botão "Login". Você pode obter seu Telegram ID enviando<code>/id</code> para o <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>. Ou você pode simplesmente enviar <code>/qr</code> para <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a> e scan isto na seção de QR Login!',
        noCredentialsError: 'Por favor, forneça um ID Telegram',
        cannotSendMessageError:
          'Não foi possível enviar a solicitação de login para o usuário. Verifique se você iniciou o @todorant_bot e se o ID do Telegram está correto.',
        waiting:
          'Aguardando a resposta em<a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>...',
        notAllowedError: 'Login foi rejeitado',
      },
    },
    noReport: {
      title: 'Nenhum dado ainda',
      text: 'Vá em frente, complete o seu primeiro trabalho e volte aqui!',
    },
    report: {
      title: 'Estatísticas',
      tasksCompleted: 'Tarefas completadas',
      frogsCompleted: 'Sapos completados',
      share: 'Compartilhe este relatório',
      hashtag: 'Hashtag',
      shareButton: 'Compartilhar',
      url: 'Link permanente para este relatório',
      shareMessage: 'Confira meu relatório de produtividade do Todorant!',
      call: 'Quer se juntar?',
      callButton: 'Junte-se a Todorant',
      startDate: 'Data inicial',
      endDate: 'Data final',
    },
    cookie: {
      button: 'Entendi!',
      message: '🍪 Este website usa cookies.',
    },
    home: {
      texts: {
        contact: [
          'Ainda tem perguntas? Entre em contato comigo diretamente em',
          '. Muito Obrigado.',
        ],
      },
      signIn: 'Acessar',
      facebook: 'Conecte-se com Facebook',
      google: 'Conecte-se com Google',
      privacy: 'Política de Privacidade',
      feedback: {
        title: 'O que os usuários dizem?',
        reviews: [
          null,
          null,
          null,
          null,
          null,
          {
            text:
              'Comecei a fazer pelo menos alguma coisa com Todorant, por isso a minha produtividade subiu de 0.',
          },
        ],
      },
      act: 'Agir!',
      apple: 'Conecte-se com Apple',
    },
    menu: {
      darkMode: {
        on: 'Modo escuro: ativado',
        off: 'Modo escuro: desativado',
      },
      logout: 'Sair',
    },
    support:
      'Algo não está claro? Entre em contato comigo em<a target="_blank" href="mailto:n@borodutch.com">n@borodutch.com</a>',
    errors: {
      login: {
        facebook: 'Não foi possível conectar com Facebook',
        google: 'Não foi possível conectar com Google',
        telegram: 'Não foi possível conectar com Telegram',
        apple: 'Não foi possível conectar com Apple',
      },
      internal: 'Erro do Servidor Interno',
      loadTodos: 'Não foi possível buscar as tarefas',
      todo: {
        textLenght: 'As tarefas devem ter texto',
        dateOrMonth: 'Tarefas devem ter data ou mês definidos',
        more1500: "L'attività non può contenere più di 1500 caratteri.",
      },
      invalidForm: 'Por favor, preencha os campos obrigatórios',
      report: 'Não foi possível carregar o relatório',
      appleFirefox:
        'Infelizmente, existe <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1628361"> um bug </a> com o login da Apple no Firefox. Até que seja resolvido, use outros navegadores da Web para fazer login na Apple — e depois mescle com outras contas sociais no Todorant. Desculpe pela inconveniência.',
    },
    close: 'Fechar',
    notFound: 'Página não encontrada',
    todo: {
      create: {
        title: 'Adicionar tarefas',
        text: 'Texto da tarefa',
        textHint: 'Você pode adicionar um link para um email ou site',
        placeholder: 'Tarefa',
        frog: 'Isto é um sapo!',
        date: 'Dia exato',
        month: 'Ou mês',
        tooltip:
          'As tarefas devem sempre ser: praticáveis ("Encontre os melhores voos para o México" vs "Vá para o México"); o mais pequeno e exato possível ("Tire o pó dos monitores" vs "Limpe a casa").',
        goFirst: 'Adicione no topo',
      },
      list: {
        completed: 'Mostrar concluído',
      },
      edit: {
        title: 'Editar',
      },
    },
    cancel: 'Cancelar',
    save: 'Salvar',
    delete: 'Apagar',
    deleteHeadline: 'Tem certeza de que deseja excluir "{name}"?',
    current: 'Atual',
    planning: 'Planejamento',
    created: 'Criada',
    breakdownInfo:
      'Use a função decompor quando a tarefa atual for muito extensa',
    howto: {
      title: 'Como usar Todorant?',
      premise:
        'Abaixo estão os principais princípios que você deve seguir para explorar produtivamente todos os recursos fornecidos pela Todorant. É fácil como 1-2-3... Apenas com mais algumas etapas.',
      bonus: {
        title: 'Recursos bônus',
        rules: [
          'Use Atalhos de teclado quando estiver no desktop! Você pode (a) adicionar, (b) decompor, (c) alternar para atual, (d) marcar como feito e alternar para (p)lanejamento. Para adicionar uma tarefa adicional ao adicionar tarefas, você pode usar Ctrl+Shift+A.',
        ],
      },
    },
    skipped: 'Pular',
    subscription: {
      title: 'Inscrição',
      statusText: 'Status da inscrição: {status}',
      signature: 'Nikita Kolmogorov, criador do Todorant',
      daysLeft: '(dias restantes: {daysLeft})',
      '5dollars': '$5/mês',
      '50dollars': '$50/ano',
      success: 'Você se inscreveu com sucesso!',
      payment: {
        success:
          '✅ Você está pronto! Desfrute de uma experiência ilimitada com Todorant 💪',
        failure:
          '✋ Espere, algo deu errado. Talvez você possa tentar novamente? 😳',
        back: 'Volte para a produtividade!',
      },
      cancel: 'Cancelar assinatura',
    },
    moveUp: 'Mover para hoje',
    settings: {
      title: 'Definições',
      showTodayOnAddTodo: 'O padrão é hoje ao criar uma tarefa',
      firstDayOfWeek: 'Primeiro dia da semana',
      newTodosGoFirst: 'Novas tarefas são adicionadas no topo da lista',
      preserveOrderByTime: 'Preservar a hora exata',
      general: 'Geral',
      integrations: 'Integrações',
      connected: 'Conectado',
      notConnected: 'Não conectado',
      googleCalendar: 'Google Agenda',
      disconnectConfirm: 'Tem certeza de que deseja desconectar este serviço?',
      account: 'Conta',
      startTimeOfDay: 'Início do dia',
    },
    allDoneTitle: 'Parabéns!',
    allDoneText:
      '🥳 Você Conseguiu! Todas as tarefas de hoje estão concluídas, para descansar ou, quem sabe, dançar um pouco 💃',
    noTodosTitle: 'Ao infinito!',
    noTodosText:
      'Você não tem nenhuma tarefa pra hoje. Se você quiser trabalhar — adicione uma nova tarefa ou pegue uma tarefa futura.',
    addTodoTime: 'Horario exato',
    completed: 'Feito',
    planningText:
      'Parece que vc tem um planejamento a ser feito. Distribua as tarefas pendentes abaixo para desbloquear a guia "Atual" e continuar produtivo. Felicidades!',
    activeText:
      '🎉 Muito obrigado por apoiar a Todorant! Pessoalmente, espero que a Todorant já tenha melhorado sua vida e continue melhorando no futuro! Seu suporte me permite trabalhar diariamente com Todorant e adicionar novos recursos, simplificando o trabalho e liberando seu tempo e recursos cognitivos. Muito obrigado novamente!',
    inactiveText:
      '🐝 Parece que seu teste com Todorant chegou ao fim. Este é o momento embaraçoso em que você precisa decidir — se Todorant melhorou sua vida o suficiente para investir algum dinheiro com isso — e eu tenho que levá-lo para a decisão certa. Fico no auge da minha felicidade quando sou capaz de agregar valor às pessoas; e se Todorant puder melhorar sua vida, ficarei mais do que agradecido se você comprar a assinatura. São apenas US $ 5 / mês para produtividade ilimitada e mente livre. Cada centavo que ganhar com Todorant será gasto na melhoria do serviço. Ao apoiar a Todorant — você me permite um desenvolvimento independente e continuar melhorando o produto que nos beneficia todos os dias. Muito obrigado antecipadamente!',
    earlyAdopterText:
      '👏👏 — este sou eu aplaudindo você; você — o louco que concordou em experimentar o instrumento de produtividade cada vez maior, Todorant, entre os primeiros. Pode-se dizer que você é o milhar de ouro, cujo feedback moldou o Todorant desde o início. Você tem todos os direitos para usar o Todorant o quanto desejar — você nunca experimentará nenhum limite, você o conquistou. No entanto, se você notou que o Todorant melhorou drasticamente sua vida — você ainda pode comprar a assinatura, dizendo o melhor tipo de "obrigado". Você nunca perderá o status de "Early Adopter🦄" mas sempre poderá cancelar a assinatura. Muito obrigado por ainda usar o Todorant — e continuarei adicionando novos recursos para melhorar o produto que afeta positivamente todos nós. Boa sorte!',
    earlyAdopterTextBonus:
      '🤗 Santo + *% $! Parece que Todorant ou eu pessoalmente o ajudamos o suficiente para que você tenha adquirido uma assinatura, mesmo que você possa usá-lo gratuitamente para sempre. Estou profundamente emocionado e feliz por tomar uma xícara de café com você ou apenas para conversar um pouco. Sinta-se à vontade para me contactar no Telegram (@borodutch) ou por e-mail — basta clicar no meu nome abaixo. Muito obrigado! É difícil imaginar o quão importante é a sua contribuição!',
    trialText:
      '💪Bem-vindo ao Todorant! Você tem 30 dias após o registro para descobrir se o Todorant funciona bem para você. Após 30 dias, você ainda terá acesso às tarefas antigas, mas não poderá adicionar novas. É importante você comprar uma assinatura antes do final de 30 dias. Acredito que o uso da Todorant trará novas alturas na produtividade pessoal!',
    rules: [
      'Assim que você receber uma tarefa acionável (receber um e-mail, uma chamada telefônica, um texto ou se vir algo interessante que deva ser colocado na sua lista de tarefas) — crie uma tarefa para ela imediatamente. Não espere, você o esquecerá se não o fizer.',
      'Tarefas devem ser sempre acionáveis e o mais explícitos possível. Se uma tarefa demorar menos de 2 minutos, faça-a imediatamente e registre-a como concluída.',
      'Você pode adicionar uma data específica ou selecionar um mês ao criar uma tarefa. Você não pode escolher o mês atual sem selecionar uma data específica. Isso é feito para relaxar sua mente. Se você confia no sistema e coloca tudo o que precisa ser feito na data correta — você o encontrará no momento certo. Uma quantidade enorme de força de vontade é desperdiçada por estar constantemente estressado com "essa outra coisa com a qual preciso lidar, mas não tenho muita certeza do que era". Aprenda a confiar e relaxar.',
      'A primeira coisa que você faz a cada mês é planejar com antecedência. Você pega todas as tarefas atribuídas ao mês atual e as classifica nas datas corretas. Isto permite filtrar tarefas desatualizadas e manter sua mente em paz, sabendo exatamente o que você precisa fazer este mês.',
      'A primeira coisa que você faz pela manhã é planejar o seu dia. Dê uma olhada na sua seção Planejamento. Você pode lidar com tudo? Distribua as tarefas que não podem ser tratadas hoje. Redistribua todas as tarefas deixadas por fazer dos dias anteriores.',
      'A menos que seja uma emergência, não olhe para a seção de planejamento após conclui-lo. Será psicologicamente melhor se você se concentrar apenas em uma tarefa; portanto, fique de olho na seção Atual. Confie no sistema, ele se lembra de tudo. Faça seu trabalho e relaxe sua mente.',
      'A seção atual contém apenas uma tarefa na qual você precisa se concentrar — nada mais. Você pode ter mais de uma tarefa por dia, a quantidade de tarefas e a barra de progresso são exibidas para sua conveniência. Você não tem permissão para alternar entre tarefas — você deve lidar com todas as tarefas linearmente, uma por uma.',
      'Sapos são tipos especiais de tarefas com as quais você geralmente não deseja lidar. Geralmente são as tarefas deixadas para trás por meses e até anos. Todorant garante que você lide com os sapos todos os dias. De manhã, sua reserva de força de vontade é grande o suficiente para lidar com as tarefas mais desagradáveis. E depois que você finalmente lida com um sapo — você recebe felicidade suficiente para sorrir durante todo o dia. Você se sente orgulhoso quando lida com sapos.',
      'Você tem permissão para pular a tarefa atual — mas tente fazê-lo o mais raramente possível. Você não pode pular um sapo. Se você não conseguiu concluir uma tarefa e teve que redistribuí-la duas vezes, ela se tornará um sapo.',
      'Se a tarefa atual for muito difícil, divida-a em uma lista de subtarefas. Assim que você a divide, a tarefa é marcada como concluída.',
      'Adicione o máximo possível de informações relevantes sobre a tarefa. Adicione links a e-mails específicos (o Gmail Web permite fazer isso), sites, anotações (como o Evernote), documentos (como o Dropbox), deixe números de telefone ou adicione as informações necessárias para concluir a tarefa. Todorant não deve ser um ponto de referência para você — em vez disso, ele deve atuar como um catálogo de links para as informações de referência relevantes para tarefas específicas.',
      'Sinta-se à vontade para se juntar ao nosso grupo multilíngue no Telegram para compartilhar experiências e truques sobre como ser mais produtivo — @todorant_feedback! Seus comentários sobre o serviço — sugestões, desejos e reclamações — são muito bem-vindos.',
      'Use o modo de edição (o ícone da lista na parte superior) na página Planejamento para alterar a ordem das tarefas. Se você deseja atribuir uma tarefa a uma semana específica, atribua-a à segunda-feira e atribua-a novamente durante a fase de planejamento na segunda-feira de manhã.',
      'Todorant não tem e nunca terá tarefas repetidas — a única coisa que elas fazem é causar uma ansiedade pairando sobre você como tarefas inacabadas. Se você precisar concluir tarefas repetidas — adicione todas elas manualmente, seu cérebro agradecerá por tarefas conscientes.',
      'Todorant não tem o conceito de "Projetos", pois provou ser desmotivador. Algumas das "pastas" nunca se abrem. Os projetos "Fitness" e "Auto-aperfeiçoamento" enviam seus cumprimentos. Em vez disso, use #hashtags.',
      'Sapos sempre aparecerão no topo da lista.',
      'Todorant não tem notificações sobre as próximas tarefas com a hora exata definida. No entanto, sinta-se à vontade para usar a integração com o Google Agenda para que o Google possa incomodá-lo com notificações, não o Todorant.',
    ],
    earlyAdopter: 'Early adopter 🦄',
    active: 'Ativo',
    inactive: 'Intivo',
    trial: 'Trial',
    weekday1: 'Segunda',
    weekday2: 'Terça',
    weekday3: 'Quarta',
    weekday4: 'Quinta',
    weekday5: 'Sexta',
    weekday6: 'Sábado',
    weekday0: 'Domingo',
    introTitle: 'Bem vindo!',
    introButton: 'Mensagem de introdução',
    intro1:
      'Vamos resumir: você quer melhorar sua produtividade. Todorant pode ajudá-lo. Mas Todorant não é outra lista de tarefas — é um sistema que precisa ser seguido, é um estilo de vida, é um hábito.',
    intro2:
      'A leitura da seção "Como usar o Todorant" nas configurações ajudará você a tirar o máximo proveito do Todorant, mas isso não é necessário. Todorant o ajudará limitando suas ações — ele treinará seu cérebro para obter satisfação ao concluir as tarefas.',
    intro3:
      'Se você tiver dúvidas sobre algo na tela, toque primeiro no botão "i" no canto superior esquerdo da tela. Não sabe o que um botão faz? Toque em "i"!',
    intro4:
      'Todorant é gratuito nos primeiros 30 dias e depois custará US $5/mês. A razão pela qual isso pode parecer um pouco caro é que você não está pagando por outro aplicativo, está comprando produtividade — todo um sistema que não faz você afundar em configurações e funções, mas faz você concluir as tarefas! Então, experimente o Todorant por 30 dias gratuitamente e faça o upgrade se você receber mais de US$ 5 em benefícios.',
    intro5:
      'Sejam bem-vindos à jornada de produtividade. Que comece a nova era da sua vida!',
    introBack: 'Vamos lá!',
    soundEffects: 'Efeitos sonoros',
    emptyHashtags:
      'A lista de hashtags está vazia por enquanto. Crie sua primeira tarefa com uma #hashtag para adicionar a primeira hashtag aqui!',
    refreshRequest:
      'Existe uma nova versão do Todorant disponível. Atualize a página para novas e brilhantes funcionalidades 🦄',
    refresh: 'Atualizar',
    infoHero:
      'Esta é a sua página de perfil, campeão! Conclua tarefas e ganhe pontos para obter classificações cada vez mais altas! \\n\\nVocê não conhecerá a lista de classificações até alcançar a mais alta! Lembre-se: a única maneira de chegar ao topo é através da sequência diária de pequenos passos.',
    rank: '🔥 Sua classificação 🔥',
    'rank-1Description':
      'Você alcançou a classificação que nenhum humano foi capaz de alcançar antes! Parabéns, aqui está sua torta: 🍰. Desta vez não é mentira.',
    rank5Title: 'V de Vrodutividade 👺',
    rank13Title: 'Freddy Feliz 😱',
    rank13Description:
      'Você sabe que dia é hoje. É o dia em que Jason assa um bolo para você. Todo dia é esse dia agora.',
    homeShort: {
      headline: 'Falha nos sistemas de produtividade.',
      headline2: 'Todorant funciona.',
      feature1: 'Concentre-se em uma tarefa de cada vez',
      feature2: 'Sempre adicione uma data ou um mês a uma tarefa',
      feature3: 'Complete tarefas desagradáveis (sapos) primeiro',
      feature4: 'Mantenha sua caixa de entrada vazia',
      differenceTitle: 'Qual é a diferença?',
      differenceText1:
        'Todos os outros aplicativos de produtividade se concentram em armazenar, organizar e automatizar infinitas listas de tarefas. Todorant se concentra na única coisa que importa: faz você concluir as tarefas.',
      differenceText2:
        'Todorant usa um conjunto cuidadosamente elaborado de limites e elogios para punir o mau comportamento e apoiar os bons hábitos. Afeta a parte primitiva do cérebro, fazendo com que anseie por completar todos, como as pessoas anseiam por açúcar.',
      differenceText3:
        'Eu li e experimentei mais de 20 livros e metodologias de produtividade. Quando todos falharam um por um, combinei seus componentes e simplifiquei o resultado. Foi assim que o Todorant foi criado.',
      dealTitle: 'Qual é o problema?',
      dealText1:
        'Todorant é gratuito nos primeiros 30 dias e custa US $ 5/mês. É mais caro que os concorrentes porque funciona.\nSe você não obtiver US$ 5 em produtividade nos primeiros 30 dias da avaliação gratuita, será convidado a não continuar usando o Todorant.',
      dealText2:
        'Sem condições ocultas. Você não precisa nos fornecer nenhuma informação como um cartão de crédito antes do término do teste. Você nem precisa de uma conta se instalar os aplicativos móveis!',
      dealText3:
        'A única exceção é que, se você se inscrever no iOS, a Apple nos forçará a fazer você se comprometer com uma avaliação gratuita antes de poder usar o aplicativo. A maneira de evitar esse limite é criar uma conta aqui, no site, e depois fazer login no aplicativo iOS.',
    },
    googleCalendarDisableSuccess: 'Google Agenda desativado',
    googleCalendarEnableSuccess: 'Google Agenda ativado',
    delegate: {
      title: 'Atribuição',
      noDelegators:
        'Você ainda não tem atribuições. Compartilhe o link acima com as pessoas que você deseja designar atribuições.',
      pickDelegateField: 'Atribuir',
    },
  },
  de: {
    search: 'Suche',
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
        'Si tienes dudas o sugerencias, siéntete libre de <a href="mailto:todorant@borodutch.com">enviarme un email</a>, <a href="https://t.me/borodutch" target="_blank">contactarme en Telegram</a> o <a href="https://t.me/todorant_feedback" target="_blank">unirte a nuestra comunidad en Telegram</a>.',
    },
    loginMobile: {
      telegram: {
        headline:
          'Por favor inicia sesión con Telegram introduciendo tu ID de Telegram en el campo que se encuentra debajo y haciendo clic en el botón de "Iniciar sesión". Puedes obtener tu ID de Telegram enviando <code>/id</code> al bot <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>.',
        idHint: 'ID de Telegram',
        loginButton: 'Iniciar sesión',
        noCredentialsError: 'Por favor, introduce una ID de Telegram',
        cannotSendMessageError:
          'No se pudo enviar la solicitud de inicio de sesión al usuario. Asegúrate de haber iniciado @todorant_bot y de que la ID de Telegram sea correcta.',
        waiting:
          'Esperando la respuesta en <a href="https://tlg.fyi/todorant_bot" target="_blank">@todorant_bot</a>...',
        notAllowedError: 'El inicio de sesión fue rechazado',
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
      message: '🍪 Este sitio web utiliza cookies.',
    },
    home: {
      texts: {
        contact: [
          '¿Sigues teniendo preguntas? Contáctame directamente en ',
          '. Gracias.',
        ],
      },
      signIn: 'Registrarse',
      facebook: 'Registrarse con Facebook',
      google: 'Registrarse con Google',
      privacy: 'Política de privacidad',
      feedback: {
        title: '¿Qué dicen los usuarios?',
        reviews: [
          {
            name: 'Sergey Romanov',
            text:
              'Los mensajes en la parte de la suscripción son lindos :)\n\nGracias por un servicio simple y próspero por el servicio ideal. Resultó que no sólo ayuda a ser productivo sino también proactivo. Pequeñas mejoras diarias mejoran la vida con confianza, y la mente libre está constantemente buscando cómo llenar la lista de tareas vacía para que pueda sentir el placer de completar tareas una y otra vez, y es una ruta directa hacia la mejora de todo lo que me rodea.\n\nCon todo, no importa cuán simple sea a primera vista Todorant, puede convertirse en un aliado fiel en cualquier negocio. Gracias, Nikita, por desatar los aspectos de la verdadera productividad y compartirlos con nosotros en una solución conveniente.\n\nUn agradecido suscriptor de Todorant.',
          },
          {
            name: 'Dinislam Sad',
            text:
              'Las principales ventajas que a mí (y estoy seguro que también a otros) me gustaron.\n1. Interfaz simple y conveniente.\n2. Las tareas pospuestas se vuelven sapos automáticamente y existe la opción de marcar una tarea como sapo desde el inicio.\n3. El comando /done era algo obligado, y gracias por ello, Nikita. Yo usé Todoist, Wunderlist, Bitrix24. Todos eran demasiado complicados.\n4. Bot de Telegram.',
          },
          {
            name: 'Aleksei Kaut',
            text:
              'Después de que creé las primeras tareas y cambié a la pestaña "Actual" me sorprendí de que tenía solamente una tarea y de que necesitaba completarla antes de continuar. Esta idea de una sola tarea a la vez y plena concentración en ella me pareció sorprendente, parece obvio, pero no podía usarla antes.\n\nUsualmente rastreaba tareas e ideas en Notas, lo que debería hacerse pronto, pero no lo enfoqué como un sistema. He estado utilizando el servicio durante un par de semanas, no de manera muy activa, pero creo que esta es una forma muy sólida de sistematizar los asuntos y las tareas.\n\n¡Gracias por tu trabajo!',
          },
          {
            name: 'Anton',
            text:
              'Probé Todorant. Al inicio estaba escéptico (ya he probado muchos servicios de planeación de tareas), pero me di cuenta de que trabaja muy efectivamente y de que es muy fácil de usar.\n\nAdemás, por razones desconocidas para mí, cuando todas las tareas del día están completadas aparece una fuerte satisfacción, la cual estaba ausente en otros planificadores (había una sensación como de "bueno, eso fue todo... ¿o no?").\n\n¡Gracias por tu trabajo!',
          },
          {
            name: 'Willsey Paslen',
            text:
              'Gracias por el estupendo servicio. Suficiente tiempo ha pasado, así que ahora puedo decir definitivamente: me funciona. Gracias, Nikita 😁 y buena suerte con la app.',
          },
          {
            name: 'Igor Malinkin',
            text:
              'Comencé al fin a hacer algo con Todorant, así que mi productividad subió desde 0.',
          },
          {
            name: 'Vladimir Dubenko',
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
            text:
              'He ordenado mis tareas del trabajo, de programación y de mis pasatiempos. Incluso esta opinión fue escrita gracias a Todorant. Solamente una tarea, sin complicaciones. Ese es todo el punto de la app: me ayudó a concentrarme sin tener que estar evadiendo mis tareas constantemente. \n\nPor supuesto, puedes definir tareas y olvidarte de ellas, pero para mí es más simple abrir de nuevo una aplicación minimalista con una sola tarea que gastar medio día buscando en qué tarea trabajar ahora de cientos planeadas en Telegram o Notion.\n\nEstuve especialmente complacido con la actualización que trajo los hashtags: ahora todas las estadísticas están en la palma de mi mano, puedo rastrear y compartir con mis amigos cuántas tareas he completado este mes.\n\n¡Muchas gracias por!',
          },
        ],
      },
      act: '¡actúe!',
      apple: 'Registrarse con Apple',
    },
    menu: {
      darkMode: {
        on: 'Modo oscuro: encendido',
        off: 'Modo oscuro: apagado',
      },
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
        more1500: 'La tarea no puede tener más de 1500 caracteres.',
      },
      invalidForm: 'Por favor, completa los campos requeridos',
      report: 'No se pudo cargar el reporte',
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
        date: 'Día exacto',
        month: 'O mes',
        tooltip:
          'Las tareas siempre deberían ser: accionables ("Encontrar los mejores vuelos a México" en vez de  "Ir a México"); tan pequeñas y tan exactas como sea posible ("Desempolvar el monitor" en vez de "Limpiar la casa").',
        goFirst: 'Agregar hasta arriba',
      },
      list: {
        completed: 'Mostrar completadas',
      },
      edit: {
        title: 'Editar',
      },
    },
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Borrar',
    deleteHeadline: '¿Estás seguro de que quieres borrar "{name}"?',
    current: 'Actual',
    planning: 'Planeación',
    created: 'Creada',
    breakdownInfo:
      'Usa el desglose cuando la tarea actual es demasiado amplia. Después de que agregues todas las subtareas, siéntete libre de completar esta tarea, te lo mereces.',
    howto: {
      title: '¿Cómo usar Todorant?',
      premise:
        'Debajo se encuentran los principios básicos que deberías seguir para explotar productivamente todas las características proporcionadas por Todorant. Es tan fácil como contar 1-2-3, solamente con unos pocos pasos más.',
      bonus: {
        title: 'Características adicionales',
        rules: [
          '¡Usa atajos de teclado cuando estés en pc! Puedes agregar (a), desglosar (b), cambiar a la pestaña Actual (c), marcar como completada (d) y cambiar a la pestaña Planeación (p). Para agregar un espacio de tarea adicional mientras agregas tareas, puedes usar Ctrl+Shift+A.',
        ],
      },
    },
    skipped: 'Pospuesta',
    subscription: {
      title: 'Suscripción',
      statusText: 'Estatus de la suscripción: {status}',
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
    },
    moveUp: 'Mover al día de hoy',
    settings: {
      title: 'Ajustes',
      showTodayOnAddTodo: 'Establecer el día de hoy como predeterminado',
      firstDayOfWeek: 'Primer día de la semana',
      newTodosGoFirst:
        'Las tareas nuevas se agregan en la parte superior de la lista',
      preserveOrderByTime: 'Conservar el orden exacto por tiempo',
      startTimeOfDay: 'Comienzo del día',
    },
    allDoneTitle: '¡Felicidades!',
    allDoneText:
      '🥳 ¡Lo hiciste! Todas las tareas para hoy están hechas, ve a descansar o quizás a bailar un poco 💃',
    noTodosTitle: '¡Hasta el infinito!',
    noTodosText:
      'No tienes ninguna tarea para hoy. Si quieres trabajar agrega una nueva tarea para hoy o adelanta alguna tarea de días futuros.',
    addTodoTime: 'Tiempo exacto',
    completed: 'Completada',
    planningText:
      '¡Parece que tienes un poco de planeación por hacer! Por favor, redistribuya las tareas pendientes para desbloquear la pestaña "Actual" y para continuar siendo productivo. ¡Bien!',
    activeText:
      '🎉 ¡Muchas gracias por apoyar Todorant! ¡Personalmente espero que Todorant haya mejorado tu vida y que la siga mejorando en el futuro! Tu apoyo me permite trabajar en Todorant diariamente y agregar nuevas funciones que simplifican el trabajo y liberan tu tiempo y tus recursos cognitivos. De nuevo, ¡muchas gracias!',
    inactiveText:
      '🐝 Parece que tu prueba de Todorant ha llegado al final. Este es el momento incómodo en el que tienes que decidir si Todorant ha mejorado tu vida lo suficiente como para invertir dinero en el sistema, y yo tengo que guiarte hacia la decisión correcta. Estoy en la cima de la felicidad cuando puedo aportar valor a la gente; y si Todorant pudo mejorar tu vida, estaré más que agradecido si compras la suscripción. La productividad ilimitada y la mente libre solo cuestan $5/mes. Cada centavo que gane en Todorant se gastará en mejorar el servicio. Al apoyar a Todorant usted me permite a mí, un desarrollador independiente, seguir mejorando el producto que nos beneficia a todos día a día. ¡Muchas gracias por adelantado!',
    earlyAdopterText:
      '👏👏 — este soy yo aplaudiéndoles; ustedes — los locos que aceptaron probar el instrumento de productividad cada vez mayor, Todorant, entre los primeros. Se puede decir que ustedes son el millar dorado, de quienes su retroalimentación ha estado formando Todorant desde el principio. Tienen todos los derechos para usar Todorant tanto como lo deseen: nunca experimentarán ningún límite, se lo han ganado. Sin embargo, si notaron que Todorant ha mejorado drásticamente su vida, aún pueden comprar la suscripción y decir el mejor tipo de "Gracias". Nunca perderán el estado "Primer adoptante 🦄 ", pero siempre podrán cancelar la suscripción. Muchas gracias por seguir usando Todorant, seguiré agregando nuevas funciones para mejorar el producto que nos afecta positivamente a todos. ¡Buena suerte!',
    earlyAdopterTextBonus:
      '🤗 ¡Diablos! Parece que o Todorant o yo personalmente te hemos ayudado lo suficiente como para que hayas comprado la suscripción, aunque puedas usar Todorant de forma gratuita para siempre. Estoy profundamente conmovido y feliz de tomar una taza de café contigo o simplemente de conversar un poco. No dudes en comunicarte conmigo por Telegram (@borodutch) o por correo electrónico; simplemente haz clic en mi nombre a continuación. ¡Muchas gracias! ¡Es difícil imaginar cuán importante es tu contribución!',
    trialText:
      '💪 ¡Bienvenido a Todorant! Tienes 30 días después del registro para decidir si Todorant funciona bien para ti. Después de que pasen 30 días, aún tendrás acceso a las tareas anteriores, pero no podrás agregar otras nuevas. Está perfectamente bien comprar una suscripción antes de que finalicen los 30 días. ¡Creo que usar Todorant te traerá a nuevas alturas en la productividad personal!',
    rules: [
      'Tan pronto como recibas una tarea procesable (recibas un correo electrónico, una llamada telefónica, un mensaje de texto o si ves algo de interés que tengas que incluir en tu lista de tareas pendientes), crea una tarea pendiente de inmediato. No esperes, lo olvidarás si no lo anotas.',
      'Las tareas deben ser siempre accionables y lo más explícitas posible. Si realizar una tarea te toma menos de 2 minutos, hazla de inmediato y regístrala como completada.',
      'Cuando creas una tarea puedes elegir entre agregar una fecha específica o seleccionar un mes. No puedes elegir el mes actual sin seleccionar una fecha específica. Esto se hace así para relajar tu mente. Si confías en el sistema y pones la fecha correcta en tus tareas pendientes, te las encontrarás en el momento adecuado. Se desperdicia una gran cantidad de fuerza de voluntad por estar constantemente estresado por "otra cosa con la que tengo que lidiar pero no estoy muy seguro de qué era". Aprende a confiar y relajarte.',
      'Lo primero que debes hacer cada mes es planificar con anticipación. Tomas todas las tareas asignadas al mes actual y las clasificas en las fechas correctas. Te permite filtrar las tareas desactualizadas y mantener la mente en paz, sabiendo exactamente lo que tienes que hacer este mes.',
      'Lo primero que haces en la mañana es planificar tu día. Echa un vistazo a la sección de Planificación. ¿Puedes manejar todo? Distribuye tareas que no se pueden completar hoy. Redistribuye cualquier tarea de los días anteriores que no se haya hecho.',
      'A menos que sea una emergencia, no mires la sección de planificación una vez que hayas terminado la planificación. Será mucho mejor psicológicamente si sólo te enfocas en una tarea, así que mantén tus ojos en la sección Actual. Confía en el sistema, recuerda todo. Haz tu trabajo y relaja tu mente.',
      'La sección Actual contiene sólo una tarea en la que debes enfocarte, nada más. Puedes tener más de una tarea al día, la cantidad de tareas y la barra de progreso se muestran para tu conveniencia. No puedes saltar entre tareas: debes ocuparte de cada tarea linealmente, una por una.',
      'Los sapos son tipos especiales de tareas de las que generalmente no quieres ocuparte. Por lo general, son las tareas que se dejan atrás durante meses e incluso años. Todorant asegura que te ocupes de los sapos a primera hora todos los días. Por la mañana tu reserva de fuerza de voluntad es lo suficientemente grande como para manejar incluso las tareas más fastidiosas. Y después de que finalmente lidias con un sapo recibes la felicidad suficiente para estar sonriendo durante todo el día. Te sientes orgulloso de ti mismo cuando acabas con los sapos.',
      'Tienes permitido omitir la tarea actual, pero intenta hacerlo lo menos posible. No puedes omitir un sapo. Si no pudiste completar una tarea y tuviste que redistribuirla dos veces, se convierte en un sapo.',
      'Si la tarea actual es de un nivel demasiado alto, divídela en una lista de subtareas. La tarea se marcará como completada tan pronto como la descompongas.',
      'Agrega tanta información relevante sobre la tarea como sea posible. Agrega enlaces a correos electrónicos específicos (Gmail en la web te permite hacer esto), sitios web, notas (como Evernote), documentos (como Dropbox), anota números de teléfono o agrega cualquier información que puedas necesitar para completar la tarea. Todorant no está destinado a ser un punto de referencia para ti, sino que debe actuar como un catálogo de enlaces a la información de referencia relevante para tareas específicas.',
      'Siéntete libre de unirte a nuestro grupo multilingüe en Telegram para compartir experiencias y trucos sobre cómo ser más productivo: @todorant_feedback. Tus comentarios sobre el servicio (sugerencias, deseos y quejas) son muy bienvenidos.',
      'Usa el modo de edición (el ícono de orden de lista en la parte superior) en la página de Planificación para cambiar el orden de las tareas. Si deseas asignar una tarea a una semana específica, simplemente asígnala al lunes correspondiente y reasígnala durante la fase de planificación ese lunes por la mañana.',
      'Todorant no tiene y nunca tendrá la función de programar tareas repetitivas, lo único que hacen bien es causar ansiedad al colgarse de ti como tareas inacabadas. Si necesitas completar tareas repetitivas, agrégalas manualmente, tu cerebro te agradecerá el trabajo consciente.',
      'Todorant no tiene el concepto de "Proyectos", ya que ha demostrado ser desmotivador, algunas de las "carpetas"nunca se abren. Los proyectos "Hacer ejercicio"y "Superación personal" envían saludos. En su lugar, usa #hashtags.',
      'Los sapos siempre aparecerán en la parte superior de la lista.',
    ],
    earlyAdopter: 'Primer adoptante 🦄',
    active: 'Activo',
    inactive: 'Inactivo',
    trial: 'Prueba',
    weekday1: 'Lunes',
    weekday2: 'Martes',
    weekday3: 'Miércoles',
    weekday4: 'Jueves',
    weekday5: 'Viernes',
    weekday6: 'Sábado',
    weekday0: 'Domingo',
    introTitle: '¡Bienvenido!',
    introButton: 'Mensaje de introducción',
    intro1:
      'En pocas palabras: deseas mejorar tu productividad. Todorant puede ayudarte. Todorant no es otra lista de tareas más: es un sistema que debe seguirse, es un estilo de vida, es un hábito.',
    intro2:
      'Leer la sección "Cómo usar Todorant" en la configuración te ayudará a aprovechar al máximo Todorant, pero no es necesario. Todorant te ayudará al limitar tus acciones: entrenará tu cerebro para obtener satisfacción al completar las tareas.',
    intro3:
      'Si tienes dudas acerca de algo que ves en pantalla, primero haz clic en el botón "i" que se encuentra en la parte superior izquierda. ¿No estás seguro de qué hace un botón? ¡Presiona "i"!',
    intro4:
      'Todorant es gratis los primeros 30 días y después cuesta $5/mes. La razón por la que el precio puede parecer un poco elevado es que no estás pagando por una aplicación más de tareas, estás pagando productividad: el sistema completo que no te ahoga en funciones y configuraciones, ¡sino que te hace completar las tareas! Después de todo, prueba Todorant gratis por 30 días y actualiza si el valor que obtienes por usarlo supera los $5 de la suscripción.',
    intro5:
      'Te doy la bienvenida al viaje de la productividad, ¡que comience una nueva etapa en tu vida!',
    introBack: '¡Vamos!',
    emptyHashtags:
      'La lista de Hashtag está vacía por ahora. ¡Crea tu primera tarea con un #hashtag para añadir el primer hashtag aquí!',
    refreshRequest:
      'Hay una nueva versión de Todorant disponible. Por favor, refresque la página para obtener el nuevo material brillante 🦄',
    refresh: 'Actualizar',
    homeShort: {
      headline: 'Los sistemas de productividad fallan.',
      headline2: 'Todorant funciona.',
      feature1: 'Enfoque en una tarea a la vez',
      feature2: 'Siempre añadir una fecha o un mes a una tarea',
      feature3: 'Completar primero las tareas desagradables',
      feature4: 'Mantenga su bandeja de entrada vacía',
      differenceTitle: '¿Cuál es la diferencia?',
      differenceText1:
        'Todas las demás aplicaciones de productividad se centran en almacenar, organizar y automatizar listas interminables de tareas. Todorant se centra en lo único que importa: te hace completar las tareas.',
      differenceText2:
        'Todorant utiliza un conjunto cuidadosamente elaborado de límites y elogios para castigar el mal comportamiento y apoyar los buenos hábitos. Afecta a la parte primitiva del cerebro para hacer que ansíe completar todos como la gente ansía el azúcar.',
      differenceText3:
        'He leído y probado más de 20 libros y metodologías de productividad. Cuando todos ellos fallaron uno por uno combiné sus componentes y simplifiqué el resultado. Así es como se creó Todorant.',
      dealTitle: '¿Cuál es el trato?',
      dealText1:
        'El Todorant es gratis durante los primeros 30 días y luego son 5 dólares al mes. Es más caro que los competidores porque funciona. Si no obtienes 5 dólares de productividad en los primeros 30 días de la prueba gratuita, eres bienvenido a no seguir usando Todorant.',
      dealText2:
        'Sin condiciones. No necesita darnos ninguna información, como una tarjeta de crédito, antes de que termine la prueba. Ni siquiera necesitas una cuenta si instalas las aplicaciones móviles!',
      dealText3:
        'La única excepción es si te registras en iOS, Apple nos ha obligado a hacerte una prueba gratuita antes de que puedas usar la aplicación. La manera de evitar este límite es crear una cuenta aquí, en el sitio web, y luego iniciar sesión en la aplicación iOS.',
    },
    googleCalendarDisableSuccess: 'Google Calendar desactivado',
    googleCalendarEnableSuccess: 'Google Calendar activado',
  },
}
