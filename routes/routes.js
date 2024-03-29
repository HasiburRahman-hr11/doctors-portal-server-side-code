const homeRoute = require('./homeRoute');
const serviceRoutes = require('./serviceRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const userRoutes = require('./userRoutes');

const routes = [
    {
        handler: homeRoute,
        path: '/'
    },
    {
        handler: userRoutes,
        path: '/users'
    },
    {
        handler: serviceRoutes,
        path: '/services'
    },
    {
        handler: appointmentRoutes,
        path: '/appointments'
    }
]

const useRoutes = (app) => {
    routes.map(route => {
        app.use(route.path, route.handler)
    })
}

module.exports = useRoutes;