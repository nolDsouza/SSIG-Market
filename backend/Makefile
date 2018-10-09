API_PORT=4000
DB_PORT=27017
DB_URL='mongodb://sharelion:sharelion123@ds111913.mlab.com:11913/sharelion-database'
#DB_URL='mongodb://localhost:${DB_PORT}/sharelionDatabase'
API_URL='http://localhost:${API_PORT}'
SECRET=$(shell node KEYGEN)
default:
	 npm run dev --__DATABASE__=$(DB_URL) __API__=$(API_URL) __SECRET__=$(SECRET)
