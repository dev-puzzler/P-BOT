P-BOT
pbot-project/
├── index.js          # Основной файл приложения
├── models/           # Директория для моделей (например, для Redis)
│   ├── ollama_model.js
│   └── redis_cache.js
├── routes/           # Директория для роутов (маршрутов)
│   ├── api.js
│   └── webhooks.js
├── controllers/      # Директория контроллеров (управляющих логикой)
│   ├── music_controller.js
│   └── search_controller.js
├── middlewares/      # Директория для middleware
│   └── auth_middleware.js
├── config.js         # Файл конфигурации
├── package.json      # Файл для NPM-зависимостей
├── .gitignore        # Файл для игнорирования временных файлов
└── README.md         # Файл с описанием проекта
