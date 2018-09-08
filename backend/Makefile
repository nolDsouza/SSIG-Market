API_PORT=4000
DB_PORT=27017
DB_URL='mongodb://localhost:${DB_PORT}/sharelionDatabase'
API_URL='http://localhost:${API_PORT}'
SECRET=$(shell node KEYGEN)
default:
	 __DATABASE__=$(DB_URL) __API__=$(API_URL) __SECRET__=$(SECRET) npm run dev
