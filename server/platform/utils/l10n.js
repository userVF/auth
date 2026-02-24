export default {
  en: {
    header: {
      pageLinks: [
        { path: '', text: 'Home', view: 'Home' },
        { path: 'about', text: 'About', view: 'About' },
        { path: 'contacts', text: 'Contacts', view: 'Contacts' },
        { path: 'profile', text: 'Profile', view: 'Profile' },
      ],
      langLinks: [
        { lang: 'en', text: 'Eng' },
        { lang: 'kz', text: 'Қаз' },
        { lang: 'ru', text: 'Рус' },
      ],
      loginLinks: {
        login: { path: 'login', text: 'Sign in' },
        logout: { path: 'logout', text: 'Sign out' },
      },
    },
    login: {
      head: {
        title: 'Auth | Login',
        description: 'Auth - Login description'
      },
      login: {
        ui: {
          legend: 'Login',
          chooseChannel: 'Choose',
          initCode: 'Send',
          repeatInitCode: 'Repeat sending',
          editIdentifier: 'Edit',
          sending: 'Sending...',
        },
      },
    },
    loginApi: {
      invalidRequest: 'Invalid request',
      error: 'Something went wrong. Please try again.',
      notSent: 'Code was not sent. Please try again.',
      sent: { init: 'Code sent to', retry: ['You can resend in', 'sec.'] },
      cooldown: { init: 'Code sent to', retry: ['You can resend in', 'sec.'] },
      expiredCode: 'The code has expired. Please resend.',
      invalidCode: 'Invalid code',
      welcome: 'Welcome',
    },
    profile: {
      head: {
        title: 'Auth | Profile',
        description: 'Auth - Profile description'
      },
      profile: {
        ui: {},
        data: {
          text: 'Profile page',
        },
      },
    },
    home: {
      head: {
        title: 'Auth | Home',
        description: 'Auth - Home description'
      },
      home: {
        ui: {},
        data: {
          text: 'Home page',
        },
      },
    },
    about: {
      head: {
        title: 'Auth | About',
        description: 'Auth - About description'
      },
      about: {
        ui: {},
        data: {
          text: 'About page',
        },
      },
    },
    contacts: {
      head: {
        title: 'Auth | Contacts',
        description: 'Auth - Contacts description'
      },
      contacts: {
        ui: {},
        data: {
          text: 'Contacts page',
        },
      },
    },
    notFound: {
      head: {
        title: 'Auth | Not found',
        description: 'Auth - Not found description'
      },
      notFound: {
        ui: {},
        data: {
          text: 'Page not found'
        },
      },
    },
    footer: {
      text: 'Auth',
    },
    notification: {
      whatsapp: {
        code: 'Code for login',        
      },
      email: {
        code: 'Code for login',
      },      
    },
  },
  kz: {
    header: {
      pageLinks: [
        { path: '', text: 'Басты бет', view: 'Home' },
        { path: 'about', text: 'Біз туралы', view: 'About' },
        { path: 'contacts', text: 'Байланыстар', view: 'Contacts' },
        { path: 'profile', text: 'Профиль', view: 'Profile' },
      ],
      langLinks: [
        { lang: 'en', text: 'Eng' },
        { lang: 'kz', text: 'Қаз' },
        { lang: 'ru', text: 'Рус' },
      ],
      loginLinks: {
        login: { path: 'login', text: 'Кіру' },
        logout: { path: 'logout', text: 'Шығу' },
      },
    },
    login: {
      head: {
        title: 'Auth | Кіру',
        description: 'Auth - Кіру бетінің сипаттамасы'
      },
      login: {
        ui: {
          legend: 'Кіру',
          chooseChannel: 'Таңдау',
          initCode: 'Жіберу',
          repeatInitCode: 'Қайта жіберу',
          editIdentifier: 'Өзгерту',
          sending: 'Жіберілуде...',
        },
      },
    },
    loginApi: {
      invalidRequest: 'Жарамсыз сұраныс.',
      error: 'Бірдеңе дұрыс болмады. Қайтадан көріңіз.',
      notSent: 'Код жіберілмеді. Қайтадан көріңіз.',
      sent: { init: 'Код мынаған жіберілді:', retry: ['Қайта жіберуге болады', 'сек. кейін'] },
      cooldown: { init: 'Код мынаған жіберілді:', retry: ['Қайта жіберуге болады', 'сек. кейін'] },
      expiredCode: 'Кодтың мерзімі өтті, қайта жіберіңіз.',
      invalidCode: 'Қате код',
      welcome: 'Welcome',
    },
    profile: {
      head: {
        title: 'Auth | Профиль',
        description: 'Auth - Профиль бет'
      },
      profile: {
        ui: {},
        data: {
          text: 'Профиль бет',
        },
      },
    },
    home: {
      head: {
        title: 'Auth | Басты бет',
        description: 'Auth - Басты бет'
      },
      home: {
        ui: {},
        data: {
          text: 'Басты бет',
        },
      },
    },
    about: {
      head: {
        title: 'Auth | Біз туралы',
        description: 'Auth - Біз туралы'
      },
      about: {
        ui: {},
        data: {
          text: 'Біз туралы',
        },
      },
    },
    contacts: {
      head: {
        title: 'Auth | Байланыстар',
        description: 'Auth - Байланыстар'
      },
      contacts: {
        ui: {},
        data: {
          text: 'Байланыстар',
        },
      },
    },
    notFound: {
      head: {
        title: 'Auth | Бет табылмады',
        description: 'Auth - Бет табылмады'
      },
      notFound: {
        ui: {},
        data: {
          text: 'Бет табылмады'
        },
      },
    },
    footer: {
      text: 'Auth',
    },
    notification: {
      whatsapp: {
        code: 'Кіру коды',        
      },
      email: {
        code: 'Кіру коды',
      },      
    },   
  },
  ru: {
    header: {
      pageLinks: [
        { path: '', text: 'Главная', view: 'Home' },
        { path: 'about', text: 'О нас', view: 'About' },
        { path: 'contacts', text: 'Контакты', view: 'Contacts' },
        { path: 'profile', text: 'Профиль', view: 'Profile' },
      ],
      langLinks: [
        { lang: 'en', text: 'Eng' },
        { lang: 'kz', text: 'Қаз' },
        { lang: 'ru', text: 'Рус' },
      ],
      loginLinks: {
        login: { path: 'login', text: 'Вход' },
        logout: { path: 'logout', text: 'Выход' },
      },      
    },
    login: {
      head: {
        title: 'Auth | Вход',
        description: 'Auth - Описание страницы входа'
      },
      login: {
        ui: {
          legend: 'Вход',
          chooseChannel: 'Выбрать',
          initCode: 'Отправить',
          repeatInitCode: 'Повторить отправку',
          editIdentifier: 'Изменить',
          sending: 'Отправка...',
        },
      },      
    },
    loginApi: {
      invalidRequest: 'Недействительный запрос',//Жарамсыз сұраныс
      error: 'Что-то пошло не так. Попробуйте ещё раз.',//Бірдеңе дұрыс болмады. Қайтадан көріңіз.
      notSent: 'Код не отправлен. Попробуйте ещё раз.',
      sent: { init: 'Код отправлен на', retry: ['Повторить отправку можно через', 'сек.'] },
      cooldown: { init: 'Код отправлен на', retry: ['Повторить отправку можно через', 'сек.'] },
      expiredCode: 'Код просрочен, повторите отправку.',
      invalidCode: 'Неправильный код',
      welcome: 'Welcome',
    },
    profile: {
      head: {
        title: 'Auth | Профиль',
        description: 'Auth - Описание страницы Профиль'
      },
      profile: {
        ui: {},
        data: {
          text: 'Страница "Профиль"',
        }, 
      },
    },
    home: {
      head: {
        title: 'Auth | Главная',
        description: 'Auth - Описание главной страницы'
      },
      home: {
        ui: {},
        data: {
          text: 'Главная страница',
        },
      },
    },
    about: {
      head: {
        title: 'Auth | О нас',
        description: 'Auth - Описание страницы О нас'
      },
      about: {
        ui: {},
        data: {
          text: 'Страница "О нас"',
        },
      },
    },
    contacts: {
      head: {
        title: 'Auth | Контакты',
        description: 'Auth - Описание страницы Контакты'
      },
      contacts: {
        ui: {},
        data: {
          text: 'Страница "Контакты"',
        },
      },
    },
    notFound: {
      head: {
        title: 'Auth | Страница не найдена',
        description: 'Auth - Страница не найдена'
      },
      notFound: {
        ui: {},
        data: {
          text: 'Страница не найдена'
        },
      }, 
    },
    footer: {
      text: 'Auth',
    },
    notification: {
      whatsapp: {
        code: 'Код для входа',        
      },
      email: {
        code: 'Код для входа',
      },      
    },
  },
}