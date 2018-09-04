DB_PORT=27017
APP_PORT=4000
DB_URL='mongodb://localhost:${DB_PORT}/sharelionDatabase'
APP_URL='http://localhost:${APP_PORT}'
SECRET=$(shell node KEYGEN)
default:
	__DATABASE__=$(DB_URL) __AUTHORITY__=$(APP_URL) __SECRET__=$(SECRET) npm run dev
